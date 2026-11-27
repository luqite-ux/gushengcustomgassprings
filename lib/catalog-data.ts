export const R2_ASSETS = {
  logo: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/gushengcustomgassprings/brand/gusheng-logo-ae2ac4f1aa-opt.webp',
  banners: [
    'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/gushengcustomgassprings/banners/banner-1-03f2a716bb.jpg',
    'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/gushengcustomgassprings/banners/banner-2-953f220c8c.jpg',
    'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/gushengcustomgassprings/banners/banner-3-780193980d.jpg',
  ],
  manifoldDiagram: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/gushengcustomgassprings/products/flange-mounted-gas-spring-assembly/gallery-2-425e538f49-opt.webp',
} as const

export interface HeroSlide {
  id: string
  eyebrow: string
  headline: string
  supporting: string
  image: string
  imageAlt: string
  copySide: 'left' | 'right'
  theme: 'light_on_dark' | 'dark_on_light'
  objectPosition: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'banner-1',
    eyebrow: 'GUSHENG GAS SPRINGS · SINCE 2011',
    headline: 'Precision Nitrogen Gas Springs for Stamping Dies',
    supporting:
      'Standard GB, GH, GS & GU series from 170 to 18,400 daN — engineered for 1,000,000+ cycles with direct interchangeability across 10 global brands.',
    image: R2_ASSETS.banners[0],
    imageAlt: 'Three precision stainless steel nitrogen gas springs over a technical engineering blueprint',
    copySide: 'left',
    theme: 'light_on_dark',
    objectPosition: '75% 50%',
    primaryCta: { label: 'Explore Product Series', href: '/products' },
    secondaryCta: { label: 'Try 3D Cutaway Lab', href: '/#threejs-cutaway-lab' },
  },
  {
    id: 'banner-2',
    eyebrow: 'DIRECT FACTORY INVENTORY · 15-DAY LEAD TIME',
    headline: 'Direct Factory Inventory & 10-Brand Cross-Reference',
    supporting:
      'In-stock standard GB models, 15-day regular production lead time, and 30%–50% cost advantage compared to European & US Tier-1 suppliers.',
    image: R2_ASSETS.banners[1],
    imageAlt: 'High-density array of standard black-oxide and chrome-rod nitrogen gas springs in a bright engineering hall',
    copySide: 'right',
    theme: 'dark_on_light',
    objectPosition: '28% 50%',
    primaryCta: { label: 'Check Brand Cross-Reference', href: '/cross-reference' },
    secondaryCta: { label: 'View All Products', href: '/products' },
  },
  {
    id: 'banner-3',
    eyebrow: 'OEM / ODM ENGINEERING · PED EN 13445 VERIFIED',
    headline: 'Custom Non-Standard Springs & PED EN 13445 Verified',
    supporting:
      'Drawing-to-sample OEM/ODM engineering for extended strokes, threaded bodies, and special rods — backed by 2014/68/EU PED technical verification.',
    image: R2_ASSETS.banners[2],
    imageAlt: 'Seven custom non-standard nitrogen gas springs with protective rod sleeves on a clean inspection bench',
    copySide: 'left',
    theme: 'dark_on_light',
    objectPosition: '72% 50%',
    primaryCta: { label: 'Request Custom Quote', href: '/contact' },
    secondaryCta: { label: 'Inspect PED Certificates', href: '/quality' },
  },
]

export const CATEGORY_ENTRIES = [
  {
    slug: 'gb-series-gas-springs',
    shortTitle: 'GB Series Ultra-Compact',
    summary: '170–9,500 daN · 11 standard models · In-stock ready',
    forceRange: '170 – 9,500 daN',
    strokeRange: '7 – 125 mm',
    image: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/gushengcustomgassprings/products/gb-series-standard-nitrogen-gas-spring/cover-60405658b1-opt.webp',
  },
  {
    slug: 'gh-gs-gu-series-gas-springs',
    shortTitle: 'GH / GS / GU Industrial Series',
    summary: 'ISO Standard & Super High-Force up to 18,400 daN',
    forceRange: '250 – 18,400 daN',
    strokeRange: '6 – 300 mm',
    image: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/gushengcustomgassprings/products/gu-series-super-high-force-gas-spring/cover-3b867596c6-opt.webp',
  },
  {
    slug: 'custom-non-standard-gas-springs',
    shortTitle: 'Custom Non-Standard Springs',
    summary: 'Extended strokes, threaded bodies & custom rods by drawing',
    forceRange: 'Custom Calibrated',
    strokeRange: 'Extended / Custom',
    image: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/gushengcustomgassprings/products/custom-extended-stroke-gas-spring/cover-b4d63847a5-opt.webp',
  },
  {
    slug: 'cylinder-barrels-mounting-accessories',
    shortTitle: 'Cylinder Barrels & Flanges',
    summary: 'GB9500-100 barrels, FA/FB/FC mounts & manifold plates',
    forceRange: 'High-Pressure Alloy',
    strokeRange: 'FA / FB / FC Mounts',
    image: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/gushengcustomgassprings/products/flange-mounted-gas-spring-assembly/cover-374611eb6b-opt.webp',
  },
] as const

