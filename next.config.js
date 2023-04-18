/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  transpilePackages: ['@douyinfe/semi-ui', '@douyinfe/semi-icons', '@douyinfe/semi-illustrations'],
  // compiler: {
  //   emotion: true,
  //   styledComponents: {
  //     ssr: true,
  //   },
  // },
};

module.exports = nextConfig;
