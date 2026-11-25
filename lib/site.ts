export const siteUrl = 'https://gushengcustomgassprings.com'

export const company = {
  legalName: 'Changzhou Gusheng Hardware Co., Ltd.',
  brand: 'GUSHENG GAS SPRINGS',
  brandShort: 'GS',
  brandLocal: 'YING TE LI HUA',
  domain: 'gushengcustomgassprings.com',
  email: 'info@gushengcustomgassprings.com',
  telephone: '+86 0519-81889687',
  telephoneHref: 'tel:+8651981889687',
  mobile: '+86 135-8436-8351',
  mobileHref: 'tel:+8613584368351',
  addressLines: [
    'No. 1, Houcheng Group, Qingyun Village,',
    'Niutang Town, Wujin District,',
    'Changzhou, Jiangsu, China',
  ],
  addressInline:
    'No. 1, Houcheng Group, Qingyun Village, Niutang Town, Wujin District, Changzhou, Jiangsu, China',
  founded: 2011,
} as const

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Cross-Reference', href: '/cross-reference' },
  { label: 'Applications', href: '/applications' },
  { label: 'Manufacturing', href: '/manufacturing' },
  { label: 'Quality', href: '/quality' },
  { label: 'About', href: '/about' },
  { label: 'News', href: '/news' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
] as const

export const images = {
  logo: '/images/logo.png',
  banners: ['/images/banner-1.jpg', '/images/banner-2.jpg', '/images/banner-3.jpg'],
  gbStandard: '/images/prod-gb-standard.jpg',
  customExtended: '/images/prod-custom-extended.jpg',
  customKnurled: '/images/prod-custom-knurled.jpg',
  gb9500: '/images/prod-gb9500-heavy.jpg',
  cnc: '/images/factory-cnc.png',
  warehouse: '/images/factory-warehouse.png',
  certEcm: '/images/cert-ecm-ped.png',
} as const

export const metrics = [
  { value: '2011', label: 'Founded', detail: 'Nitrogen gas springs, 15+ years' },
  { value: '1,400', unit: 'm²', label: 'Workshop', detail: 'Precision machining facility' },
  { value: '20+', label: 'CNC & grinding machines', detail: 'Turning, grinding, drilling' },
  { value: '15', unit: 'days', label: 'Standard lead time', detail: 'Regular production orders' },
  { value: '1M+', label: 'Design cycles', detail: 'Engineered service life' },
] as const

export const mailtoHref = (subject: string, body?: string) =>
  `mailto:${company.email}?subject=${encodeURIComponent(subject)}${
    body ? `&body=${encodeURIComponent(body)}` : ''
  }`
