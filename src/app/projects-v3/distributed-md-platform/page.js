import CaseStudyAccordion from "@/components/home/CaseStudyAccordion";
import Footer from "@/components/footer";
import { getAllProjects } from "@/lib/projects";
import projectDetails from "@/data/project-v2/distributed-md-platform";

const project = getAllProjects().find(
  ({ slug }) => slug === "distributed-md-platform",
);

export const metadata = {
  title: `${project.title} | Projects V3`,
  description: project.description,
};

export default function DistributedMdPlatformV3Page() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="grid flex-1 grid-rows-[1fr_auto] grid-cols-[1fr_var(--gutter-width)_minmax(0,var(--breakpoint-2xl))_var(--gutter-width)_1fr] overflow-clip [--gutter-width:--spacing(6)] lg:[--gutter-width:--spacing(10)]">
        <div className="col-start-2 row-span-full row-start-1 max-sm:hidden border-x border-x-border bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)]" />
        <div className="col-start-4 row-span-full row-start-1 max-sm:hidden border-x border-x-border bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)]" />

        <div className="col-start-3 row-start-1 min-h-screen max-sm:col-span-full max-sm:col-start-1">
          <section className="px-4 pb-16 pt-28 sm:px-6 lg:px-10 lg:pt-32">
            <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-8">
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <nav
                  aria-label="Table of contents"
                  className="border border-border bg-background/90 p-4 backdrop-blur-sm"
                >
                  <p className="font-pixel text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                    Contents
                  </p>
                  <ol className="mt-3 border-l border-border">
                    <li>
                      <a
                        href="#overview"
                        aria-current="location"
                        className="-ml-px flex items-center gap-3 border-l border-primary px-3 py-2 font-pixel text-xs uppercase tracking-wide text-foreground transition-colors hover:text-primary"
                      >
                        <span className="text-muted-foreground">01</span>
                        Overview
                      </a>
                    </li>
                  </ol>
                </nav>
              </aside>

              <article className="min-w-0">
                <h1 className="sr-only">{project.title}</h1>
                <CaseStudyAccordion projects={[project]} articleMode />

                <section
                  id="overview"
                  className="mt-12 grid scroll-mt-28 gap-px border border-border bg-border lg:grid-cols-4"
                >
                  <div className="bg-background px-6 py-8 sm:px-8 sm:py-10 lg:px-6">
                    <p className="font-pixel text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                      Project overview
                    </p>
                  </div>

                  <div className="bg-background px-6 py-8 sm:px-8 sm:py-10 lg:col-span-3">
                    <h2 className="max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
                      {projectDetails.heroSummary}
                    </h2>
                    <p className="mt-6 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                      {projectDetails.intro}
                    </p>
                  </div>

                  <dl className="grid gap-px bg-border sm:grid-cols-2 lg:col-span-4 xl:grid-cols-4">
                    {projectDetails.metrics.slice(0, 4).map((metric) => (
                      <div
                        key={metric.label}
                        className="min-h-44 bg-background p-5 sm:p-6"
                      >
                        <dt className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                          {metric.label}
                        </dt>
                        <dd className="mt-3 font-pixel text-3xl tracking-tight text-foreground">
                          {metric.value}
                        </dd>
                        <p className="mt-3 text-xs leading-5 text-muted-foreground">
                          {metric.note}
                        </p>
                      </div>
                    ))}
                  </dl>
                </section>
              </article>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
