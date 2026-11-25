import type { MetadataRoute } from 'next'
import { getCachedArticles, getCachedProducts, getCanonicalOrigin } from '@/lib/supabase'

export const revalidate = 300

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getCanonicalOrigin()
  const now = new Date()
  const [products, articles] = await Promise.all([
    getCachedProducts('en'),
    getCachedArticles('en'),
  ])

  const staticRoutes = [
    '',
    '/products',
    '/cross-reference',
    '/applications',
    '/manufacturing',
    '/quality',
    '/about',
    '/news',
    '/faq',
    '/contact',
  ].map((route) => ({
    url: `${origin}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
    priority: route === '' ? 1.0 : route === '/products' ? 0.9 : 0.8,
  }))

  const productRoutes = products.map((p) => ({
    url: `${origin}/products/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const articleRoutes = articles.map((a) => ({
    url: `${origin}/news/${a.slug}`,
    lastModified: a.updated_at ? new Date(a.updated_at) : a.published_at ? new Date(a.published_at) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...productRoutes, ...articleRoutes]
}