export const FACTORY_PHOTOS = [
  {
    slug: 'cnc-turning-bay',
    title: 'CNC Turning Center Bay',
    caption: 'Dual CNC turning centers machining high-pressure alloy steel cylinder housings to tight concentricity tolerances.',
    url: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/gushengcustomgassprings/factory/cnc-turning-bay-482cdc864b.png',
  },
  {
    slug: 'surface-grinder-m7140',
    title: 'DMTG M7140 Precision Surface Grinder',
    caption: 'Horizontal-spindle rectangular-table surface grinder delivering flat, parallel end-faces for zero-leak die seating.',
    url: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/gushengcustomgassprings/factory/surface-grinder-m7140-b1e798ebc8.png',
  },
  {
    slug: 'machining-workshop',
    title: 'Main Machining & Press Workshop',
    caption: '1,400 m² dedicated facility equipped with 20+ lathes, CNC centers, grinders, drills, presses, and raw alloy bar stock.',
    url: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/gushengcustomgassprings/factory/machining-workshop-af5afe0192.png',
  },
  {
    slug: 'component-staging',
    title: 'Semi-Finished Component Staging',
    caption: 'Batch-inspected precision-bored cylinder tubes and mirror-honed piston rods organized for clean-room assembly.',
    url: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/gushengcustomgassprings/factory/component-staging-40ba9e1ef7.png',
  },
  {
    slug: 'inventory-warehouse',
    title: 'Standard Inventory Warehouse',
    caption: 'High-density organized racking stocked with standard GB series bodies and sub-assemblies for rapid sample and order dispatch.',
    url: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/gushengcustomgassprings/factory/inventory-warehouse-c8ff583f40.png',
  },
  {
    slug: 'corporate-plaque',
    title: 'Changzhou Gusheng Hardware (YING TE LI HUA)',
    caption: 'Official corporate plaque at our Changzhou manufacturing headquarters — specializing in nitrogen gas springs since 2011.',
    url: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/gushengcustomgassprings/factory/corporate-plaque-8c9a430f67.png',
  },
] as const

export const CERTIFICATES = [
  {
    id: 'cert-ecm-ped',
    badge: 'PED 2014/68/EU · EN 13445',
    title: 'ECM Technical Documentation Verification',
    code: 'No. 4Q251212.CGHSN54',
    holder: 'Changzhou Gusheng Hardware Co., Ltd.',
    issuer: 'Ente Certificazione Macchine Srl (Italy)',
    scope: 'Nitrogen Spring — GB series, GH series, GS series and GU series verified to EN 13445-1:2021, EN 13445-2:2021+A1:2023, and EN 13445-3:2021/A1:2025 (Voluntary Technical Documentation Verification).',
    image: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/gushengcustomgassprings/certificates/ecm-ped-4q251212-c6011bddf0.png',
  },
  {
    id: 'cert-ped-report',
    badge: '31-PAGE TECHNICAL REPORT',
    title: 'PED 2014/68/EU Technical Test Report',
    code: 'File No. P-20251211021',
    holder: 'Changzhou Gusheng Hardware Co., Ltd.',
    issuer: 'Prepared by Changzhou Gusheng Hardware Co., Ltd. (Consultant: GRS Testing Technology Co., Ltd.)',
    scope: 'Complete 31-page Technical Construction File covering ISO-9001 internal QC procedures, EN 13445-2 pressure-bearing alloy steel materials, and EN 13445-3 shell design & fatigue life evaluation for GB/GH/GS/GU series.',
    image: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/gushengcustomgassprings/certificates/ped-report-2025-484c246525.png',
  },
  {
    id: 'cert-honor-2020',
    badge: 'ENTERPRISE HONOR',
    title: '2020 Integrity Management Advanced Enterprise',
    code: 'Credit Code: 91320404582271686K',
    holder: 'Changzhou Gusheng Hardware Co., Ltd.',
    issuer: 'Enterprise Credit Recognition Program (2020)',
    scope: 'Honorary credential recognizing Changzhou Gusheng Hardware Co., Ltd. for integrity-driven manufacturing operations and reliable contract fulfillment.',
    image: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/gushengcustomgassprings/certificates/honor-integrity-2020-c1b4f454c0.jpg',
  },
] as const

