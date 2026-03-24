import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/AuraSaasProject" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/AuraSaasProject/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
