'use client'

import { useState } from 'react'

interface ProductGalleryProps {
  name: string
  images: string[]
}

export function ProductGallery({ name, images }: ProductGalleryProps) {
  const validImages = images.filter(Boolean)
  const [activeIdx, setActiveIdx] = useState(0)
  const current = validImages[activeIdx] || validImages[0] || ''

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-3xl border border-border bg-mist">
        <div className="aspect-[4/3] w-full overflow-hidden">
          {current ? (
            <img
              src={current}
              alt={`${name} — view ${activeIdx + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-steel">
              Product Image
            </div>
          )}
        </div>
      </div>

      {validImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-5">
          {validImages.map((img, idx) => (
            <button
              key={`${img}-${idx}`}
              type="button"
              onClick={() => setActiveIdx(idx)}
              aria-label={`View image ${idx + 1} of ${name}`}
              aria-pressed={idx === activeIdx}
              className={`aspect-[4/3] overflow-hidden rounded-xl border transition-all ${
                idx === activeIdx
                  ? 'border-cobalt ring-2 ring-cobalt/25'
                  : 'border-border opacity-75 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`${name} thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
