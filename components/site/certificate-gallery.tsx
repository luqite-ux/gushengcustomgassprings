'use client'

import { useEffect, useState } from 'react'
import { ShieldCheck, X, ZoomIn } from 'lucide-react'
import { CERTIFICATES } from '@/lib/catalog-data'

export function CertificateGallery() {
  const [selected, setSelected] = useState<(typeof CERTIFICATES)[number] | null>(null)

  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [selected])

  return (
    <>
      <div className="grid gap-6 md:grid-cols-3">
        {CERTIFICATES.map((cert, idx) => (
          <article
            key={cert.id}
            data-reveal=""
            style={{ ['--reveal-delay' as string]: `${idx * 80}ms` }}
            className="lift flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-xs"
          >
            <button
              type="button"
              onClick={() => setSelected(cert)}
              className="group relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-mist p-4 focus-visible:outline-none"
              aria-label={`Inspect ${cert.title}`}
            >
              <img
                src={cert.image}
                alt={`${cert.title} — ${cert.code}`}
                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full border border-border bg-white/95 px-2.5 py-1 text-[11px] font-medium text-ink shadow-xs">
                <ZoomIn className="h-3.5 w-3.5 text-cobalt" />
                Inspect
              </span>
            </button>
            <div className="flex flex-1 flex-col p-6">
              <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-mist-2 px-2.5 py-1 font-mono text-[11px] font-semibold text-cobalt">
                <ShieldCheck className="h-3.5 w-3.5" />
                {cert.badge}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-ink">{cert.title}</h3>
              <p className="mt-1 font-mono text-xs font-medium text-cobalt">{cert.code}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-steel">{cert.scope}</p>
              <p className="mt-4 border-t border-border/70 pt-3 text-xs text-steel">
                <span className="font-medium text-ink">Holder:</span> {cert.holder}
              </p>
            </div>
          </article>
        ))}
      </div>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-3xl overflow-auto rounded-3xl bg-white p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border pb-3">
              <div>
                <h3 className="text-lg font-semibold text-ink">{selected.title}</h3>
                <p className="font-mono text-xs text-cobalt">{selected.code} · {selected.issuer}</p>
              </div>
              <button
                type="button"
                aria-label="Close certificate preview"
                onClick={() => setSelected(null)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-ink hover:bg-mist"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 flex justify-center rounded-2xl bg-mist p-4">
              <img
                src={selected.image}
                alt={selected.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
