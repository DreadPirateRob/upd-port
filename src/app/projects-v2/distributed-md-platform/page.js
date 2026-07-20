import ProjectCTA from "@/components/project/ProjectCTA";
import { V2Hero, V2Section } from "@/components/project-v2";
import project from "@/data/project-v2/distributed-md-platform";

export const metadata = {
  title: `${project.title} | Projects V2`,
  description: project.intro,
};

export default function DistributedMdPlatformV2Page() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col pb-20">
        <section className="px-6 pt-8 sm:px-8 lg:px-12 lg:pt-12">
          <div className="border-b border-white/10 pb-8">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-white/45">
              Project Preview / V2 Prototype
            </p>
          </div>
        </section>

        <V2Hero
          eyebrow={project.eyebrow}
          title={project.title}
          heroSummary={project.heroSummary}
          intro={project.intro}
          metrics={project.metrics}
          className="px-6 py-12 sm:px-8 lg:px-12 lg:py-16"
        />

        <section className="px-6 sm:px-8 lg:px-12">
          <div className="grid gap-6 border-t border-white/10 py-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-10">
            <div>
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-white/45">
                Reading frame
              </p>
            </div>
            <div className="max-w-3xl space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                A more editorial format for technical project work.
              </h2>
              <p className="text-sm leading-7 text-white/62 sm:text-base sm:leading-8">
                Instead of a conventional portfolio write-up, this prototype reads like a systems report:
                establish the operating constraint, explain the architectural bet, then work through the
                normalization, synchronization, and deployment logic that made the platform credible in
                production conditions.
              </p>
            </div>
          </div>
        </section>

        <div className="px-6 sm:px-8 lg:px-12">
          {project.sections.map((section, index) => (
            <V2Section
              key={section.title}
              eyebrow={section.eyebrow}
              title={section.title}
              body={section.body}
              bullets={section.bullets}
              figure={section.figure}
              figurePosition={index % 2 === 1 ? "left" : "right"}
              className="px-0 py-14 sm:py-16"
            />
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/20">
        <ProjectCTA />
      </div>
    </main>
  );
}
