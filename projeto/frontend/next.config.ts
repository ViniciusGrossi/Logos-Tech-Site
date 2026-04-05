import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compress all assets
  compress: true,

  // Remove the X-Powered-By header (小 security + smaller response)
  poweredByHeader: false,

  // Optimized image formats (WebP + AVIF auto-conversion)
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year for static images
  },

  // Experimental: reduce JS bundle via tree-shaking on server
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-slot",
    ],
  },
};

export default nextConfig;
