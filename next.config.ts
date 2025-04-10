import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  skipTrailingSlashRedirect: true,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