export interface SeriesModelRow {
  model: string
  initialDaN: string
  finalDaN: string
  rodA: string
  bodyB: string
  pressure: string
  strokes: string
  threadM: string
}

export const SERIES_TABLES: Record<'GB' | 'GH' | 'GS' | 'GU', SeriesModelRow[]> = {
  GB: [
    { model: 'GB170', initialDaN: '170', finalDaN: '270', rodA: '11', bodyB: '19', pressure: '18 MPa', strokes: '7–125 mm', threadM: '1-M6×5' },
    { model: 'GB320', initialDaN: '320', finalDaN: '500', rodA: '15', bodyB: '25', pressure: '18 MPa', strokes: '7–125 mm', threadM: '1-M6×5' },
    { model: 'GB350', initialDaN: '360', finalDaN: '680', rodA: '16', bodyB: '32', pressure: '18 MPa', strokes: '10–125 mm', threadM: '2-M6×6' },
    { model: 'GB500', initialDaN: '470', finalDaN: '720', rodA: '20', bodyB: '38', pressure: '15 MPa', strokes: '10–125 mm', threadM: '2-M6×6' },
    { model: 'GB750', initialDaN: '740', finalDaN: '1,200', rodA: '25', bodyB: '45', pressure: '15 MPa', strokes: '10–125 mm', threadM: '2-M8×6' },
    { model: 'GB1000', initialDaN: '920', finalDaN: '1,400', rodA: '28', bodyB: '50', pressure: '15 MPa', strokes: '13–125 mm', threadM: '2-M8×6' },
    { model: 'GB1500', initialDaN: '1,500', finalDaN: '2,400', rodA: '36', bodyB: '63', pressure: '15 MPa', strokes: '13–125 mm', threadM: '2-M8×6' },
    { model: 'GB2400', initialDaN: '2,400', finalDaN: '3,900', rodA: '45', bodyB: '75', pressure: '15 MPa', strokes: '16–125 mm', threadM: '4-M8×6' },
    { model: 'GB4200', initialDaN: '4,200', finalDaN: '7,200', rodA: '60', bodyB: '95', pressure: '15 MPa', strokes: '16–125 mm', threadM: '4-M8×10' },
    { model: 'GB6600', initialDaN: '6,600', finalDaN: '9,900', rodA: '75', bodyB: '120', pressure: '15 MPa', strokes: '16–125 mm', threadM: '4-M10×12' },
    { model: 'GB9500', initialDaN: '9,500', finalDaN: '14,500', rodA: '90', bodyB: '150', pressure: '15 MPa', strokes: '19–125 mm', threadM: '4-M10×13' },
  ],
  GH: [
    { model: 'GH300', initialDaN: '283', finalDaN: '350', rodA: '16', bodyB: '38', pressure: '15 MPa', strokes: '6.3–125 mm', threadM: '2-M6×6' },
    { model: 'GH500', initialDaN: '470', finalDaN: '550', rodA: '20', bodyB: '45', pressure: '15 MPa', strokes: '6.3–125 mm', threadM: '2-M8×6' },
    { model: 'GH750', initialDaN: '740', finalDaN: '1,200', rodA: '25', bodyB: '50', pressure: '15 MPa', strokes: '6.3–125 mm', threadM: '2-M8×6' },
    { model: 'GH1000', initialDaN: '1,000', finalDaN: '1,450', rodA: '30', bodyB: '63', pressure: '15 MPa', strokes: '25–125 mm', threadM: '2-M8×6' },
    { model: 'GH1500', initialDaN: '1,500', finalDaN: '2,200', rodA: '36', bodyB: '75', pressure: '15 MPa', strokes: '25–125 mm', threadM: '4-M8×6' },
    { model: 'GH3000', initialDaN: '3,000', finalDaN: '4,500', rodA: '50', bodyB: '95', pressure: '15 MPa', strokes: '25–125 mm', threadM: '4-M8×8' },
    { model: 'GH5000', initialDaN: '5,000', finalDaN: '7,800', rodA: '65', bodyB: '120', pressure: '15 MPa', strokes: '25–125 mm', threadM: '4-M10×10' },
    { model: 'GH7500', initialDaN: '7,500', finalDaN: '12,000', rodA: '80', bodyB: '150', pressure: '15 MPa', strokes: '25–125 mm', threadM: '4-M10×12' },
  ],
  GS: [
    { model: 'GS250', initialDaN: '250', finalDaN: '350', rodA: '16', bodyB: '38', pressure: '12.5 MPa', strokes: '10–125 mm', threadM: '2-M6×6' },
    { model: 'GS500', initialDaN: '470', finalDaN: '650', rodA: '20', bodyB: '45', pressure: '15 MPa', strokes: '10–160 mm', threadM: '2-M8×12' },
    { model: 'GS750', initialDaN: '740', finalDaN: '1,200', rodA: '25', bodyB: '50', pressure: '15 MPa', strokes: '12.7–300 mm', threadM: '2-M8×12' },
    { model: 'GS1500', initialDaN: '1,500', finalDaN: '2,300', rodA: '36', bodyB: '75', pressure: '15 MPa', strokes: '25–300 mm', threadM: '4-M8×13' },
    { model: 'GS3000', initialDaN: '3,000', finalDaN: '4,500', rodA: '50', bodyB: '95', pressure: '15 MPa', strokes: '25–300 mm', threadM: '4-M8×13' },
    { model: 'GS5000', initialDaN: '5,000', finalDaN: '7,800', rodA: '65', bodyB: '120', pressure: '15 MPa', strokes: '25–300 mm', threadM: '4-M10×16' },
    { model: 'GS7500', initialDaN: '7,500', finalDaN: '11,000', rodA: '80', bodyB: '150', pressure: '15 MPa', strokes: '25–300 mm', threadM: '4-M10×16' },
    { model: 'GS10000', initialDaN: '10,000', finalDaN: '15,000', rodA: '95', bodyB: '195', pressure: '15 MPa', strokes: '25–300 mm', threadM: '4-M12×16' },
  ],
  GU: [
    { model: 'GU420', initialDaN: '425', finalDaN: '760', rodA: '12', bodyB: '25', pressure: '15 MPa', strokes: '6–50 mm', threadM: '1-M6×5' },
    { model: 'GU740', initialDaN: '740', finalDaN: '1,200', rodA: '20', bodyB: '32', pressure: '15 MPa', strokes: '6–50 mm', threadM: '2-M6×5' },
    { model: 'GU1000', initialDaN: '1,000', finalDaN: '1,600', rodA: '20', bodyB: '38', pressure: '15 MPa', strokes: '6–50 mm', threadM: '2-M6×6' },
    { model: 'GU1800', initialDaN: '1,800', finalDaN: '2,900', rodA: '30', bodyB: '50', pressure: '15 MPa', strokes: '6–50 mm', threadM: '2-M6×6' },
    { model: 'GU2900', initialDaN: '2,900', finalDaN: '4,600', rodA: '45', bodyB: '63', pressure: '15 MPa', strokes: '10–50 mm', threadM: '4-M8×6' },
    { model: 'GU4700', initialDaN: '4,700', finalDaN: '6,800', rodA: '50', bodyB: '75', pressure: '15 MPa', strokes: '10–50 mm', threadM: '4-M8×9' },
    { model: 'GU7500', initialDaN: '7,500', finalDaN: '11,000', rodA: '55', bodyB: '95', pressure: '15 MPa', strokes: '10–50 mm', threadM: '4-M8×11' },
    { model: 'GU11800', initialDaN: '11,800', finalDaN: '17,000', rodA: '70', bodyB: '120', pressure: '15 MPa', strokes: '10–50 mm', threadM: '4-M10×11' },
    { model: 'GU18300', initialDaN: '18,400', finalDaN: '25,500', rodA: '90', bodyB: '150', pressure: '15 MPa', strokes: '10–50 mm', threadM: '4-M10×11' },
  ],
}

