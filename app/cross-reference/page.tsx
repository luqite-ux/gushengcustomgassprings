import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { CrossReferenceFinder } from '@/components/site/cross-reference-finder'
import { getCanonicalOrigin } from '@/lib/supabase'

export const metadata: Metadata = {
  title: '10-Brand Nitrogen Gas Spring Cross-Reference | KALLER, DADCO, HYSON',
  description:
    'Interactive 10-brand cross-reference table mapping Gusheng GB, GS, GU, and GH nitrogen gas springs directly to HYSON, KALLER, SPECIAL, PASCAL, DADCO, QUIRI, TOSS, BEST, METROL, and AZOL.GAS.',
  alternates: { canonical: `${getCanonicalOrigin()}/cross-reference` },
}

const BRANDS = [
  'HYSON',
  'KALLER',
  'DADCO',
  'PASCAL',
  'AZOL.GAS',
  'QUIRI',
  'METROL',
  'SPECIAL',
  'TOSS',
  'BEST',
] as const

export default function CrossReferencePage() {
  return (
    <div className="bg-white">
      <section className="blueprint-grid border-b border-border bg-mist/70 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
            10-BRAND INTERCHANGEABILITY
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            International Nitrogen Gas Spring Cross-Reference
          </h1>
          <p className="mt-4 max-w-3xl text-base text-steel">
            Engineered to match international die-pocket dimensions, mounting threads, and initial force ratings across 10 major global brands — helping stamping plants reduce tooling costs by 30%–50% without modifying die designs.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {BRANDS.map((brand) => (
              <span
                key={brand}
                className="rounded-full border border-border bg-white px-3.5 py-1.5 font-mono text-xs font-semibold text-ink shadow-2xs"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-reveal="">
            <CrossReferenceFinder />
          </div>

          <div data-reveal="" className="mt-12 grid gap-6 rounded-3xl border border-border bg-mist/60 p-6 sm:p-8 lg:grid-cols-3">
            <div>
              <h2 className="text-lg font-semibold text-ink">Verified Drop-In Equivalence</h2>
              <p className="mt-2 text-sm text-steel">
                Each Gusheng model matches the cylinder diameter, rod diameter, overall shut height, and charging pressure class of its international counterpart.
              </p>
            </div>
            <ul className="space-y-2 text-sm text-steel">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" />
                <span>Direct replacement for ISO standard &amp; compact dies</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" />
                <span>30%–50% cost advantage vs Tier-1 imported springs</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" />
                <span>Standard GB models stocked for fast sample verification</span>
              </li>
            </ul>
            <div className="flex flex-col justify-center lg:items-end">
              <Link
                href="/contact"
                className="press inline-flex items-center gap-2 rounded-full bg-cobalt px-6 py-3 text-sm font-semibold text-white shadow-md shadow-cobalt/20 hover:bg-electric"
              >
                Submit Your BOM for Matching
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
