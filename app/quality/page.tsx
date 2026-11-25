import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileCheck2, ShieldCheck } from 'lucide-react'
import { CertificateGallery } from '@/components/site/certificate-gallery'
import { getCanonicalOrigin } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Quality, PED 2014/68/EU Verification & Certificates | Gusheng',
  description:
    'Inspect every individual certificate and technical verification for Changzhou Gusheng Hardware Co., Ltd.: ECM PED Verification 4Q251212.CGHSN54, 31-page PED Technical Report P-20251211021, and 2020 Integrity Enterprise Honor.',
  alternates: { canonical: `${getCanonicalOrigin()}/quality` },
}

const QC_PILLARS = [
  {
    title: 'EN 13445-2 Pressure-Bearing Material Control',
    detail: 'High-strength alloy steel bar stock inspected for chemical composition, yield strength, and ultrasonic soundness prior to CNC turning.',
  },
  {
    title: 'EN 13445-3 Shell Design & Fatigue Evaluation',
    detail: 'Cylinder wall thickness, groove geometry, and thread engagement engineered for 15–18 MPa operating nitrogen pressure across 1,000,000+ cycles.',
  },
  {
    title: '100% Pre-Shipment Pressure & Leak Testing',
    detail: 'Every finished gas spring is charged with high-purity N₂, cycled, and checked for initial force accuracy, rod concentricity, and zero-leak sealing.',
  },
  {
    title: 'Third-Party Pre-Shipment Inspection Ready',
    detail: 'Full dimensional QC reports and technical data sheets accompany every batch; third-party inspection agencies are welcomed prior to dispatch.',
  },
] as const

export default function QualityPage() {
  return (
    <div className="bg-white">
      <section className="blueprint-grid border-b border-border bg-mist/70 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
            QUALITY &amp; COMPLIANCE
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            PED 2014/68/EU Technical Verification &amp; Individual Certificates
          </h1>
          <p className="mt-4 max-w-3xl text-base text-steel">
            Every credential held by Changzhou Gusheng Hardware Co., Ltd. is displayed individually below with full document code, issuing body, and verified scope. Click any certificate to inspect the full scan.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CertificateGallery />

          {/* Quality Inspection Pillars */}
          <div data-reveal="" className="mt-16">
            <div className="flex items-center gap-2 text-cobalt">
              <ShieldCheck className="h-5 w-5" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em]">
                ISO-9001 INTERNAL QC &amp; EN 13445 ENGINEERING
              </span>
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
              Four-Stage Quality Control Before Shipment
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {QC_PILLARS.map((p) => (
                <div key={p.title} className="rounded-3xl border border-border bg-mist/50 p-6">
                  <div className="flex items-start gap-3">
                    <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-cobalt" />
                    <div>
                      <h3 className="text-base font-semibold text-ink">{p.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-steel">{p.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal="" className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border bg-white p-6 shadow-xs sm:p-8">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-ink">Need Technical Data Sheets or Inspection Reports?</h3>
              <p className="flex items-center gap-2 text-sm text-steel">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-cobalt" />
                Request model-specific QC documentation or arrange third-party inspection with our engineering desk.
              </p>
            </div>
            <Link
              href="/contact"
              className="press inline-flex items-center gap-2 rounded-full bg-cobalt px-6 py-3 text-sm font-semibold text-white hover:bg-electric"
            >
              Contact Quality Desk
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