export interface CrossRefRow {
  gusheng: string
  series: 'GB' | 'GS' | 'GU' | 'GH' | 'GC'
  hyson: string
  kaller: string
  special: string
  pascal: string
  dadco: string
  quiri: string
  toss: string
  best: string
  metrol: string
  azolgas: string
}

export const CROSS_REFERENCE_ROWS: CrossRefRow[] = [
  { gusheng: 'GB170', series: 'GB', hyson: 'T3 170', kaller: 'X170', special: 'RV170', pascal: '--', dadco: 'U.0175', quiri: 'RGP170', toss: 'TSP170', best: 'JT170', metrol: 'EX170', azolgas: 'CW170' },
  { gusheng: 'GB320', series: 'GB', hyson: 'T3 320', kaller: 'X320', special: 'RV320', pascal: '--', dadco: 'U.0325', quiri: 'RGP320', toss: 'TSP320', best: 'JT320', metrol: 'EX320', azolgas: 'CW320' },
  { gusheng: 'GB350', series: 'GB', hyson: 'T3 350', kaller: 'X350', special: 'RV350', pascal: 'DNR350', dadco: 'U.0400', quiri: 'RGP350', toss: 'TSP350', best: 'JT350', metrol: 'EX350', azolgas: 'CW350' },
  { gusheng: 'GB500', series: 'GB', hyson: 'T3 500', kaller: 'X500', special: 'RV500', pascal: 'DNR500', dadco: 'U.0600', quiri: 'RGP500', toss: 'TSP500', best: 'JT500', metrol: 'EX500', azolgas: 'CW500' },
  { gusheng: 'GB750', series: 'GB', hyson: 'T3 750', kaller: 'X750', special: 'RV750', pascal: 'DNR750', dadco: 'U.0800', quiri: 'RGP750', toss: 'TSP750', best: 'JT750', metrol: 'EX750', azolgas: 'CW750' },
  { gusheng: 'GB1000', series: 'GB', hyson: 'T3 1000', kaller: 'X1000', special: 'RV1000', pascal: 'DNR1000', dadco: 'U.1000', quiri: 'RGP1000', toss: 'TSP1000', best: 'JT1000', metrol: 'EX1000', azolgas: 'CW1000' },
  { gusheng: 'GB1500', series: 'GB', hyson: 'T3 1500', kaller: 'X1500', special: 'RV1500', pascal: 'DNR1500', dadco: 'U.1600', quiri: 'RGP1500', toss: 'TSP1500', best: 'JT1500', metrol: 'EX1500', azolgas: 'CW1500' },
  { gusheng: 'GB2400', series: 'GB', hyson: 'T3 2400', kaller: 'X2400', special: 'RV2400', pascal: 'DNR2400', dadco: 'U.2600', quiri: 'RGP2400', toss: 'TSP2400', best: 'JT2400', metrol: 'EX2400', azolgas: 'CW2400' },
  { gusheng: 'GB4200', series: 'GB', hyson: 'T3 4200', kaller: 'X4200', special: 'RV4200', pascal: 'DNR4200', dadco: 'U.4600', quiri: 'RGP4200', toss: 'TSP4200', best: 'JT4200', metrol: 'EX4200', azolgas: 'CW4200' },
  { gusheng: 'GB6600', series: 'GB', hyson: 'T3 6600', kaller: 'X6600', special: 'RV6600', pascal: 'DNR6600', dadco: 'U.6600', quiri: 'RGP6600', toss: 'TSP6600', best: 'JT6600', metrol: 'EX6600', azolgas: 'CW6600' },
  { gusheng: 'GB9500', series: 'GB', hyson: 'T3 9500', kaller: 'X9500', special: 'RV9500', pascal: 'DNR9500', dadco: 'U.9600', quiri: 'RGP9500', toss: 'TSP9500', best: 'JT9500', metrol: 'EX9500', azolgas: 'CW9500' },
  { gusheng: 'GS250', series: 'GS', hyson: 'T2 250', kaller: 'TU250', special: 'SC250', pascal: 'DNA250', dadco: 'L.300', quiri: 'RG250', toss: '--', best: 'JC250', metrol: 'ISNG0250', azolgas: 'APF250' },
  { gusheng: 'GS500', series: 'GS', hyson: 'T2 500', kaller: 'TU500', special: 'SC500', pascal: 'DNA500', dadco: '90.10.0500', quiri: 'RG500', toss: 'TSL0500', best: 'JC500', metrol: 'ISNG0500', azolgas: 'APF500' },
  { gusheng: 'GS750', series: 'GS', hyson: 'T2 750', kaller: 'TU750', special: 'SC750', pascal: 'DNA750', dadco: '90.10.0750', quiri: 'RG750', toss: 'TSL0750', best: 'JC750', metrol: 'ISNG0750', azolgas: 'AG750XCF' },
  { gusheng: 'GS1500', series: 'GS', hyson: 'T2 1500', kaller: 'TU1500', special: 'SC1500', pascal: 'DNA1500', dadco: '90.10.1500', quiri: 'RG1500', toss: 'TSL1500', best: 'JC1500', metrol: 'ISNG1500', azolgas: 'AG1500XCF' },
  { gusheng: 'GS3000', series: 'GS', hyson: 'T2 3000', kaller: 'TU3000', special: 'SC3000', pascal: 'DNA3000', dadco: '90.10.3000', quiri: 'RG3000', toss: 'TSL3000', best: 'JC3000', metrol: 'ISNG3000', azolgas: 'AG3000XCF' },
  { gusheng: 'GS5000', series: 'GS', hyson: 'T2 5000', kaller: 'TU5000', special: 'SC5000', pascal: 'DNA5000', dadco: '90.10.5000', quiri: 'RG5000', toss: 'TSL5000', best: 'JC5000', metrol: 'ISNG5000', azolgas: 'AG5000XCF' },
  { gusheng: 'GS7500', series: 'GS', hyson: 'T2 7500', kaller: 'TU7500', special: 'SC7500', pascal: '--', dadco: '90.10.7500', quiri: 'RG7500', toss: 'TSL7500', best: 'JC7500', metrol: 'ISNG7500', azolgas: 'AG7500XCF' },
  { gusheng: 'GS10000', series: 'GS', hyson: 'T2 10000', kaller: 'TU10000', special: 'SC10000', pascal: '--', dadco: '90.10.10000', quiri: 'RG10000', toss: 'TSL10000', best: 'JC10000', metrol: 'ISNG10000', azolgas: 'AG10000XCF' },
  { gusheng: 'GU420', series: 'GU', hyson: 'T2SC420', kaller: 'CU420', special: 'ML300', pascal: 'DNP420', dadco: 'SC.0420', quiri: 'RGC420', toss: '--', best: '--', metrol: 'HDG0042', azolgas: 'CS420' },
  { gusheng: 'GU740', series: 'GU', hyson: 'T2SC740', kaller: 'CU740', special: 'ML500', pascal: 'DNP740', dadco: 'SC.0740', quiri: 'RGC740', toss: '--', best: '--', metrol: 'HDG007', azolgas: 'CS740' },
  { gusheng: 'GU1000', series: 'GU', hyson: 'T2SC1000', kaller: 'CU1000', special: 'ML1000', pascal: 'DNP1000', dadco: 'SC.01000', quiri: 'RGC1000', toss: '--', best: '--', metrol: 'HDG010', azolgas: 'CS1000' },
  { gusheng: 'GU1800', series: 'GU', hyson: 'T2SC1800', kaller: 'CU1800', special: 'ML1800', pascal: 'DNP1800', dadco: 'SC.1800', quiri: 'RGC1800', toss: '--', best: '--', metrol: 'HDG018', azolgas: 'CS1800' },
  { gusheng: 'GU2900', series: 'GU', hyson: 'T2SC2900', kaller: 'CU2900', special: 'ML3000', pascal: 'DNP2900', dadco: 'SC.2900', quiri: 'RGC2900', toss: '--', best: '--', metrol: 'HDG029', azolgas: 'CS2900' },
  { gusheng: 'GU4700', series: 'GU', hyson: 'T2SC4700', kaller: 'CU4700', special: 'ML4700', pascal: 'DNP4700', dadco: 'SC.4700', quiri: 'RGC4700', toss: '--', best: '--', metrol: 'HDG047', azolgas: 'CS4700' },
  { gusheng: 'GU7500', series: 'GU', hyson: 'T2SC7500', kaller: 'CU7500', special: 'ML7500', pascal: 'DNP7500', dadco: 'SC.7500', quiri: 'RGC7500', toss: '--', best: '--', metrol: 'HDG075', azolgas: 'CS7500' },
  { gusheng: 'GU11800', series: 'GU', hyson: 'T2SC11800', kaller: 'CU11800', special: 'ML12000', pascal: 'DNP11800', dadco: 'SC.11800', quiri: 'RGC11800', toss: '--', best: '--', metrol: 'HDG118', azolgas: 'CS11800' },
  { gusheng: 'GU18300', series: 'GU', hyson: 'T2SC18300', kaller: 'CU18300', special: '--', pascal: 'DNP18300', dadco: 'SC.18300', quiri: 'RGC18300', toss: '--', best: '--', metrol: 'HDG183', azolgas: 'CS18300' },
  { gusheng: 'GH300', series: 'GH', hyson: 'T2L-300', kaller: '--', special: '--', pascal: '--', dadco: 'L.0300', quiri: 'RGH250', toss: '--', best: '--', metrol: '--', azolgas: '--' },
  { gusheng: 'GH500', series: 'GH', hyson: 'T2L-500', kaller: 'K500', special: '--', pascal: '--', dadco: 'L.0500', quiri: 'RGH500', toss: '--', best: 'JK500', metrol: '--', azolgas: '--' },
  { gusheng: 'GH750', series: 'GH', hyson: 'T2L-750', kaller: 'K750', special: '--', pascal: '--', dadco: 'L.0750', quiri: 'RGH750', toss: '--', best: 'JK750', metrol: '--', azolgas: '--' },
  { gusheng: 'GH1500', series: 'GH', hyson: 'T2L-1500', kaller: 'K1500', special: '--', pascal: '--', dadco: '90.9.1500', quiri: 'RGH1500', toss: '--', best: 'JK1500', metrol: '--', azolgas: '--' },
  { gusheng: 'GH3000', series: 'GH', hyson: 'T2L-3000', kaller: '--', special: '--', pascal: '--', dadco: '90.9.3000', quiri: 'RGH3000', toss: '--', best: '--', metrol: '--', azolgas: '--' },
  { gusheng: 'GH5000', series: 'GH', hyson: '--', kaller: '--', special: '--', pascal: '--', dadco: '90.9.5000', quiri: 'RGH5000', toss: '--', best: '--', metrol: '--', azolgas: '--' },
  { gusheng: 'GH7500', series: 'GH', hyson: '--', kaller: '--', special: '--', pascal: '--', dadco: '90.9.7500', quiri: 'RGH7500', toss: '--', best: '--', metrol: '--', azolgas: '--' },
]

