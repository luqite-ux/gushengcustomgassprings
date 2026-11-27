import Link from 'next/link'
import { ArrowRight, ArrowUpRight, CheckCircle2, Factory, Mail, MapPin, Phone, ShieldCheck, Wrench } from 'lucide-react'
import { HeroCarousel } from '@/components/site/hero-carousel'
import { GasSpring3DSimulator } from '@/components/site/gas-spring-3d'
import { CrossReferenceFinder } from '@/components/site/cross-reference-finder'
import { CertificateGallery } from '@/components/site/certificate-gallery'
import { FaqAccordion } from '@/components/site/faq-accordion'
import { RfqForm } from '@/components/site/rfq-form'
import {
  APPLICATIONS_CASES,
  CATEGORY_ENTRIES,
  FACTORY_PHOTOS,
  OEM_STEPS,
} from '@/lib/catalog-data'
import { company, metrics } from '@/lib/site'
import { getCachedProducts } from '@/lib/supabase'

export const revalidate = 300

export default async function HomePage() {
  const allProducts = await getCachedProducts('en')
  const featured = allProducts.filter((p) => p.is_featured).slice(0, 6)
  const displayProducts = featured.length ? featured : allProducts.slice(0, 6)

  return (
    <div className="bg-white">
      {/* 1. Hero Carousel (3 verified customer banners) */}
      <HeroCarousel />

      {/* 2. Verified Factory Metrics Strip */}
      <section className="border-b border-border bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-reveal="" className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-border/80 bg-mist/60 p-4 sm:p-5"
              >
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-2xl font-bold tracking-tight text-cobalt sm:text-3xl">
                    {m.value}
                  </span>
                  {'unit' in m && m.unit && (
                    <span className="font-mono text-xs font-semibold text-steel">{m.unit}</span>
                  )}
                </div>
                <p className="mt-1 text-sm font-semibold text-ink">{m.label}</p>
                <p className="mt-0.5 text-xs text-steel">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Four Product Series Overview */}
      <section className="bg-mist/50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-reveal="" className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
                PRODUCT ARCHITECTURE
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Core Nitrogen Gas Spring Series &amp; Custom Engineering
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt hover:underline"
            >
              Browse Complete Catalog
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORY_ENTRIES.map((cat, idx) => (
              <Link
                key={cat.slug}
                href={`/products?category=${encodeURIComponent(cat.slug)}`}
                data-reveal=""
                style={{ ['--reveal-delay' as string]: `${idx * 70}ms` }}
                className="lift group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-xs"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-mist">
                  <img
                    src={cat.image}
                    alt={cat.shortTitle}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-2 font-mono text-[11px] font-semibold text-cobalt">
                    <span>{cat.forceRange}</span>
                    <span className="text-steel">{cat.strokeRange}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-ink group-hover:text-cobalt">
                    {cat.shortTitle}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-steel">{cat.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-cobalt">
                    Explore series
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Three.js 3D Cutaway & Force Simulator */}
      <GasSpring3DSimulator />

      {/* 5. Featured Products Showcase (Live from Supabase) */}
      <section className="bg-mist/50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-reveal="" className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
                FEATURED MODELS
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Standard &amp; Custom Nitrogen Gas Springs
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt hover:underline"
            >
              View All {allProducts.length || 6} Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayProducts.map((prod, idx) => (
              <article
                key={prod.id}
                data-reveal=""
                style={{ ['--reveal-delay' as string]: `${(idx % 3) * 70}ms` }}
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
                  <h3 className="mt-3 line-clamp-2 text-lg font-semibold text-ink">
                    <Link href={`/products/${prod.slug}`} className="hover:text-cobalt">
                      {prod.name}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-steel">
                    {prod.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4">
                    <Link
                      href={`/products/${prod.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-cobalt hover:underline"
                    >
                      Specifications &amp; Table
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/contact?model=${encodeURIComponent(prod.model || prod.name)}`}
                      className="text-xs font-medium text-steel hover:text-cobalt"
                    >
                      Quick RFQ
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 10-Brand International Cross-Reference Finder */}
      <section className="border-y border-border bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-reveal="" className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
              GLOBAL INTERCHANGEABILITY MATRIX
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Direct Drop-In Replacement for 10 International Brands
            </h2>
            <p className="mt-3 text-base text-steel">
              Match your existing KALLER, DADCO, HYSON, PASCAL, AZOL.GAS, QUIRI, METROL, SPECIAL, TOSS, or BEST part numbers to exact Gusheng GB, GS, GU, and GH equivalents — delivering 30%–50% cost savings with matched mounting dimensions.
            </p>
          </div>
          <div data-reveal="" className="mt-8">
            <CrossReferenceFinder compact />
          </div>
        </div>
      </section>

      {/* 7. Application Scenarios & Cases */}
      <section className="bg-mist/50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-reveal="" className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
                ENGINEERING APPLICATIONS &amp; CASES
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Proven Across Stamping Dies, Precision Molds &amp; Linked Manifolds
              </h2>
            </div>
            <Link
              href="/applications"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt hover:underline"
            >
              Explore All Application Cases
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {APPLICATIONS_CASES.map((item, idx) => (
              <article
                key={item.id}
                data-reveal=""
                style={{ ['--reveal-delay' as string]: `${idx * 75}ms` }}
                className="lift flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-xs sm:flex-row"
              >
                <div className="aspect-[4/3] w-full shrink-0 overflow-hidden bg-mist sm:aspect-auto sm:w-48 lg:w-56">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-cobalt">
                    {item.tag}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-steel">{item.summary}</p>
                  <p className="mt-4 border-t border-border/70 pt-3 font-mono text-[11px] text-steel">
                    <span className="font-semibold text-ink">Recommended:</span> {item.recommended}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Individual Certificates & PED Verification */}
      <section className="border-y border-border bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-reveal="" className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
                VERIFIED COMPLIANCE &amp; CREDENTIALS
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Every Certificate &amp; Technical Verification Presented Individually
              </h2>
              <p className="mt-3 text-base text-steel">
                Click any credential below to inspect the high-resolution document covering our GB, GH, GS, and GU nitrogen gas spring series under EN 13445 &amp; PED 2014/68/EU.
              </p>
            </div>
            <Link
              href="/quality"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt hover:underline"
            >
              Quality &amp; Safety Standards
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10">
            <CertificateGallery />
          </div>
        </div>
      </section>

      {/* 9. Factory Tour Bento & 4-Step OEM Workflow */}
      <section className="bg-mist/50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-reveal="" className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
                CHANGZHOU MANUFACTURING FACILITY
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Inside Our 1,400 m² CNC &amp; Grinding Workshop
              </h2>
            </div>
            <Link
              href="/manufacturing"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt hover:underline"
            >
              Full Equipment &amp; OEM Capabilities
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FACTORY_PHOTOS.map((photo, idx) => (
              <figure
                key={photo.slug}
                data-reveal=""
                style={{ ['--reveal-delay' as string]: `${(idx % 3) * 70}ms` }}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-xs"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-mist">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-semibold text-ink">{photo.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-steel">{photo.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* 4-Step OEM Process */}
          <div data-reveal="" className="mt-12 rounded-3xl border border-border bg-white p-6 shadow-xs sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-cobalt" />
                <h3 className="text-lg font-semibold text-ink">OEM / ODM Custom Production Workflow</h3>
              </div>
              <span className="font-mono text-xs font-semibold text-cobalt">15-Day Standard Delivery</span>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {OEM_STEPS.map((s) => (
                <div key={s.step} className="rounded-2xl bg-mist/70 p-4">
                  <span className="font-mono text-xs font-bold text-cobalt">STEP {s.step}</span>
                  <h4 className="mt-1.5 text-sm font-semibold text-ink">{s.title}</h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-steel">{s.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. Quick Technical FAQ */}
      <section className="border-t border-border bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-reveal="" className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
                BUYER &amp; ENGINEERING FAQ
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Common Questions on Models, Samples &amp; Lead Time
              </h2>
            </div>
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt hover:underline"
            >
              Read All FAQs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div data-reveal="" className="mt-8">
            <FaqAccordion limit={5} />
          </div>
        </div>
      </section>

      {/* 11. Balanced Split Technical RFQ Section */}
      <section className="border-t border-border bg-mist py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-reveal="" className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="space-y-6 lg:col-span-5">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
                  DIRECT FACTORY RFQ
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink">
                  Request Drawings, Cross-Reference Match or Volume Quote
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-steel">
                  Send your target GB/GH/GS/GU part numbers, competitor codes (KALLER, DADCO, HYSON, PASCAL), or custom stroke drawings directly to our Changzhou engineering desk.
                </p>
              </div>

              <div className="space-y-3 rounded-3xl border border-border bg-white p-6 shadow-xs">
                <div className="flex items-start gap-3">
                  <Factory className="mt-0.5 h-5 w-5 shrink-0 text-cobalt" />
                  <div>
                    <p className="text-sm font-semibold text-ink">{company.legalName}</p>
                    <p className="text-xs text-steel">Brand: {company.brand} ({company.brandLocal})</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm text-steel">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" />
                  <span>{company.addressInline}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 shrink-0 text-cobalt" />
                  <a href={company.telephoneHref} className="font-medium text-ink hover:text-cobalt">
                    Tel: {company.telephone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 shrink-0 text-cobalt" />
                  <a href={company.mobileHref} className="font-medium text-ink hover:text-cobalt">
                    Mobile: {company.mobile}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 shrink-0 text-cobalt" />
                  <a href={`mailto:${company.email}`} className="font-medium text-cobalt hover:underline">
                    {company.email}
                  </a>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-steel">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-cobalt" />
                  <span>Standard GB stock available for rapid sample dispatch</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-cobalt" />
                  <span>Sample fee refundable upon formal bulk order</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-cobalt" />
                  <span>Pre-shipment pressure &amp; dimensional inspection reports included</span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8 lg:col-span-7">
              <RfqForm captchaScope="home-rfq" sourcePage="home" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
