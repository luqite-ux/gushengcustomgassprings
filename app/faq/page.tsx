import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { FaqAccordion } from '@/components/site/faq-accordion'
import { FAQ_ITEMS } from '@/lib/catalog-data'
import { getCanonicalOrigin } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Gusheng Nitrogen Gas Springs',
  description:
    'Answers on GB/GH/GS/GU series selection, 10-brand interchangeability, OEM/ODM custom strokes, refundable sample policy, 15-day lead time, and installation guidelines.',
  alternates: { canonical: `${getCanonicalOrigin()}/faq` },
}

export default function FaqPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="blueprint-grid border-b border-border bg-mist/70 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            Technical, Ordering &amp; Customization FAQ
          </h1>
          <p className="mt-4 max-w-3xl text-base text-steel">
            Clear, direct answers on our nitrogen gas spring models, international brand interchangeability, samples, 15-day production lead time, and safe die installation.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div data-reveal="">
            <FaqAccordion />
          </div>

          <div data-reveal="" className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border bg-mist/60 p-6 sm:p-8">
            <div>
              <h2 className="text-lg font-semibold text-ink">Have a Specific Drawing or Die Requirement?</h2>
              <p className="mt-1 text-sm text-steel">Our engineers respond directly to technical and cross-reference inquiries.</p>
            </div>
            <Link
              href="/contact"
              className="press inline-flex items-center gap-2 rounded-full bg-cobalt px-6 py-3 text-sm font-semibold text-white hover:bg-electric"
            >
              Ask an Engineer
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
