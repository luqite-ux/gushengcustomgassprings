import type { Metadata } from 'next'
import { ProductsCatalog } from '@/components/site/products-catalog'
import { getCachedCategories, getCachedProducts, getCanonicalOrigin } from '@/lib/supabase'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Nitrogen Gas Spring Products | GB, GH, GS, GU & Custom Series',
  description:
    'Browse all 11 standard and custom nitrogen gas spring products from Changzhou Gusheng Hardware Co., Ltd. — GB, GH, GS, GU series, custom non-standard springs, barrels, and mounting flanges.',
  alternates: { canonical: `${getCanonicalOrigin()}/products` },
}

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([
    getCachedCategories('en'),
    getCachedProducts('en'),
  ])

  return <ProductsCatalog categories={categories} products={products} />
}
