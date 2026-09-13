// Absolute base URL for canonical links, Open Graph images and the sitemap.
// Set NEXT_PUBLIC_SITE_URL once a custom domain is attached; on Vercel the
// production URL is injected automatically, so previews resolve without config.
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export const siteName = "Adrian Garcia";

export const siteDescription =
  "Full stack engineer and architect focused on building high-performance interfaces, real-time data pipelines and low-latency infrastructure for digital financial operations.";
