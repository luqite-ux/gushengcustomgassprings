import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar } from 'lucide-react'
import { company } from '@/lib/site'
import { getCachedArticles, getCanonicalOrigin } from '@/lib/supabase'

export const revalidate = 300

export async function generateStaticParams() {
  const articles = await getCachedArticles('en')
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const articles = await getCachedArticles('en')
  const article = articles.find((a) => a.slug === slug)
  if (!article) return { title: 'Article Not Found' }
  const origin = getCanonicalOrigin()
  return {
    title: `${article.title} | ${company.brand}`,
    description: article.excerpt || article.title,
    alternates: { canonical: `${origin}/news/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt || article.title,
      images: article.featured_image ? [{ url: article.featured_image }] : undefined,
    },
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const articles = await getCachedArticles('en')
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()

  const origin = getCanonicalOrigin()
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt || article.title,
    image: article.featured_image || undefined,
    datePublished: article.published_at || article.updated_at || undefined,
    dateModified: article.updated_at || article.published_at || undefined,
    author: { '@type': 'Organization', name: company.legalName },
    publisher: { '@type': 'Organization', name: company.legalName, url: origin },
  }

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <div className="border-b border-border bg-mist/60 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/news" className="inline-flex items-center gap-1.5 text-xs font-semibold text-cobalt hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to News
          </Link>
          {article.published_at && (
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-steel">
              <Calendar className="h-3.5 w-3.5 text-cobalt" />
              {new Date(article.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          )}
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{article.title}</h1>
        {article.excerpt && (
          <p className="mt-4 text-lg leading-relaxed text-steel">{article.excerpt}</p>
        )}
        {article.featured_image && (
          <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-mist">
            <img src={article.featured_image} alt={article.title} className="aspect-[16/9] w-full object-cover" />
          </div>
        )}
        <div className="prose prose-slate mt-8 max-w-none text-base leading-relaxed text-ink whitespace-pre-line">
          {article.content}
        </div>
      </article>
    </div>
  )
}
