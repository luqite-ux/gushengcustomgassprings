'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Search } from 'lucide-react'
import { CROSS_REFERENCE_ROWS } from '@/lib/catalog-data'

interface CrossReferenceFinderProps {
  compact?: boolean
}

export function CrossReferenceFinder({ compact = false }: CrossReferenceFinderProps) {
  const [query, setQuery] = useState('')
  const [seriesFilter, setSeriesFilter] = useState<'ALL' | 'GB' | 'GS' | 'GU' | 'GH'>('ALL')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const rows = CROSS_REFERENCE_ROWS.filter((r) => {
      if (seriesFilter !== 'ALL' && r.series !== seriesFilter) return false
      if (!q) return true
      return Object.values(r).some((v) => String(v).toLowerCase().includes(q))
    })
    return compact && !q && seriesFilter === 'ALL' ? rows.slice(0, 10) : rows
  }, [query, seriesFilter, compact])

  return (
    <div className="rounded-3xl border border-border bg-white p-5 shadow-xs sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-steel" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search KALLER X1500, DADCO U.1600, HYSON T3, GB1500..."
            aria-label="Search international brand model cross-reference"
            className="w-full rounded-full border border-input bg-mist/60 py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-slate-400 focus:border-cobalt focus:bg-white focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {(['ALL', 'GB', 'GS', 'GU', 'GH'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSeriesFilter(s)}
              className={`rounded-full px-3.5 py-1.5 font-mono text-xs font-semibold transition-colors ${
                seriesFilter === s
                  ? 'bg-cobalt text-white'
                  : 'border border-border bg-white text-steel hover:border-cobalt/40 hover:text-cobalt'
              }`}
            >
              {s === 'ALL' ? 'All Series' : `${s} Series`}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[780px] text-left text-xs sm:text-sm">
          <thead className="border-b border-border bg-mist font-mono text-[11px] uppercase tracking-wider text-steel">
            <tr>
              <th className="px-3.5 py-3 font-semibold text-cobalt">GUSHENG</th>
              <th className="px-3 py-3">KALLER</th>
              <th className="px-3 py-3">DADCO</th>
              <th className="px-3 py-3">HYSON</th>
              <th className="px-3 py-3">PASCAL</th>
              <th className="px-3 py-3">AZOL.GAS</th>
              <th className="px-3 py-3">QUIRI</th>
              <th className="px-3 py-3">METROL</th>
              <th className="px-3 py-3">SPECIAL</th>
              <th className="px-3 py-3 text-right">Quote</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/70 font-mono text-xs">
            {filtered.map((row) => (
              <tr key={row.gusheng} className="transition-colors hover:bg-mist/60">
                <td className="px-3.5 py-2.5 font-semibold text-cobalt">{row.gusheng}</td>
                <td className="px-3 py-2.5 text-ink">{row.kaller}</td>
                <td className="px-3 py-2.5 text-ink">{row.dadco}</td>
                <td className="px-3 py-2.5 text-ink">{row.hyson}</td>
                <td className="px-3 py-2.5 text-steel">{row.pascal}</td>
                <td className="px-3 py-2.5 text-steel">{row.azolgas}</td>
                <td className="px-3 py-2.5 text-steel">{row.quiri}</td>
                <td className="px-3 py-2.5 text-steel">{row.metrol}</td>
                <td className="px-3 py-2.5 text-steel">{row.special}</td>
                <td className="px-3 py-2.5 text-right font-sans">
                  <Link
                    href={`/contact?model=${encodeURIComponent(row.gusheng)}`}
                    className="inline-flex items-center gap-0.5 font-medium text-cobalt hover:underline"
                  >
                    RFQ
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={10} className="px-4 py-8 text-center font-sans text-sm text-steel">
                  No direct table match for &ldquo;{query}&rdquo;. Send us your model number or drawing for custom engineering equivalence.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {compact && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-steel">
          <span>Showing {filtered.length} of {CROSS_REFERENCE_ROWS.length} cross-referenced models (also covers TOSS &amp; BEST).</span>
          <Link href="/cross-reference" className="inline-flex items-center gap-1 font-semibold text-cobalt hover:underline">
            Open Full 10-Brand Cross-Reference Matrix
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  )
}
