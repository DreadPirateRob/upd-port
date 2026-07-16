import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import ProjectLayout from "@/components/project/ProjectLayout";
import ProjectHero from "@/components/project/ProjectHero";
import TechGrid from "@/components/project/TechGrid";
import ProjectBody from "@/components/project/ProjectBody";
import ProjectCTA from "@/components/project/ProjectCTA";
import { getProject, getAllProjects } from "@/lib/projects";

export function generateStaticParams() {
  return getAllProjects()
    .filter((p) => !p.disabled)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project Not Found" };
  return project.frontmatter.metadata;
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const { frontmatter, content } = project;

  return (
    <ProjectLayout>
      <ProjectHero
        title={frontmatter.title}
        description={frontmatter.description}
        areas={frontmatter.areas}
        technologies={frontmatter.technologies}
        bigImage={frontmatter.bigImage}
      />
      <Separator />
      <TechGrid technologies={frontmatter.technologies} />
      <Separator />
      <ProjectBody content={content} />
      <ProjectCTA />
    </ProjectLayout>
  );
}
