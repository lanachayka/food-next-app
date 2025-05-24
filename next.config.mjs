const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isProd ? '/food-next-app' : '',
  assetPrefix: isProd ? '/food-next-app' : '',
};

export default nextConfig;