export const APPLICATIONS_CASES = [
  {
    id: 'automotive-stamping',
    tag: 'Automotive Body Panels',
    title: 'High-Tonnage Automotive Draw & Stamping Dies',
    summary: 'Stable initial blank-holder force (up to 18,400 daN) eliminates sheet-metal springback and wrinkling across deep-draw fenders, door panels, and structural reinforcements.',
    recommended: 'GB6600, GB9500, GU11800, GU18300',
    image: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/gushengcustomgassprings/products/gb9500-100-heavy-duty-gas-spring/gallery-1-f0c31406b3.jpg',
  },
  {
    id: 'progressive-dies',
    tag: 'High-Speed Stamping',
    title: 'Compact Progressive & Piercing Tooling',
    summary: 'Ultra-compact GB and GH profiles deliver high stripping force inside tight die pockets without coil-spring chatter, engineered for 1,000,000+ cycles at high press speeds.',
    recommended: 'GB170–GB1500, GH300–GH1500, Threaded-Body Custom',
    image: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/gushengcustomgassprings/products/gb-series-standard-nitrogen-gas-spring/gallery-1-536bcb5243.jpg',
  },
  {
    id: 'injection-molding',
    tag: 'Plastic & Precision Molds',
    title: 'Injection Mold Ejection & Core-Pull Systems',
    summary: 'Smooth, constant-force return across the working stroke prevents part deformation during demolding, with adjustable charging pressure for tailored ejection force.',
    recommended: 'GB350–GB2400, GS250–GS1500, Custom Non-Standard',
    image: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/gushengcustomgassprings/products/custom-threaded-body-gas-spring/gallery-1-3c527601ea.jpg',
  },
  {
    id: 'manifold-systems',
    tag: 'Linked Pressure Plates',
    title: 'Hose-Linked Manifold & Multi-Cylinder Die Plates',
    summary: 'Connect multiple GB, GH, or GS (-G) gas springs via Ø10.5 mm M6 charging ports to a single control manifold for synchronized pressure balance and centralized pressure monitoring.',
    recommended: 'GB/GH/GS -G Manifold-Linked Series + FA/FB/FC Flanges',
    image: R2_ASSETS.manifoldDiagram,
  },
] as const

