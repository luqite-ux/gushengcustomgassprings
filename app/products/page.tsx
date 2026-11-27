import type { Metadata } from 'next'
import { ProductsCatalog } from '@/components/site/products-catalog'
import { getCachedCategories, getCachedProducts, getCanonicalOrigin } from '@/lib/supabase'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Nitrogen Gas Spring Products | GB Series, Custom Springs & Cylinder Barrels',
  description:
    'Browse standard and custom nitrogen gas spring products from Changzhou Gusheng Hardware Co., Ltd. — GB series, custom non-standard springs, and GB9500-100 cylinder barrels.',
  alternates: { canonical: `${getCanonicalOrigin()}/products` },
}

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([
    getCachedCategories('en'),
    getCachedProducts('en'),
  ])

  return <ProductsCatalog categories={categories} products={products} />
}
