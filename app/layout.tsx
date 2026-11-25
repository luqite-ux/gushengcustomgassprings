import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { SiteHeader } from '@/components/site/header'
import { SiteFooter } from '@/components/site/footer'
import { MotionReady } from '@/components/site/motion-ready'
import { company, siteUrl } from '@/lib/site'
import { R2_ASSETS } from '@/lib/catalog-data'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Gusheng Gas Springs | Precision Nitrogen Gas Springs Manufacturer, Changzhou',
    template: '%s | Gusheng Gas Springs',
  },
  description:
    'Changzhou Gusheng Hardware Co., Ltd. manufactures high-pressure nitrogen gas springs for stamping dies and molds: GB, GH, GS and GU series, OEM/ODM by drawing or sample, 15-day regular lead time.',
  applicationName: 'GUSHENG GAS SPRINGS',
  alternates: {
    canonical: siteUrl,
  },
  keywords: [
    'nitrogen gas spring',
    'die gas spring manufacturer',
    'custom nitrogen gas springs',
    'KALLER DADCO HYSON cross reference',
    'Changzhou gas spring supplier',
  ],
  openGraph: {
    type: 'website',
    siteName: 'GUSHENG GAS SPRINGS',
    url: siteUrl,
    title: 'Gusheng Gas Springs | Precision Nitrogen Gas Springs',
    description:
      'GB, GH, GS and GU series nitrogen gas springs engineered for 1,000,000+ cycles with 10-brand interchangeability and EN 13445 PED verification.',
    images: [{ url: R2_ASSETS.banners[0], width: 3840, height: 1600, alt: 'Precision stainless nitrogen gas springs by Changzhou Gusheng Hardware' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gusheng Gas Springs | Precision Nitrogen Gas Springs',
    description: 'GB, GH, GS and GU series nitrogen gas springs engineered for stamping dies & molds.',
    images: [R2_ASSETS.banners[0]],
  },
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png' }],
    apple: [{ url: '/apple-icon.png', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: company.legalName,
      alternateName: 'GUSHENG GAS SPRINGS',
      url: siteUrl,
      logo: R2_ASSETS.logo,
      foundingDate: '2011-09-07',
      email: company.email,
      telephone: company.telephone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'No. 1, Houcheng Group, Qingyun Village, Niutang Town',
        addressLocality: 'Wujin District, Changzhou',
        addressRegion: 'Jiangsu',
        addressCountry: 'CN',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Changzhou Gusheng Hardware Co., Ltd. — GUSHENG GAS SPRINGS',
      publisher: { '@id': `${siteUrl}/#organization` },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-cobalt/15 selection:text-cobalt">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-cobalt focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MotionReady />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  )
}
