'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react'
import { company, navItems } from '@/lib/site'
import { R2_ASSETS, CATEGORY_ENTRIES } from '@/lib/catalog-data'

export function SiteHeader() {
  const pathname = usePathname()
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setProductsOpen(false)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false)
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setProductsOpen(false)
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', handleKey)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-white/92 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 focus-visible:outline-none"
          aria-label={`${company.brand} — Home`}
        >
          <img
            src={R2_ASSETS.logo}
            alt="GUSHENG GAS SPRINGS Logo"
            decoding="async"
            fetchPriority="high"
            className="h-11 w-auto max-w-[130px] object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            if (item.href === '/products') {
              return (
                <div key={item.href} ref={dropdownRef} className="relative">
                  <button
                    type="button"
                    aria-expanded={productsOpen}
                    aria-haspopup="menu"
                    onClick={() => setProductsOpen((prev) => !prev)}
                    className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                      active || productsOpen
                        ? 'bg-mist-2 text-cobalt'
                        : 'text-steel hover:bg-mist hover:text-ink'
                    }`}
                  >
                    Products
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        productsOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {productsOpen && (
                    <div
                      role="menu"
                      className="absolute left-0 top-full mt-2 w-80 rounded-2xl border border-border bg-white p-2 shadow-xl shadow-cobalt/10"
                    >
                      <Link
                        role="menuitem"
                        href="/products"
                        onClick={() => setProductsOpen(false)}
                        className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold text-cobalt hover:bg-mist"
                      >
                        All Nitrogen Gas Springs
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                      <div className="my-1.5 h-px bg-border/70" />
                      {CATEGORY_ENTRIES.map((cat) => (
                        <Link
                          key={cat.slug}
                          role="menuitem"
                          href={`/products?category=${cat.slug}`}
                          onClick={() => setProductsOpen(false)}
                          className="block rounded-xl px-3.5 py-2.5 transition-colors hover:bg-mist"
                        >
                          <div className="text-sm font-medium text-ink">{cat.shortTitle}</div>
                          <div className="mt-0.5 text-xs text-steel">{cat.summary}</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  active ? 'bg-mist-2 text-cobalt' : 'text-steel hover:bg-mist hover:text-ink'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            href="/contact"
            className="press hidden rounded-full bg-cobalt px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-electric sm:inline-flex"
          >
            Request Quote
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-ink hover:bg-mist lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-white px-4 pb-6 pt-3 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-xl px-3.5 py-2.5 text-sm font-medium ${
                    active ? 'bg-mist-2 text-cobalt' : 'text-ink hover:bg-mist'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            <div className="mt-3 border-t border-border pt-3">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-cobalt px-4 py-2.5 text-sm font-medium text-white"
              >
                Request Custom Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
