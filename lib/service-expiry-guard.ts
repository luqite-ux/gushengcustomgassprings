export const GUARD_VERSION = '2026-10-01'
export const SERVICE_STATUS_PROTOCOL_VERSION = 1

const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || '9ea0ebb9-3f79-4281-953a-854b1ebb5e4a'
const ADMIN_ORIGIN = (process.env.HUANQIU_ADMIN_ORIGIN || 'https://huanqiu-admin.vercel.app').replace(/\/$/, '')

export function isExemptPath(pathname: string): boolean {
  return (
    pathname === '/admin' ||
    pathname.startsWith('/admin/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname === '/service-expired' ||
    pathname === '/favicon.ico' ||
    pathname === '/icon.png' ||
    pathname === '/apple-icon.png' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    /\.(?:png|jpg|jpeg|webp|svg|ico|css|js|map|woff2?)$/i.test(pathname)
  )
}

export async function shouldBlockForServiceExpiry(): Promise<boolean> {
  if (!TENANT_ID || !ADMIN_ORIGIN) return false
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 2500)
  try {
    const res = await fetch(`${ADMIN_ORIGIN}/api/public/service-status/${encodeURIComponent(TENANT_ID)}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    })
    if (!res.ok) return false
    const data = await res.json()
    if (!data || data.protocol_version !== SERVICE_STATUS_PROTOCOL_VERSION) return false
    if (!data.enforcement_enabled || !data.guard_version || !data.expires_on) return false
    return data.expired === true
  } catch {
    return false
  } finally {
    clearTimeout(timer)
  }
}
