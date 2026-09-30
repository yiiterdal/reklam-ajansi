import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve source files as-is: AVIF/WebP re-encoding halves chroma and softens fine detail.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    // Include retina full-bleed widths so 100vw heroes stay sharp on 2x/3x
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 85, 92, 100],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
        pathname: "/67e1418031b0a27e1810015c/**",
      },
      {
        protocol: "https",
        hostname: "www.kreatif.net",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
