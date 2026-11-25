import type { Metadata } from 'next'
import { CheckCircle2, Clock, Factory, Mail, MapPin, Phone } from 'lucide-react'
import { RfqForm } from '@/components/site/rfq-form'
import { company } from '@/lib/site'
import { getCanonicalOrigin } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Contact & Technical RFQ | Changzhou Gusheng Hardware Co., Ltd.',
  description:
    'Contact Changzhou Gusheng Hardware Co., Ltd. for nitrogen gas spring pricing, 10-brand cross-reference matching, sample dispatch, and OEM/ODM custom drawings.',
  alternates: { canonical: `${getCanonicalOrigin()}/contact` },
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ model?: string }>
}) {
  const { model } = await searchParams
  const defaultProduct = model?.trim() || ''

  return (
    <div className="bg-white">
      <section className="blueprint-grid border-b border-border bg-mist/70 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
            CONTACT &amp; TECHNICAL RFQ
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            Request Factory Quote or Engineering Match
          </h1>
          <p className="mt-4 max-w-3xl text-base text-steel">
            Send your required GB, GH, GS, or GU part numbers, competitor model codes, or custom stroke dimensions directly to Changzhou Gusheng Hardware Co., Ltd.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-reveal="" className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="space-y-6 lg:col-span-5">
              <div className="rounded-3xl border border-border bg-mist/50 p-6 sm:p-7">
                <div className="flex items-start gap-3">
                  <Factory className="mt-0.5 h-5 w-5 shrink-0 text-cobalt" />
                  <div>
                    <h2 className="text-lg font-semibold text-ink">{company.legalName}</h2>
                    <p className="text-xs font-medium text-steel">
                      {company.brand} · {company.brandLocal}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3.5 text-sm text-steel">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" />
                    <span>{company.addressInline}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-cobalt" />
                    <a href={company.telephoneHref} className="font-medium text-ink hover:text-cobalt">
                      Tel: {company.telephone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-cobalt" />
                    <a href={company.mobileHref} className="font-medium text-ink hover:text-cobalt">
                      Mobile: {company.mobile}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 shrink-0 text-cobalt" />
                    <a href={`mailto:${company.email}`} className="font-medium text-cobalt hover:underline">
                      {company.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 shrink-0 text-cobalt" />
                    <span>Standard Production Lead Time: ~15 Days</span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-white p-6 shadow-xs">
                <h3 className="text-sm font-semibold text-ink">What Helps Us Quote Faster</h3>
                <ul className="mt-3 space-y-2 text-xs leading-relaxed text-steel">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" />
                    <span>Target model code (e.g., GB1500-50) or competitor brand part number</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" />
                    <span>Required initial force (daN), stroke length (mm), and mounting flange (FA/FB/FC)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" />
                    <span>Estimated order quantity &amp; destination port/country for tiered pricing</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8 lg:col-span-7">
              <RfqForm
                captchaScope="contact-page"
                defaultProduct={defaultProduct}
                sourcePage="contact"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
