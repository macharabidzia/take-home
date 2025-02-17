// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Optional, but recommended
  swcMinify: true, // Optional, but often recommended for production
  async rewrites() {
    return [
      {
        source: '/api/graphql', // Your Next.js API route
        destination: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, // Your GraphQL server URL
      },
    ];
  },
  // Leave this empty! Do NOT configure Webpack for workers here.
  webpack: (config: any, { buildId, dev, isServer, defaultLoaders, webpack }: any) => {
    return config; // Return the config as is
  },
};

module.exports = nextConfig;
