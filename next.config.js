/** @type {import('next').NextConfig} */
const repoName = 'todo-frontend'; // <--- เอา // ออก
const nextConfig = {
  output: 'export',
  basePath: `/${repoName}`,     // <--- เอา // ออก
  assetPrefix: `/${repoName}/`, // <--- เอา // ออก
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;