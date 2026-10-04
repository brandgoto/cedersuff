/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://cedersuff.com",
  // Follow next.config's distDir override so sitemaps build from the right output
  sourceDir: process.env.NEXT_DIST_DIR || ".next",
  generateRobotsTxt: true,
  exclude: ["/api/*", "/flyer"],
};
