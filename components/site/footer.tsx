import Link from 'next/link'
import { Mail, MapPin, Phone, Smartphone } from 'lucide-react'
import { company, navItems } from '@/lib/site'
import { R2_ASSETS, CATEGORY_ENTRIES } from '@/lib/catalog-data'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-mist">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="GUSHENG GAS SPRINGS Home">
              <img
                src={R2_ASSETS.logo}
                alt="GUSHENG GAS SPRINGS Logo"
                className="h-12 w-auto max-w-[140px] object-contain"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-steel">
              {company.legalName} ({company.brandLocal}) has engineered and manufactured precision high-pressure nitrogen gas springs in Changzhou since {company.founded} — supporting standard GB, GH, GS, GU series and custom OEM/ODM tooling.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-cobalt">
              Product Series
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CATEGORY_ENTRIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="text-steel transition-colors hover:text-cobalt"
                  >
                    {cat.shortTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/cross-reference" className="text-steel transition-colors hover:text-cobalt">
                  10-Brand Cross-Reference
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-cobalt">
              Company
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navItems
                .filter((i) => ['/', '/applications', '/manufacturing', '/quality', '/about', '/news', '/faq', '/contact'].includes(i.href))
                .map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-steel transition-colors hover:text-cobalt">
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-cobalt">
              Direct Contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-steel">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" />
                <span>{company.addressInline}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-cobalt" />
                <a href={company.telephoneHref} className="hover:text-cobalt">
                  Tel: {company.telephone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Smartphone className="h-4 w-4 shrink-0 text-cobalt" />
                <a href={company.mobileHref} className="hover:text-cobalt">
                  Mobile: {company.mobile}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-cobalt" />
                <a href={`mailto:${company.email}`} className="break-all hover:text-cobalt">
                  {company.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-steel sm:flex-row sm:items-center">
          <p>© {year} {company.legalName}. All rights reserved.</p>
          <p className="font-mono">EN 13445 · PED 2014/68/EU Technical Documentation Verified · Changzhou, China</p>
        </div>
      </div>
    </footer>
  )
}
