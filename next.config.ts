import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configuración para exportación estática a GitHub Pages
  output: 'export',
  trailingSlash: true,
  basePath: '/XV-EXO', // Reemplazar con el nombre de tu repositorio
  images: {
    unoptimized: true, // Necesario para exportación estática
  },
  reactStrictMode: false,
  webpack: (config, { dev }) => {
    if (dev) {
      // 禁用 webpack 的热模块替换
      config.watchOptions = {
        ignored: ['**/*'], // 忽略所有文件变化
      };
    }
    return config;
  },
  eslint: {
    // 构建时忽略ESLint错误
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
