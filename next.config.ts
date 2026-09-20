import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/therapist",
        destination: "/professional",
        permanent: true,
      },
      {
        source: "/therapist/:slug*",
        destination: "/professional/:slug*",
        permanent: true,
      },
      {
        source: "/settings",
        destination: "/profile",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
