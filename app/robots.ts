import type { MetadataRoute } from 'next'
import { getCanonicalOrigin } from '@/lib/supabase'

export default function robots(): MetadataRoute.Robots {
  const origin = getCanonicalOrigin()
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/', '/service-expired'],
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
  }
}
