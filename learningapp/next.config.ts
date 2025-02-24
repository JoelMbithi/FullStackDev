/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.clerk.com"], // ✅ Allow Clerk's image domain
  },
};

module.exports = nextConfig;
