import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "d2ol7oe51mr4n9.cloudfront.net" }],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
