// next.config.js
module.exports = {
  // 1. ESLint hatalarını build sırasında ignore et
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // 2. TypeScript hatalarını build sırasında ignore et
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // 3. Build optimizasyonları
  reactStrictMode: true,
  swcMinify: true,
  
  // 4. Vercel özel ayarları
  output: process.env.VERCEL_ENV ? 'standalone' : undefined,
  
  // 5. Görsel optimizasyonu (Next.js 14+ için)
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  }
}