import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import Image from 'next/image';

const CONTENT_DIR = path.join(process.cwd(), 'content/projects');

const Heading2 = ({ children }) => (
  <h2 className="text-2xl font-bold mb-6 mt-12 first:mt-0">{children}</h2>
);

const Heading3 = ({ children }) => (
  <h3 className="text-xl font-semibold mb-4 mt-8 text-primary">{children}</h3>
);

const Paragraph = ({ children }) => (
  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{children}</p>
);

const UnorderedList = ({ children }) => (
  <ul className="list-disc list-inside ml-4 space-y-3 mb-6 text-muted-foreground">
    {children}
  </ul>
);

const ListItem = ({ children }) => <li>{children}</li>;

const Strong = ({ children }) => (
  <strong className="text-primary font-semibold">{children}</strong>
);

const MDImage = ({ src, alt }) => (
  <div className="col-span-24 aspect-video mb-8 border border-border">
    <div className="relative h-full">
      <Image src={src} alt={alt ?? ''} fill className="object-cover" />
    </div>
  </div>
);

const HorizontalRule = () => <hr className="my-10 border-border" />;

const mdComponents = {
  h2: Heading2,
  h3: Heading3,
  p: Paragraph,
  ul: UnorderedList,
  li: ListItem,
  strong: Strong,
  img: MDImage,
  hr: HorizontalRule,
};

export function getAllProjects() {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const source = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
      const { data } = matter(source);

      return { ...data, slug: file.replace('.md', '') };
    })
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export async function getProject(slug) {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content: rawContent } = matter(source);

  if (frontmatter.disabled) return null;

  const { content } = await compileMDX({
    source: rawContent,
    components: mdComponents,
    options: { parseFrontmatter: false },
  });

  return {
    frontmatter: {
      ...frontmatter,
      slug,
      metadata: {
        title: frontmatter.metaTitle ?? `${frontmatter.title} - Adrian Garcia`,
        description: frontmatter.metaDescription ?? frontmatter.description,
      },
    },
    content,
  };
}
