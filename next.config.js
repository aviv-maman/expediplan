/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  // compiler: {
  //   emotion: true,
  //   styledComponents: {
  //     ssr: true,
  //   },
  // },
};

module.exports = nextConfig;
