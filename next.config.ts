import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* congf options here */
  images : {
    remotePatterns : [
      {
        protocol: 'https',
        hostname : 'res.cloudinary.com'
      }
    ]
  }
};

export default nextConfig;
