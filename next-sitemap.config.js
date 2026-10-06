/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://cedersuff.com",
  // Follow next.config's distDir override so sitemaps build from the right output
  sourceDir: process.env.NEXT_DIST_DIR || ".next",
  generateRobotsTxt: true,
  // Icon routes are files, not pages
  exclude: ["/flyer", "/api/*", "/icon.png", "/apple-icon.png", "/favicon.ico"],
  robotsTxtOptions: {
    // One group for "*": crawlers read a single group per user-agent, so allow + disallow live together
    policies: [{ userAgent: "*", allow: "/", disallow: ["/flyer", "/api/"] }],
    additionalSitemaps: [],
  },
};
