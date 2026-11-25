import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, Newspaper } from 'lucide-react'
import { getCachedArticles, getCanonicalOrigin } from '@/lib/supabase'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'News & Technical Updates | Changzhou Gusheng Hardware',
  description:
    'Company announcements, technical updates, and engineering notes from Changzhou Gusheng Hardware Co., Ltd.',
  alternates: { canonical: `${getCanonicalOrigin()}/news` },
}

export default async function NewsPage() {
  const articles = await getCachedArticles('en')

  return (
    <div className="bg-white">
      <section className="blueprint-grid border-b border-border bg-mist/70 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
            NEWS
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            Company News &amp; Engineering Updates
          </h1>
          <p className="mt-4 max-w-3xl text-base text-steel">
            Published technical notes, production announcements, and stamping die engineering insights from Changzhou Gusheng Hardware Co., Ltd.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {articles.length === 0 ? (
            <div data-reveal="" className="mx-auto max-w-2xl rounded-3xl border border-border bg-mist/50 p-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-cobalt shadow-2xs">
                <Newspaper className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-ink">No News Articles Published Yet</h2>
              <p className="mt-2 text-sm leading-relaxed text-steel">
                Official announcements and technical articles published through our content portal will appear here automatically. In the meantime, explore our complete nitrogen gas spring catalog or 10-brand cross-reference table.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/products"
                  className="press inline-flex items-center gap-2 rounded-full bg-cobalt px-5 py-2.5 text-sm font-semibold text-white hover:bg-electric"
                >
                  Browse Products
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/cross-reference"
                  className="rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:border-cobalt hover:text-cobalt"
                >
                  10-Brand Cross-Reference
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, idx) => (
                <article
                  key={article.id}
                  data-reveal=""
                  style={{ ['--reveal-delay' as string]: `${(idx % 3) * 70}ms` }}
                  className="lift flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-xs"
                >
                  <Link href={`/news/${article.slug}`} className="block aspect-[16/10] w-full overflow-hidden bg-mist">
                    {article.featured_image ? (
                      <img
                        src={article.featured_image}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-mist text-steel">
                        <Newspaper className="h-8 w-8 opacity-40" />
                      </div>
                    )}
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    {article.published_at && (
                      <div className="flex items-center gap-1.5 font-mono text-xs text-steel">
                        <Calendar className="h-3.5 w-3.5 text-cobalt" />
                        <time dateTime={article.published_at}>
                          {new Date(article.published_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                    )}
                    <h2 className="mt-2.5 line-clamp-2 text-lg font-semibold text-ink">
                      <Link href={`/news/${article.slug}`} className="hover:text-cobalt">
                        {article.title}
                      </Link>
                    </h2>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-steel">
                      {article.excerpt || ''}
                    </p>
                    <Link
                      href={`/news/${article.slug}`}
                      className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-cobalt hover:underline"
                    >
                      Read Article
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
