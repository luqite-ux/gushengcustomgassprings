import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Building2, Calendar, CheckCircle2, MapPin, ShieldCheck } from 'lucide-react'
import { FACTORY_PHOTOS } from '@/lib/catalog-data'
import { company, metrics } from '@/lib/site'
import { getCanonicalOrigin } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'About Changzhou Gusheng Hardware Co., Ltd. | Founded 2011',
  description:
    'Learn about Changzhou Gusheng Hardware Co., Ltd. (GUSHENG GAS SPRINGS / YING TE LI HUA) — established in 2011 in Changzhou, Jiangsu, specializing in precision nitrogen gas springs for stamping dies and molds.',
  alternates: { canonical: `${getCanonicalOrigin()}/about` },
}

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="blueprint-grid border-b border-border bg-mist/70 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
            COMPANY PROFILE · SINCE 2011
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            {company.legalName}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-steel">
            Founded on September 7, 2011 in Wujin District, Changzhou, Jiangsu Province, Changzhou Gusheng Hardware Co., Ltd. (brands: <strong>GUSHENG GAS SPRINGS</strong> and <strong>YING TE LI HUA</strong>) is a dedicated manufacturer of high-pressure nitrogen gas springs, precision cylinder barrels, and die mounting accessories for global automotive stamping and tooling manufacturers.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-reveal="" className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="space-y-5 lg:col-span-6">
              <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
                Direct Factory Precision with 10-Brand Global Compatibility
              </h2>
              <p className="text-sm leading-relaxed text-steel">
                Operating from a 1,400 m² workshop with 20+ specialized CNC lathes, engine lathes, DMTG M7140 surface grinders, drilling centers, and hydraulic presses, we focus exclusively on industrial nitrogen gas springs engineered for 1,000,000+ operating cycles.
              </p>
              <p className="text-sm leading-relaxed text-steel">
                Our GB, GH, GS, and GU series are built to match international mounting dimensions across 10 major global brands — including KALLER, DADCO, HYSON, PASCAL, AZOL.GAS, QUIRI, METROL, SPECIAL, TOSS, and BEST — delivering a 30%–50% cost advantage with a reliable 15-day regular production lead time.
              </p>

              <div className="grid gap-3 rounded-2xl border border-border bg-mist/60 p-5 text-sm">
                <div className="flex items-start gap-2.5">
                  <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" />
                  <span><strong className="text-ink">Legal Entity:</strong> {company.legalName} (Credit Code: 91320404582271686K)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" />
                  <span><strong className="text-ink">Established:</strong> September 7, 2011</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" />
                  <span><strong className="text-ink">Factory Address:</strong> {company.addressInline}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" />
                  <span><strong className="text-ink">Compliance:</strong> PED 2014/68/EU &amp; EN 13445 Technical Verification (No. 4Q251212.CGHSN54)</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
              {FACTORY_PHOTOS.slice(0, 4).map((photo) => (
                <div key={photo.slug} className="overflow-hidden rounded-2xl border border-border bg-mist">
                  <img src={photo.url} alt={photo.title} className="aspect-[4/3] w-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div data-reveal="" className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-2xl border border-border bg-mist/50 p-5">
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-2xl font-bold text-cobalt">{m.value}</span>
                  {'unit' in m && m.unit && <span className="font-mono text-xs text-steel">{m.unit}</span>}
                </div>
                <p className="mt-1 text-sm font-semibold text-ink">{m.label}</p>
                <p className="mt-0.5 text-xs text-steel">{m.detail}</p>
              </div>
            ))}
          </div>

          <div data-reveal="" className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border bg-mist/60 p-6 sm:p-8">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-ink">Partner Directly with Our Changzhou Factory</h3>
              <p className="flex items-center gap-2 text-sm text-steel">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-cobalt" />
                In-stock standard GB samples, drawing-to-sample OEM prototyping, and tiered bulk quotes.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:border-cobalt hover:text-cobalt"
              >
                Explore Products
              </Link>
              <Link
                href="/contact"
                className="press inline-flex items-center gap-2 rounded-full bg-cobalt px-6 py-2.5 text-sm font-semibold text-white hover:bg-electric"
              >
                Request Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
