import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getCachedCategories, getCachedProducts, getCanonicalOrigin } from '@/lib/supabase'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Nitrogen Gas Spring Products | GB, GH, GS, GU & Custom Series',
  description:
    'Browse all 11 standard and custom nitrogen gas spring products from Changzhou Gusheng Hardware Co., Ltd. — GB, GH, GS, GU series, custom non-standard springs, barrels, and mounting flanges.',
  alternates: { canonical: `${getCanonicalOrigin()}/products` },
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const [categories, products] = await Promise.all([
    getCachedCategories('en'),
    getCachedProducts('en'),
  ])

  const activeCategory = category?.trim() || ''
  const filtered = activeCategory
    ? products.filter((p) => p.category_slug === activeCategory)
    : products

  return (
    <div className="bg-white">
      <section className="blueprint-grid border-b border-border bg-mist/70 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
            PRODUCT CATALOG
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            Nitrogen Gas Springs &amp; Precision Components
          </h1>
          <p className="mt-4 max-w-3xl text-base text-steel">
            Complete range of standard GB, GH, GS, and GU nitrogen gas springs (170–18,400 daN), drawing-to-sample custom non-standard units, high-pressure cylinder barrels, and FA/FB/FC mounting flanges.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            <Link
              href="/products"
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                !activeCategory
                  ? 'bg-cobalt text-white shadow-xs'
                  : 'border border-border bg-white text-steel hover:border-cobalt/40 hover:text-cobalt'
              }`}
            >
              All Products ({products.length})
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${encodeURIComponent(cat.slug)}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat.slug
                    ? 'bg-cobalt text-white shadow-xs'
                    : 'border border-border bg-white text-steel hover:border-cobalt/40 hover:text-cobalt'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((prod, idx) => (
              <article
                key={prod.id}
                data-reveal=""
                style={{ ['--reveal-delay' as string]: `${(idx % 3) * 65}ms` }}
                className="lift flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-xs"
              >
                <Link href={`/products/${prod.slug}`} className="block aspect-[4/3] w-full overflow-hidden bg-mist">
                  <img
                    src={prod.image_url}
                    alt={prod.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-mist-2 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-cobalt">
                      {prod.model || prod.category}
                    </span>
                    {prod.specs['Initial Force'] && (
                      <span className="font-mono text-[11px] text-steel">{prod.specs['Initial Force']}</span>
                    )}
                  </div>
                  <h2 className="mt-3 line-clamp-2 text-lg font-semibold text-ink">
                    <Link href={`/products/${prod.slug}`} className="hover:text-cobalt">
                      {prod.name}
                    </Link>
                  </h2>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-steel">
                    {prod.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4">
                    <Link
                      href={`/products/${prod.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-cobalt hover:underline"
                    >
                      View Specifications
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/contact?model=${encodeURIComponent(prod.model || prod.name)}`}
                      className="text-xs font-medium text-steel hover:text-cobalt"
                    >
                      Request Quote
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
