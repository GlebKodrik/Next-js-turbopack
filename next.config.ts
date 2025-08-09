import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    unoptimized: true,
  },
  sassOptions: {
    additionalData: '@use "app/styles" as *;',
  },
};

export default nextConfig;
