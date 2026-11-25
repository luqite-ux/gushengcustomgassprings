import { createClient } from '@supabase/supabase-js'
import { unstable_cache } from 'next/cache'
import { company, siteUrl } from './site'
import { R2_ASSETS } from './catalog-data'

export const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || '9ea0ebb9-3f79-4281-953a-854b1ebb5e4a'

export interface ProductCategory {
  id: string
  slug: string
  name: string
  name_i18n?: Record<string, string>
  description?: string | null
  sort_order: number
}

export interface ProductItem {
  id: string
  slug: string
  name: string
  name_i18n?: Record<string, string>
  model?: string | null
  category: string
  category_slug: string
  description: string
  description_i18n?: Record<string, string>
  overview?: string | null
  overview_i18n?: Record<string, string>
  specs: Record<string, string>
  image_url: string
  gallery: string[]
  is_featured: boolean
  sort_order: number
  updated_at?: string | null
  seo_title?: string
  seo_description?: string
}

export interface ArticleItem {
  id: string
  slug: string
  title: string
  title_i18n?: Record<string, string>
  excerpt: string
  excerpt_i18n?: Record<string, string>
  content: string
  content_i18n?: Record<string, string>
  featured_image?: string | null
  published_at?: string | null
  updated_at?: string | null
}

export interface TenantSiteSettings {
  companyName: string
  brandName: string
  logoUrl: string
  faviconUrl: string
  contactEmail: string
  contactPhone: string
  contactMobile: string
  contactAddress: string
  domain: string
  supportedLanguages: string[]
  defaultLanguage: string
}

export function resolveI18n(
  map: Record<string, string> | undefined | null,
  fallback: string,
  locale = 'en',
  defaultLocale = 'en'
): string {
  if (!map || typeof map !== 'object') return fallback
  const direct = map[locale]?.trim()
  if (direct) return direct
  const def = map[defaultLocale]?.trim()
  if (def) return def
  for (const val of Object.values(map)) {
    if (typeof val === 'string' && val.trim()) return val.trim()
  }
  return fallback
}

function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
}

export const getCachedTenantSettings = unstable_cache(
  async (): Promise<TenantSiteSettings> => {
    const fallback: TenantSiteSettings = {
      companyName: company.legalName,
      brandName: company.brand,
      logoUrl: R2_ASSETS.logo,
      faviconUrl: R2_ASSETS.logo,
      contactEmail: company.email,
      contactPhone: company.telephone,
      contactMobile: company.mobile,
      contactAddress: company.addressInline,
      domain: company.domain,
      supportedLanguages: ['en'],
      defaultLanguage: 'en',
    }
    try {
      const sb = getSupabaseServerClient()
      if (!sb) return fallback
      const { data } = await sb
        .from('tenants')
        .select('domain, logo_url, default_language, supported_languages, extra_settings')
        .eq('id', TENANT_ID)
        .maybeSingle()
      if (!data) return fallback
      const extra = (data.extra_settings || {}) as Record<string, any>
      return {
        companyName: extra.company_name || fallback.companyName,
        brandName: extra.brand_name || fallback.brandName,
        logoUrl: data.logo_url || extra.logo_url || fallback.logoUrl,
        faviconUrl: extra.favicon_url || data.logo_url || fallback.faviconUrl,
        contactEmail: extra.contact_email || fallback.contactEmail,
        contactPhone: extra.contact_phone || fallback.contactPhone,
        contactMobile: extra.contact_mobile || fallback.contactMobile,
        contactAddress: extra.contact_address || fallback.contactAddress,
        domain: data.domain || fallback.domain,
        supportedLanguages: Array.isArray(data.supported_languages) && data.supported_languages.length ? data.supported_languages : ['en'],
        defaultLanguage: data.default_language || 'en',
      }
    } catch {
      return fallback
    }
  },
  ['gusheng-tenant-settings-v1', TENANT_ID],
  { revalidate: 300, tags: ['tenant-settings'] }
)

