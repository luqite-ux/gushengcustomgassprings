/** @type {import('next').NextConfig} */
const adminOrigin = (
  process.env.NEXT_PUBLIC_ADMIN_URL ||
  process.env.HUANQIU_ADMIN_ORIGIN ||
  'https://admin.globle-trade.com'
).replace(/\/$/, '')

const nextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: `${adminOrigin}/admin`,
      },
      {
        source: '/admin/:path*',
        destination: `${adminOrigin}/admin/:path*`,
      },
    ]
  },
}

export default nextConfig
