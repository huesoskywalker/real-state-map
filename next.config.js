/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },

      {
        hostname: "avatars.githubusercontent.com",
      },
    ],
    domains: ["shopify.com", "cdn.shopify.com", "google.com", "github.com"],
  },
};

module.exports = nextConfig;
