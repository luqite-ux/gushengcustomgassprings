/** @type {import('next').NextConfig} */
const ADMIN_ORIGIN = (process.env.HUANQIU_ADMIN_ORIGIN || 'https://huanqiu-admin.vercel.app').replace(/\/$/, '')

const nextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: `${ADMIN_ORIGIN}/admin`,
      },
      {
        source: '/admin/:path*',
        destination: `${ADMIN_ORIGIN}/admin/:path*`,
      },
    ]
  },
}

export default nextConfig
