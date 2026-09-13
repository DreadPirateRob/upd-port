import DistributedMdPlatform, {
  contents as distributedMdPlatformContents,
} from "@/components/project/case-studies/DistributedMdPlatform";

// Every published project slug maps to a bespoke case-study article. A slug
// present in `content/projects` but missing here has no article yet, so the
// route 404s rather than rendering an empty shell.
const caseStudies = {
  "distributed-md-platform": {
    Article: DistributedMdPlatform,
    contents: distributedMdPlatformContents,
  },
};

export function getCaseStudy(slug) {
  return caseStudies[slug] ?? null;
}

export function getCaseStudySlugs() {
  return Object.keys(caseStudies);
}
