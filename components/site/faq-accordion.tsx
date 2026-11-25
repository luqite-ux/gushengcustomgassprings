'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQ_ITEMS } from '@/lib/catalog-data'

interface FaqAccordionProps {
  limit?: number
}

export function FaqAccordion({ limit }: FaqAccordionProps) {
  const items = limit ? FAQ_ITEMS.slice(0, limit) : FAQ_ITEMS
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <div className="divide-y divide-border overflow-hidden rounded-3xl border border-border bg-white shadow-xs">
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-mist/60"
            >
              <div>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-cobalt">
                  {item.category}
                </span>
                <h3 className="mt-1 text-base font-semibold text-ink">{item.question}</h3>
              </div>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-steel transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-cobalt' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-5 pt-0 text-sm leading-relaxed text-steel">
                {item.answer}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
