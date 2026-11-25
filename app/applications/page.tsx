import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Layers } from 'lucide-react'
import { APPLICATIONS_CASES, R2_ASSETS } from '@/lib/catalog-data'
import { getCanonicalOrigin } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Applications & Engineering Cases | Stamping Dies & Precision Molds',
  description:
    'Explore nitrogen gas spring applications across automotive body stamping dies, progressive piercing tooling, plastic injection molds, and hose-linked manifold systems.',
  alternates: { canonical: `${getCanonicalOrigin()}/applications` },
}

const INSTALL_RULES = [
  'Mount rigidly using FA, FB, or FC flanges and clamps to prevent side-loading on the piston rod.',
  'Keep piston rod travel strictly parallel to press ram motion; avoid off-center contact.',
  'Reserve at least 5 mm or 10% of nominal stroke as a safety margin to prevent bottoming out.',
  'Operate within 0–40°C ambient temperature and avoid free uncontrolled return.',
  'Keep piston rods clean of coolant, weld spatter, and abrasive metal chips.',
] as const

export default function ApplicationsPage() {
  return (
    <div className="bg-white">
      <section className="blueprint-grid border-b border-border bg-mist/70 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
            APPLICATIONS &amp; ENGINEERING CASES
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            Stamping Dies, Injection Molds &amp; Linked Manifold Systems
          </h1>
          <p className="mt-4 max-w-3xl text-base text-steel">
            High-force, compact nitrogen gas springs engineered for consistent blank-holder pressure, clean sheet-metal forming, and synchronized multi-cylinder die plates.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {APPLICATIONS_CASES.map((item, idx) => (
              <article
                key={item.id}
                data-reveal=""
                style={{ ['--reveal-delay' as string]: `${idx * 75}ms` }}
                className="lift flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-xs"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-mist">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cobalt">
                    {item.tag}
                  </span>
                  <h2 className="mt-2 text-xl font-semibold text-ink">{item.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-steel">{item.summary}</p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-border/70 pt-4">
                    <span className="font-mono text-xs text-ink">
                      <strong className="text-cobalt">Series:</strong> {item.recommended}
                    </span>
                    <Link
                      href={`/contact?model=${encodeURIComponent(item.recommended)}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-cobalt hover:underline"
                    >
                      Discuss Application
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Hose-Linked Manifold Technical Highlight */}
          <div data-reveal="" className="mt-14 grid gap-8 rounded-3xl border border-border bg-mist/60 p-6 sm:p-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 font-mono text-xs font-semibold text-cobalt shadow-2xs">
                <Layers className="h-3.5 w-3.5" />
                MANIFOLD &amp; INSTALLATION GUIDE
              </div>
              <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">
                Best-Practice Mounting &amp; Hose-Linked Pressure Control
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-steel">
                For multi-cylinder automotive dies, Gusheng GB, GH, and GS (-G) cylinders connect via Ø10.5 mm M6 charging ports to external manifold blocks and pressure gauges — ensuring balanced force distribution across the entire die pad.
              </p>
              <ul className="mt-5 space-y-2.5 text-sm text-steel">
                {INSTALL_RULES.map((rule) => (
                  <li key={rule} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-xs lg:col-span-6">
              <img
                src={R2_ASSETS.manifoldDiagram}
                alt="Hose-linked nitrogen gas spring manifold plate assembly diagram"
                className="aspect-[16/10] w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