export const getCachedCategories = unstable_cache(
  async (locale = 'en'): Promise<ProductCategory[]> => {
    try {
      const sb = getSupabaseServerClient()
      if (!sb) return []
      const { data, error } = await sb
        .from('product_categories')
        .select('id, slug, name, name_en, name_i18n, description, sort_order')
        .eq('tenant_id', TENANT_ID)
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
      if (error || !data) return []
      return data.map((row: any) => ({
        id: row.id,
        slug: row.slug,
        name: resolveI18n(row.name_i18n, row.name_en || row.name, locale),
        name_i18n: row.name_i18n || {},
        description: row.description || null,
        sort_order: row.sort_order ?? 0,
      }))
    } catch {
      return []
    }
  },
  ['gusheng-categories-v1', TENANT_ID],
  { revalidate: 300, tags: ['categories'] }
)

export const getCachedProducts = unstable_cache(
  async (locale = 'en'): Promise<ProductItem[]> => {
    try {
      const sb = getSupabaseServerClient()
      if (!sb) return []
      const { data, error } = await sb
        .from('products')
        .select('id, slug, name, name_en, name_i18n, model, category, category_slug, description, description_en, description_i18n, overview, overview_en, overview_i18n, specs, image_url, sort_order, updated_at, extra_data')
        .eq('tenant_id', TENANT_ID)
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
      if (error || !data) return []
      return data.map((row: any) => {
        const extra = (row.extra_data || {}) as Record<string, any>
        const gallery: string[] = Array.isArray(extra.gallery) && extra.gallery.length
          ? extra.gallery
          : row.image_url ? [row.image_url] : []
        return {
          id: row.id,
          slug: row.slug,
          name: resolveI18n(row.name_i18n, row.name_en || row.name, locale),
          name_i18n: row.name_i18n || {},
          model: row.model || null,
          category: row.category || row.category_slug,
          category_slug: row.category_slug || '',
          description: resolveI18n(row.description_i18n, row.description_en || row.description || '', locale),
          description_i18n: row.description_i18n || {},
          overview: resolveI18n(row.overview_i18n, row.overview_en || row.overview || row.description || '', locale),
          overview_i18n: row.overview_i18n || {},
          specs: (row.specs && typeof row.specs === 'object') ? row.specs : {},
          image_url: row.image_url || gallery[0] || '',
          gallery,
          is_featured: Boolean(extra.is_featured),
          sort_order: row.sort_order ?? 0,
          updated_at: row.updated_at || null,
          seo_title: resolveI18n(extra.seo_title_i18n, '', locale) || undefined,
          seo_description: resolveI18n(extra.seo_description_i18n, '', locale) || undefined,
        }
      })
    } catch {
      return []
    }
  },
  ['gusheng-products-v1', TENANT_ID],
  { revalidate: 300, tags: ['products'] }
)

export const getCachedArticles = unstable_cache(
  async (locale = 'en'): Promise<ArticleItem[]> => {
    try {
      const sb = getSupabaseServerClient()
      if (!sb) return []
      const { data, error } = await sb
        .from('articles')
        .select('id, slug, title, title_en, title_i18n, excerpt, excerpt_en, excerpt_i18n, content, content_en, content_i18n, featured_image, published_at, updated_at, sort_order')
        .eq('tenant_id', TENANT_ID)
        .eq('is_published', true)
        .order('sort_order', { ascending: true })
        .order('published_at', { ascending: false, nullsFirst: false })
      if (error || !data) return []
      return data.map((row: any) => ({
        id: row.id,
        slug: row.slug,
        title: resolveI18n(row.title_i18n, row.title_en || row.title || '', locale),
        title_i18n: row.title_i18n || {},
        excerpt: resolveI18n(row.excerpt_i18n, row.excerpt_en || row.excerpt || '', locale),
        excerpt_i18n: row.excerpt_i18n || {},
        content: resolveI18n(row.content_i18n, row.content_en || row.content || '', locale),
        content_i18n: row.content_i18n || {},
        featured_image: row.featured_image || null,
        published_at: row.published_at || null,
        updated_at: row.updated_at || null,
      }))
    } catch {
      return []
    }
  },
  ['gusheng-articles-v1', TENANT_ID],
  { revalidate: 300, tags: ['articles'] }
)

export function getCanonicalOrigin() {
  return (process.env.NEXT_PUBLIC_SITE_URL || siteUrl).replace(/\/$/, '')
}
