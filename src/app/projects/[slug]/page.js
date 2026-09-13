import { notFound } from "next/navigation";
import Footer from "@/components/footer";
import ProjectContentsRail from "@/components/project/ProjectContentsRail";
import { getCaseStudy, getCaseStudySlugs } from "@/components/project/case-studies";
import { getAllProjects, getProject } from "@/lib/projects";

export function generateStaticParams() {
  const published = new Set(getCaseStudySlugs());

  return getAllProjects()
    .filter((project) => !project.disabled && published.has(project.slug))
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project || !getCaseStudy(slug)) return { title: "Page not found" };

  return {
    ...project.metadata,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      ...project.metadata,
      type: "article",
      url: `/projects/${slug}`,
      images: project.bigImage ? [{ url: project.bigImage }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  const caseStudy = project ? getCaseStudy(slug) : null;

  if (!caseStudy) notFound();

  const { Article, contents } = caseStudy;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="grid flex-1 grid-rows-[1fr_auto] grid-cols-[1fr_var(--gutter-width)_minmax(0,var(--breakpoint-2xl))_var(--gutter-width)_1fr] overflow-clip [--gutter-width:--spacing(6)] lg:[--gutter-width:--spacing(10)]">
        <div className="col-start-2 row-span-full row-start-1 max-sm:hidden border-x border-x-border bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)]" />
        <div className="col-start-4 row-span-full row-start-1 max-sm:hidden border-x border-x-border bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)]" />

        <div className="col-start-3 row-start-1 min-h-screen max-sm:col-span-full max-sm:col-start-1">
          <section className="px-4 pb-16 pt-28 sm:px-6 lg:px-10 lg:pt-32">
            <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-8">
              <ProjectContentsRail items={contents} />

              <article className="min-w-0">
                <Article project={project} />
              </article>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
