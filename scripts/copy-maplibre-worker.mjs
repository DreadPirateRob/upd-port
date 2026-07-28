// maplibre-gl v6 derives its worker URL from `import.meta.url` and bails to an
// empty string unless that URL is http(s). Under Turbopack the bundled module
// URL is not, so no worker is ever spawned and every GeoJSON/tile source stays
// silently unloaded (map.loaded() never turns true, no error is emitted).
//
// Fix: serve the worker ourselves. This copies the worker entry plus the shared
// chunk it imports relatively into public/maplibre/, and src/components/ui/map.jsx
// points maplibre at it via setWorkerUrl(). Regenerated on every dev/build so it
// can never drift from the installed maplibre-gl version.

import { copyFile, mkdir, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);

const FILES = ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"];
const OUT_DIR = join(process.cwd(), "public", "maplibre");

const dist = join(
  dirname(require.resolve("maplibre-gl/package.json")),
  "dist",
);

await mkdir(OUT_DIR, { recursive: true });

for (const file of FILES) {
  await copyFile(join(dist, file), join(OUT_DIR, file));
}

const version = JSON.parse(
  await readFile(join(dist, "..", "package.json"), "utf8"),
).version;

console.log(`maplibre worker assets copied (maplibre-gl@${version})`);
