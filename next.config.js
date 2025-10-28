/** @type {import('next').NextConfig} */
const repoName = 'todo-frontend'; 
const isGithubActions = process.env.GITHUB_ACTIONS || false;

let assetPrefix = '/';
let basePath = '';

if (isGithubActions) {
  const repo = repoName.startsWith('/') ? repoName.slice(1) : repoName; 

  basePath = `/${repo}`;
  assetPrefix = `/${repo}/`; 
}

const nextConfig = {
  output: 'export',          // Keep static export enabled
  images: {
    unoptimized: true,       // Required for static export
  },
  trailingSlash: true,       // Optional: Keep if you prefer trailing slashes
  basePath: basePath,        // Add basePath
  assetPrefix: assetPrefix,  // Add assetPrefix
};

module.exports = nextConfig;