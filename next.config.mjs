/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets a second dev server (e.g. the in-app preview) run without sharing .next with yours
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
