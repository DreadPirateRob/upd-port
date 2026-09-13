import { getCaseStudySlugs } from "@/components/project/case-studies";
import { getAllProjects } from "@/lib/projects";
import { siteUrl } from "@/lib/site";

export default function sitemap() {
  const published = new Set(getCaseStudySlugs());
  const lastModified = new Date();

  const projectRoutes = getAllProjects()
    .filter((project) => !project.disabled && published.has(project.slug))
    .map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectRoutes,
  ];
}
