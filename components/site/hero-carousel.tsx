'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { HERO_SLIDES } from '@/lib/catalog-data'

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || paused) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 6500)
    return () => clearInterval(timer)
  }, [paused])

  const slide = HERO_SLIDES[activeIndex]
  const isDarkBg = slide.theme === 'light_on_dark'

  return (
    <section
      id="hero-carousel"
      aria-label="Featured Nitrogen Gas Springs"
      className="relative overflow-hidden border-b border-border bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Desktop: Full-bleed edge-to-edge composition with zero side white bars; Mobile 390px: clean image top + legible card below */}
      <div className="relative w-full">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-mist sm:aspect-[21/9] lg:h-[600px] lg:aspect-auto xl:h-[660px] 2xl:h-[720px]">
          {HERO_SLIDES.map((s, idx) => (
            <img
              key={s.id}
              src={s.image}
              alt={s.imageAlt}
              style={{ objectPosition: s.objectPosition }}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                idx === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            />
          ))}

          {/* Tight localized readability scrim ONLY behind the copy zone so product subjects remain 100% crisp */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 hidden lg:block ${
              isDarkBg
                ? 'bg-[linear-gradient(to_right,rgba(7,24,50,0.68)_0%,rgba(7,24,50,0.28)_30%,rgba(7,24,50,0)_48%)]'
                : slide.copySide === 'right'
                ? 'bg-[linear-gradient(to_left,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.32)_28%,rgba(255,255,255,0)_44%)]'
                : 'bg-[linear-gradient(to_right,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.32)_28%,rgba(255,255,255,0)_44%)]'
            }`}
          />

          {/* Desktop Overlay Copy */}
          <div className="relative z-10 mx-auto hidden h-full max-w-7xl items-center px-6 lg:flex lg:px-8">
            <div
              className={`max-w-xl ${
                slide.copySide === 'right' ? 'ml-auto text-left' : 'mr-auto text-left'
              }`}
            >
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] font-semibold tracking-wider uppercase ${
                  isDarkBg
                    ? 'border-white/30 bg-[#071832]/45 text-sky-200 backdrop-blur-xs'
                    : 'border-cobalt/25 bg-white/95 text-cobalt shadow-xs'
                }`}
              >
                {slide.eyebrow}
              </span>
              <h1
                className={`mt-4 text-4xl font-semibold tracking-tight text-balance xl:text-5xl xl:leading-[1.12] ${
                  isDarkBg ? 'text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]' : 'text-ink'
                }`}
              >
                {slide.headline}
              </h1>
              <p
                className={`mt-4 text-base leading-relaxed text-pretty ${
                  isDarkBg ? 'text-white/92' : 'text-slate-700'
                }`}
              >
                {slide.supporting}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href={slide.primaryCta.href}
                  className="press inline-flex items-center gap-2 rounded-full bg-cobalt px-6 py-3 text-sm font-semibold text-white shadow-md shadow-cobalt/25 hover:bg-electric"
                >
                  {slide.primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={slide.secondaryCta.href}
                  className={`press inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-colors ${
                    isDarkBg
                      ? 'border-white/40 bg-[#071832]/40 text-white backdrop-blur-xs hover:bg-white/20'
                      : 'border-slate-300 bg-white text-ink shadow-xs hover:border-cobalt/50 hover:text-cobalt'
                  }`}
                >
                  {slide.secondaryCta.label}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Stacked Copy Card (Zero text-over-subject collision on 390px) */}
        <div className="border-t border-border bg-white px-4 py-6 sm:px-6 lg:hidden">
          <span className="inline-flex items-center rounded-full border border-cobalt/20 bg-mist px-3 py-1 font-mono text-[11px] font-semibold tracking-wider text-cobalt uppercase">
            {slide.eyebrow}
          </span>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {slide.headline}
          </h1>
          <p className="mt-2.5 text-sm leading-relaxed text-steel">
            {slide.supporting}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <Link
              href={slide.primaryCta.href}
              className="inline-flex items-center gap-1.5 rounded-full bg-cobalt px-5 py-2.5 text-sm font-semibold text-white hover:bg-electric"
            >
              {slide.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={slide.secondaryCta.href}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-medium text-ink hover:border-cobalt/40"
            >
              {slide.secondaryCta.label}
            </Link>
          </div>
        </div>

        {/* Carousel Controls Bar */}
        <div className="border-t border-border/70 bg-white/95 px-4 py-3 sm:px-6 lg:absolute lg:bottom-5 lg:left-1/2 lg:z-20 lg:-translate-x-1/2 lg:rounded-full lg:border lg:px-4 lg:py-2 lg:shadow-lg lg:shadow-slate-900/10 lg:backdrop-blur-md">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2" role="tablist" aria-label="Hero slides">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeIndex}
                  aria-label={`View slide ${idx + 1}: ${s.headline}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === activeIndex ? 'w-8 bg-cobalt' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Previous slide"
                onClick={() => setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-ink hover:border-cobalt hover:text-cobalt"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
                onClick={() => setPaused((p) => !p)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-ink hover:border-cobalt hover:text-cobalt"
              >
                {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={() => setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-ink hover:border-cobalt hover:text-cobalt"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
