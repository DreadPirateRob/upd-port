import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/projects");

// `content/projects/*.md` is the project registry. Only the frontmatter is
// read: case-study bodies are bespoke React articles under
// `src/components/project/case-studies`, not markdown.
function toProject(file) {
  const source = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const { data } = matter(source);
  const slug = file.replace(/\.md$/, "");

  return {
    ...data,
    slug,
    metadata: {
      title: data.metaTitle ?? data.title,
      description: data.metaDescription ?? data.description,
    },
  };
}

export function getAllProjects() {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(toProject)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getProject(slug) {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(CONTENT_DIR, file))) return null;

  const project = toProject(file);

  return project.disabled ? null : project;
}
