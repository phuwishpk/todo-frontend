/** @type {import('next').NextConfig} */
const repoName = 'todo-frontend';
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;