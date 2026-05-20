/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // optimize for Cloudflare edge runtime where supported
  },
  images: {
    remotePatterns: [],
  },
};

module.exports = nextConfig;
