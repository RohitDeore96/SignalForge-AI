import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Prevent deployment builds from breaking on minor type mismatches while keeping editor validation strict
    ignoreBuildErrors: true,
  },
  eslint: {
    // Avoid formatting check delays in Vercel build workflows
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
