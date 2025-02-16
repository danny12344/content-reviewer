import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
    },
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  env: {
    NEXT_PUBLIC_API_URL: "https://content-reviewer-backend-91734819578.europe-west2.run.app",
  },
};

export default nextConfig;
