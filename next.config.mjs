/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.STATIC_EXPORT === 'true' ? 'export' : undefined,
  basePath: process.env.STATIC_EXPORT === 'true' ? '/crash-cost-calculator' : '',
};

export default nextConfig;
