'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Progressive-enhancement viewport reveal controller.
 * - Base CSS keeps all content visible when JS is unavailable or reduced-motion is enabled.
 * - Sets data-motion-ready on documentElement only after observer initialization succeeds.
 * - Never uses a global timeout to prematurely mark offscreen sections as revealed.
 */
export function MotionReady() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      document.documentElement.removeAttribute('data-motion-ready')
      return
    }

    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.setAttribute('data-revealed', 'true')
            observer.unobserve(el)
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    document.documentElement.setAttribute('data-motion-ready', 'true')

    for (const el of targets) {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.96 && rect.bottom > 0) {
        el.setAttribute('data-revealed', 'true')
      } else {
        observer.observe(el)
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [pathname])

  return null
}
