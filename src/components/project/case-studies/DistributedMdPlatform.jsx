import CaseStudyAccordion from "@/components/home/CaseStudyAccordion";
import MarketDataArchitecture from "@/components/project/MarketDataArchitecture";
import MarketDataImpact from "@/components/project/MarketDataImpact";
import MarketDataLearnings from "@/components/project/MarketDataLearnings";
import projectDetails from "@/data/projects/distributed-md-platform";

const challenge = projectDetails.sections[0];
const architecture = projectDetails.sections[1];

const CHALLENGE_CONSTRAINTS = [
  "150–300ms or more in roundtrip delay before application logic begins.",
  "Multiple WebSocket connections with exchange-specific lifecycle behavior.",
  "Incompatible payload formats that require reconciliation and normalization.",
  "Reliable delivery to consumers while every source stream remains live.",
];

// Drives the sticky contents rail. Order here is the order of the sections
// below; the rail numbers them, so no manual numbering is needed.
export const contents = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "Challenge" },
  { id: "architecture", label: "Architecture" },
  { id: "impact", label: "Impact" },
  { id: "learnings", label: "Learnings" },
];

export default function DistributedMdPlatform({ project }) {
  return (
    <>
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

        <dl className="grid gap-px bg-border sm:grid-cols-2 lg:col-span-4 lg:grid-cols-4">
          {projectDetails.metrics.slice(0, 4).map((metric) => (
            <div key={metric.label} className="min-h-44 bg-background p-5 sm:p-6">
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

      <section id="challenge" className="mt-12 scroll-mt-28 border border-border">
        <header className="grid gap-px bg-border sm:grid-cols-2">
          <div className="bg-foreground px-6 py-8 text-background sm:px-8">
            <h2 className="font-pixel text-xl uppercase tracking-tight sm:text-2xl">
              The challenge
            </h2>
          </div>
          <div
            aria-hidden="true"
            className="min-h-20 bg-background bg-size-[10px_10px] bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_50%)]"
          />
        </header>

        <div className="grid gap-px bg-border lg:grid-cols-5">
          <div className="bg-background px-6 py-10 sm:px-8 lg:col-span-3 lg:py-12">
            <p className="font-pixel text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
              {challenge.eyebrow}
            </p>
            <h3 className="mt-5 max-w-2xl font-pixel text-2xl leading-tight tracking-tight text-foreground sm:text-3xl">
              {challenge.title}
            </h3>
            <div className="mt-7 max-w-2xl space-y-5">
              {challenge.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="bg-background px-6 py-10 sm:px-8 lg:col-span-2 lg:py-12">
            <p className="font-pixel text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
              Pressure points
            </p>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {CHALLENGE_CONSTRAINTS.map((constraint) => (
                <li
                  key={constraint}
                  className="grid grid-cols-[auto_1fr] gap-4 py-4 text-sm leading-6 text-foreground"
                >
                  <span aria-hidden="true" className="mt-2 size-1.5 bg-primary" />
                  {constraint}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <MarketDataArchitecture
        beforeDescription={challenge.figure.caption}
        afterDescription={architecture.figure.caption}
        regionDescription={projectDetails.geoPanel.intro}
        regionMarkers={projectDetails.geoPanel.globe.markers}
      />

      <MarketDataImpact takeaway={projectDetails.comparisonPanel.takeaway} />

      <MarketDataLearnings />
    </>
  );
}
