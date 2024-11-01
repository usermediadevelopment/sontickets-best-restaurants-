import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: {
    domains: ["cdn.sanity.io", "via.placeholder.com", "picsum.photos"],
  },
};

export default nextConfig;
