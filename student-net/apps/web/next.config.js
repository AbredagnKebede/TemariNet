/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ["@student-net/ui", "@student-net/utils", "@student-net/validation"],
    eslint: {
      dirs: ['src']
    }
  };
  
  module.exports = nextConfig;