export const OEM_STEPS = [
  {
    step: '01',
    title: 'Model Selection or Drawing Review',
    detail: 'Share your KALLER/DADCO/HYSON part number, force & stroke specs, or 2D/3D CAD drawing for rapid engineering match.',
  },
  {
    step: '02',
    title: 'Sample Dispatch or Custom Prototyping',
    detail: 'Standard GB models ship from warehouse stock; custom non-standard prototypes are machined to verify fit before mass production.',
  },
  {
    step: '03',
    title: 'In-House CNC Machining & Grinding',
    detail: 'Cylinder barrels and rods are turned, honed, and surface-ground across our 20+ machines under EN 13445 material controls.',
  },
  {
    step: '04',
    title: 'Pressure Testing & 15-Day Delivery',
    detail: 'Every unit undergoes pre-shipment pressure, stroke, and leak inspection with QC documentation and progress updates.',
  },
] as const

export const FAQ_ITEMS = [
  {
    id: 'faq-1',
    category: 'Products & Specs',
    question: 'What nitrogen gas spring series and models are available?',
    answer: 'We manufacture four complete standard series — GB Series (ultra-compact high-force, GB170–GB9500), GH Series (compact structure, GH300–GH7500), GS Series (ISO standard, GS250–GS10000), and GU Series (super high-force, GU420–GU18300) — plus custom non-standard springs, precision cylinder barrels, and FA/FB/FC mounting flanges.',
  },
  {
    id: 'faq-2',
    category: 'Products & Specs',
    question: 'Can Gusheng nitrogen gas springs directly replace KALLER, DADCO, or HYSON models?',
    answer: 'Yes. Our GB, GH, GS, and GU dimensions, force curves, and mounting interfaces are engineered for direct cross-reference interchangeability with 10 international brands including KALLER, DADCO, HYSON, PASCAL, AZOL.GAS, QUIRI, METROL, SPECIAL, TOSS, and BEST — typically at a 30%–50% cost advantage.',
  },
  {
    id: 'faq-3',
    category: 'OEM / ODM Customization',
    question: 'Do you support OEM/ODM and customized sizes, strokes, or materials?',
    answer: 'Yes. We specialize in non-standard custom nitrogen gas springs machined to customer drawings or samples, including extended strokes, external threaded bodies, special rod finishes, custom initial pressures, and dedicated mounting flanges.',
  },
  {
    id: 'faq-4',
    category: 'Samples & Pricing',
    question: 'Are samples available, and is the sample fee refundable?',
    answer: 'Standard GB models are held in stock for rapid sample dispatch, and custom prototypes are supported prior to bulk production. Sample fees are charged initially and are refundable upon formal bulk order placement.',
  },
  {
    id: 'faq-5',
    category: 'Samples & Pricing',
    question: 'Do you offer tiered bulk pricing and long-term cooperation discounts?',
    answer: 'Yes. We provide tiered volume quotes and long-term cooperation pricing. Standard quotes exclude packaging, freight, and taxes unless specified, and may adjust with raw alloy steel or exchange rate movements.',
  },
  {
    id: 'faq-6',
    category: 'Production & Delivery',
    question: 'What is your regular production lead time and peak-season stability?',
    answer: 'Regular production orders are delivered in approximately 15 days depending on quantity. Delivery schedules remain stable during peak seasons, with expedited production and real-time progress updates available.',
  },
  {
    id: 'faq-7',
    category: 'Quality & Inspection',
    question: 'Do you provide technical data sheets, QC inspection reports, and third-party inspection?',
    answer: 'Yes. Every order is backed by our internal ISO-9001 quality control process, pre-shipment pressure & dimensional inspection reports, and EN 13445 / PED 2014/68/EU technical documentation. Third-party pre-shipment inspection is also fully supported.',
  },
  {
    id: 'faq-8',
    category: 'Engineering & Safety',
    question: 'What are the key installation guidelines for maximum cycle life?',
    answer: 'Fix the gas spring rigidly using FA/FB/FC flanges or clamps to prevent side-loading, keep piston movement parallel to press travel, reserve at least 5 mm or 10% of nominal stroke as safety margin, avoid free uncontrolled return, and operate within 0–40°C ambient temperature.',
  },
] as const
