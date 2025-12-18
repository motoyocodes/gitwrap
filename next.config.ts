import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // We removed the 'eslint' block because it causes the crash.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
