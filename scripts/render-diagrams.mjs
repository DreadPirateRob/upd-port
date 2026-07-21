import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { D2 } from "@terrastruct/d2";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const sourceRoot = path.join(repoRoot, "content", "diagrams");
const outputRoot = path.join(repoRoot, "public", "diagrams");

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return walk(fullPath);
      return entry.name.endsWith(".d2") ? [fullPath] : [];
    }),
  );
  return files.flat();
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function buildVirtualFs(files) {
  const entries = await Promise.all(
    files.map(async (filePath) => {
      const source = await fs.readFile(filePath, "utf8");
      const relativePath = path.relative(sourceRoot, filePath).split(path.sep).join("/");
      return [relativePath, source];
    }),
  );

  return Object.fromEntries(entries);
}

async function renderFile(d2, filePath, virtualFs) {
  const inputPath = path.relative(sourceRoot, filePath).split(path.sep).join("/");
  const compiled = await d2.compile({
    fs: virtualFs,
    inputPath,
    options: {},
  });

  const renderOptions = compiled.renderOptions ?? compiled.options ?? {};
  const rendered = await d2.render(compiled.diagram, renderOptions);
  const sanitized = rendered.replace(
    /<rect([^>]*?)fill="#FFFFFF"([^>]*?)\/>/,
    '<rect$1fill="transparent"$2/>',
  );
  const relative = inputPath.replace(/\.d2$/, ".svg");
  const outputPath = path.join(outputRoot, relative);
  await ensureDir(path.dirname(outputPath));
  await fs.writeFile(outputPath, sanitized, "utf8");
  return { filePath, outputPath };
}
async function main() {
  const d2 = new D2();
  const files = await walk(sourceRoot);
  if (!files.length) {
    console.log("No .d2 files found.");
    process.exit(0);
  }

  const virtualFs = await buildVirtualFs(files);

  for (const filePath of files) {
    const { outputPath } = await renderFile(d2, filePath, virtualFs);
    console.log(`Rendered ${path.relative(repoRoot, outputPath)}`);
  }

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
