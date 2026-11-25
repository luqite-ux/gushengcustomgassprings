import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react'
import { ProductGallery } from '@/components/site/product-gallery'
import { RfqForm } from '@/components/site/rfq-form'
import { SERIES_TABLES } from '@/lib/catalog-data'
import { company } from '@/lib/site'
import { getCachedProducts, getCanonicalOrigin } from '@/lib/supabase'

export const revalidate = 300

function detectSeriesKey(slug: string, model?: string | null): 'GB' | 'GH' | 'GS' | 'GU' | null {
  const hay = `${slug} ${model || ''}`.toLowerCase()
  if (hay.includes('gb-series') || hay.includes('gb9500')) return 'GB'
  if (hay.includes('gh-series')) return 'GH'
  if (hay.includes('gs-series')) return 'GS'
  if (hay.includes('gu-series')) return 'GU'
  return null
}

export async function generateStaticParams() {
  const products = await getCachedProducts('en')
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const products = await getCachedProducts('en')
  const prod = products.find((p) => p.slug === slug)
  if (!prod) return { title: 'Product Not Found' }
  const origin = getCanonicalOrigin()
  return {
    title: prod.seo_title || `${prod.name} | ${company.brand}`,
    description: prod.seo_description || prod.description,
    alternates: { canonical: `${origin}/products/${prod.slug}` },
    openGraph: {
      title: prod.name,
      description: prod.description,
      images: prod.image_url ? [{ url: prod.image_url }] : undefined,
    },
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const products = await getCachedProducts('en')
  const product = products.find((p) => p.slug === slug)
  if (!product) notFound()

  const origin = getCanonicalOrigin()
  const seriesKey = detectSeriesKey(product.slug, product.model)
  const seriesRows = seriesKey ? SERIES_TABLES[seriesKey] : null
  const specEntries = Object.entries(product.specs || {})
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3)

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.gallery.length ? product.gallery : [product.image_url],
    sku: product.model || product.slug,
    brand: { '@type': 'Brand', name: company.brand },
    manufacturer: { '@type': 'Organization', name: company.legalName, url: origin },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: origin },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${origin}/products` },
      { '@type': 'ListItem', position: 3, name: product.name, item: `${origin}/products/${product.slug}` },
    ],
  }

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Breadcrumb Bar */}
      <div className="border-b border-border bg-mist/60 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-xs text-steel">
            <Link href="/" className="shrink-0 hover:text-cobalt">Home</Link>
            <span className="shrink-0">/</span>
            <Link href="/products" className="shrink-0 hover:text-cobalt">Products</Link>
            <span className="shrink-0">/</span>
            <span className="min-w-0 truncate font-medium text-ink">{product.name}</span>
          </nav>
          <Link href="/products" className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-cobalt hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" />
            All Products
          </Link>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-6">
              <ProductGallery name={product.name} images={product.gallery} />
            </div>

            <div className="min-w-0 space-y-6 lg:col-span-6">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-mist-2 px-3 py-1 font-mono text-xs font-semibold text-cobalt">
                    {product.model || product.category}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1 font-mono text-xs text-steel">
                    <ShieldCheck className="h-3.5 w-3.5 text-cobalt" />
                    EN 13445 · PED Verified
                  </span>
                </div>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  {product.name}
                </h1>
                <p className="mt-4 text-base leading-relaxed text-steel">
                  {product.overview || product.description}
                </p>
              </div>

              {/* Key Specifications Grid */}
              {specEntries.length > 0 && (
                <div className="overflow-hidden rounded-2xl border border-border bg-white">
                  <div className="border-b border-border bg-mist px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-cobalt">
                    Technical Specifications
                  </div>
                  <dl className="divide-y divide-border/70">
                    {specEntries.map(([k, v]) => (
                      <div key={k} className="grid grid-cols-12 gap-2 px-4 py-3 text-sm sm:px-5">
                        <dt className="col-span-5 min-w-0 break-words font-medium text-steel">{k}</dt>
                        <dd className="col-span-7 min-w-0 break-words font-mono text-xs font-semibold text-ink sm:text-sm">
                          {v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <a
                  href="#product-rfq"
                  className="press inline-flex items-center gap-2 rounded-full bg-cobalt px-6 py-3 text-sm font-semibold text-white shadow-md shadow-cobalt/20 hover:bg-electric"
                >
                  Request Price &amp; CAD Drawing
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/cross-reference"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-ink hover:border-cobalt hover:text-cobalt"
                >
                  10-Brand Cross-Reference
                </Link>
              </div>

              <div className="grid gap-2 rounded-2xl border border-border bg-mist/60 p-4 text-xs text-steel sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-cobalt" />
                  <span>15-day regular production lead time</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-cobalt" />
                  <span>Pre-shipment pressure &amp; leak inspection</span>
                </div>
              </div>
            </div>
          </div>

          {/* Series Parameter Matrix (from Customer PDF Catalog) */}
          {seriesRows && (
            <div data-reveal="" className="mt-14">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
                    PDF CATALOG PARAMETER MATRIX
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold text-ink">
                    {seriesKey} Series Full Model &amp; Dimension Table
                  </h2>
                </div>
                <span className="font-mono text-xs text-steel">
                  Standard Charging Gas: High-Purity Nitrogen (N₂) · Operating Temp: 0–40°C
                </span>
              </div>
              <div className="mt-5 overflow-x-auto rounded-2xl border border-border bg-white shadow-xs">
                <table className="w-full min-w-[700px] text-left text-xs sm:text-sm">
                  <thead className="border-b border-border bg-mist font-mono text-[11px] uppercase tracking-wider text-steel">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-cobalt">Model</th>
                      <th className="px-4 py-3">Initial Force (daN)</th>
                      <th className="px-4 py-3">Max End Force (daN)</th>
                      <th className="px-4 py-3">Rod Ø A (mm)</th>
                      <th className="px-4 py-3">Body Ø B (mm)</th>
                      <th className="px-4 py-3">Charging Pressure</th>
                      <th className="px-4 py-3">Standard Strokes</th>
                      <th className="px-4 py-3">Base Thread (M)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/70 font-mono text-xs">
                    {seriesRows.map((row) => (
                      <tr key={row.model} className="hover:bg-mist/50">
                        <td className="px-4 py-3 font-semibold text-cobalt">{row.model}</td>
                        <td className="px-4 py-3 text-ink">{row.initialDaN}</td>
                        <td className="px-4 py-3 text-ink">{row.finalDaN}</td>
                        <td className="px-4 py-3 text-steel">{row.rodA}</td>
                        <td className="px-4 py-3 text-steel">{row.bodyB}</td>
                        <td className="px-4 py-3 text-steel">{row.pressure}</td>
                        <td className="px-4 py-3 text-steel">{row.strokes}</td>
                        <td className="px-4 py-3 text-steel">{row.threadM}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Product-Specific RFQ Form */}
          <div id="product-rfq" data-reveal="" className="mt-14 rounded-3xl border border-border bg-mist/60 p-5 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="min-w-0 lg:col-span-5">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
                  TECHNICAL INQUIRY
                </p>
                <h2 className="mt-2 break-words text-2xl font-semibold text-ink">
                  Request Quote for {product.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-steel">
                  Specify your required stroke length, mounting flange (FA/FB/FC), charging pressure, and order quantity. Our engineers will verify compatibility and reply with factory pricing.
                </p>
              </div>
              <div className="min-w-0 rounded-2xl border border-border bg-white p-5 shadow-xs sm:p-6 lg:col-span-7">
                <RfqForm
                  captchaScope={`product-${product.slug}`}
                  defaultProduct={product.model || product.name}
                  sourcePage={`product:${product.slug}`}
                />
              </div>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div data-reveal="" className="mt-16">
              <h2 className="text-2xl font-semibold text-ink">Related Gas Spring Series</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    href={`/products/${item.slug}`}
                    className="lift flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-xs"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-mist">
                      <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="font-mono text-[11px] font-semibold text-cobalt">{item.model}</span>
                      <h3 className="mt-1.5 line-clamp-2 text-base font-semibold text-ink">{item.name}</h3>
                      <span className="mt-auto pt-3 inline-flex items-center gap-1 text-xs font-semibold text-cobalt">
                        View details <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
