import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // 启用静态导出模式
  reactStrictMode: true,
  images: {
    unoptimized: true, // GitHub Pages 不支持动态图片优化
  },
  basePath: '/zhiheyaai', // 替换为你的仓库名
};

export default nextConfig;