/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  transpilePackages: ['@mantine/core'],
  // compiler: {
  //   emotion: true,
  //   styledComponents: {
  //     ssr: true,
  //   },
  // },
};

module.exports = {
  ...nextConfig,
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  },
};
