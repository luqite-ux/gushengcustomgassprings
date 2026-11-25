import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Factory, Wrench } from 'lucide-react'
import { FACTORY_PHOTOS, OEM_STEPS } from '@/lib/catalog-data'
import { metrics } from '@/lib/site'
import { getCanonicalOrigin } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Manufacturing & OEM/ODM Capabilities | Changzhou Gusheng Hardware',
  description:
    'Tour our 1,400 m² Changzhou CNC machining, DMTG M7140 surface grinding, component staging, and standard inventory warehouse — 20+ machines, 15-day lead time.',
  alternates: { canonical: `${getCanonicalOrigin()}/manufacturing` },
}

export default function ManufacturingPage() {
  return (
    <div className="bg-white">
      <section className="blueprint-grid border-b border-border bg-mist/70 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
            IN-HOUSE MANUFACTURING
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            1,400 m² Precision Machining &amp; OEM Production Facility
          </h1>
          <p className="mt-4 max-w-3xl text-base text-steel">
            Every Gusheng nitrogen gas spring is machined, ground, assembled, charged, and pressure-tested in-house at our Changzhou facility using 20+ specialized CNC lathes, engine lathes, surface grinders, and drilling machines.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-2xl border border-border bg-white p-4 shadow-2xs">
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-2xl font-bold text-cobalt">{m.value}</span>
                  {'unit' in m && m.unit && <span className="font-mono text-xs text-steel">{m.unit}</span>}
                </div>
                <p className="mt-1 text-xs font-semibold text-ink">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-reveal="" className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-ink sm:text-3xl">Workshop &amp; Equipment Tour</h2>
            <p className="mt-2 text-sm text-steel">
              Real factory photography from Changzhou Gusheng Hardware Co., Ltd. — from raw alloy bar machining to finished GB series warehouse racking.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FACTORY_PHOTOS.map((photo, idx) => (
              <figure
                key={photo.slug}
                data-reveal=""
                style={{ ['--reveal-delay' as string]: `${(idx % 3) * 70}ms` }}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-xs"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-mist">
                  <img src={photo.url} alt={photo.title} className="h-full w-full object-cover" />
                </div>
                <figcaption className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-semibold text-ink">{photo.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-steel">{photo.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* OEM / ODM 4-Step Process */}
          <div data-reveal="" className="mt-16 rounded-3xl border border-border bg-mist/60 p-6 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Wrench className="h-5 w-5 text-cobalt" />
                <h2 className="text-2xl font-semibold text-ink">OEM / ODM Custom Engineering Workflow</h2>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt hover:underline"
              >
                Send Custom Drawings
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {OEM_STEPS.map((s) => (
                <div key={s.step} className="rounded-2xl border border-border bg-white p-5 shadow-2xs">
                  <span className="font-mono text-xs font-bold text-cobalt">STEP {s.step}</span>
                  <h3 className="mt-2 text-base font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-steel">{s.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-3 border-t border-border pt-6 text-sm text-steel sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-cobalt" />
                <span>Custom strokes, threaded bodies &amp; rod finishes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-cobalt" />
                <span>Sample fees refundable upon formal bulk order</span>
              </div>
              <div className="flex items-center gap-2">
                <Factory className="h-4 w-4 shrink-0 text-cobalt" />
                <span>Stable peak-season delivery &amp; progress tracking</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
