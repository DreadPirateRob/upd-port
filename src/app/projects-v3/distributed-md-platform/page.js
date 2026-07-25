import CaseStudyAccordion from "@/components/home/CaseStudyAccordion";
import Footer from "@/components/footer";
import { getAllProjects } from "@/lib/projects";

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
          <h1 className="sr-only">{project.title}</h1>
          <section className="px-4 pb-16 pt-28 sm:px-6 lg:px-10 lg:pt-32">
            <div className="mx-auto max-w-5xl">
              <CaseStudyAccordion projects={[project]} articleMode />
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
