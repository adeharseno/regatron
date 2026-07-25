'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { stegaClean } from '@sanity/client/stega'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import type { SiteHeaderContent } from '@/sanity/lib/types'
import { urlFor } from '@/sanity/lib/image'

function localizedHref(href: string, locale: Locale) {
  const cleanHref = stegaClean(href)
  if (!cleanHref.startsWith('/') || cleanHref.startsWith(`/${locale}`)) {
    return cleanHref
  }

  return `/${locale}${cleanHref === '/' ? '' : cleanHref}`
}

function isActiveHref(href: string, currentPath: string) {
  const cleanHref = stegaClean(href)
  if (!cleanHref.startsWith('/')) return false
  if (cleanHref === '/') return currentPath === '/'
  return currentPath === cleanHref || currentPath.startsWith(`${cleanHref}/`)
}

export function Navbar({
  dict,
  content,
}: {
  dict: Dictionary
  content?: SiteHeaderContent
}) {
  const pathname = usePathname()
  const router = useRouter()

  const segments = pathname.split('/')
  const locale = (segments[1] ?? 'id') as Locale
  const restOfPath = '/' + segments.slice(2).join('/')
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const fallbackNavigation = [
    { _key: 'fallback-about', label: dict.nav.aboutUs, href: '/about' },
    { _key: 'fallback-services', label: dict.nav.services, href: '/services' },
    { _key: 'fallback-catalog', label: dict.nav.catalog, href: '/catalog' },
    { _key: 'fallback-news', label: dict.nav.news, href: '/news' },
  ]
  const navigationItems = Array.isArray(content?.navigation)
    ? content.navigation
    : fallbackNavigation
  const navigation = navigationItems
    .filter((item) => item.label && item.href)
    .map((item) => ({
      ...item,
      href: localizedHref(item.href || '#', locale),
      active: isActiveHref(item.href || '#', restOfPath),
    }))
  const contactLabel = content?.contactLabel || dict.nav.contactCta
  const contactHref = localizedHref(content?.contactHref || '/contact', locale)
  const logoUrl = content?.logo
    ? urlFor(content.logo).width(450).height(120).fit('max').url()
    : '/images/logo.png'
  const logoAlt = content?.logoAlt || 'REGATRON'

  const switchLocale = useCallback(
    (target: Locale) => {
      document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000`
      setMobileMenuOpen(false)
      router.push(`/${target}${restOfPath}`)
    },
    [restOfPath, router],
  )

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!mobileMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [mobileMenuOpen])

  return (
    <nav
      className={
        'fixed inset-x-0 top-0 z-50 h-20 bg-white/85 transition-shadow duration-300' +
        (scrolled
          ? ' shadow-[0_8px_32px_rgba(0,0,0,0.08)]'
          : ' shadow-[0_2px_8px_rgba(0,0,0,0.02)]')
      }
      style={{
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
      }}
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-6 md:px-margin-desktop">
        <Link href={`/${locale}`} className="flex w-40 items-center md:w-56">
          <Image
            src={logoUrl}
            alt={logoAlt}
            width={450}
            height={120}
            priority
            className="h-auto w-full object-contain"
          />
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navigation.map((item) => (
            <Link
              key={item._key}
              href={item.href}
              className={
                item.active
                  ? 'border-b-2 border-primary pb-1 text-sm font-bold tracking-wider text-primary transition-colors'
                  : 'text-sm font-medium tracking-wider text-secondary transition-colors hover:text-primary'
              }
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <div className="flex items-center text-xs font-bold tracking-widest">
            <button
              onClick={() => switchLocale('id')}
              className={
                locale === 'id'
                  ? 'cursor-pointer border-b border-primary font-bold text-primary'
                  : 'cursor-pointer text-secondary transition-colors hover:text-primary'
              }
            >
              ID
            </button>
            <span className="mx-2 text-outline">|</span>
            <button
              onClick={() => switchLocale('en')}
              className={
                locale === 'en'
                  ? 'cursor-pointer border-b border-primary font-bold text-primary'
                  : 'cursor-pointer text-secondary transition-colors hover:text-primary'
              }
            >
              EN
            </button>
          </div>
          <Link
            href={contactHref}
            className="hidden cursor-pointer bg-primary px-5 py-3 text-xs font-bold tracking-wider text-on-primary transition-transform active:scale-95 md:block"
          >
            {contactLabel}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          aria-label={locale === 'id' ? 'Buka menu navigasi' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          className="flex h-11 w-11 cursor-pointer items-center justify-center text-navy transition-colors hover:text-primary md:hidden"
        >
          <Menu className="h-7 w-7" />
        </button>
      </div>

      <div
        className={
          'fixed inset-0 z-[60] bg-navy/45 transition-opacity duration-300 md:hidden ' +
          (mobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0')
        }
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="mobile-navigation"
        aria-hidden={!mobileMenuOpen}
        inert={!mobileMenuOpen}
        className={
          'fixed right-0 top-0 z-[70] flex h-dvh w-[min(88vw,420px)] flex-col bg-white shadow-[-20px_0_60px_rgba(0,25,68,0.16)] transition-transform duration-300 ease-out md:hidden ' +
          (mobileMenuOpen ? 'translate-x-0' : 'translate-x-full')
        }
      >
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-outline-variant/30 px-6">
          <Link
            href={`/${locale}`}
            onClick={() => setMobileMenuOpen(false)}
            className="flex w-40 items-center"
          >
            <Image
              src={logoUrl}
              alt={logoAlt}
              width={450}
              height={120}
              className="h-auto w-full object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label={locale === 'id' ? 'Tutup menu navigasi' : 'Close navigation menu'}
            className="flex h-11 w-11 cursor-pointer items-center justify-center text-navy transition-colors hover:text-primary"
          >
            <X className="h-7 w-7" />
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto px-6 py-8">
          <nav className="flex flex-col" aria-label="Mobile navigation">
            {navigation.map((item, index) => (
              <Link
                key={item._key}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={
                  'group flex items-center justify-between border-b border-outline-variant/35 py-5 transition-colors ' +
                  (item.active ? 'text-primary' : 'text-navy hover:text-primary')
                }
              >
                <span className="flex items-center gap-4">
                  <span className="text-[10px] font-bold tracking-[0.18em] text-outline">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-lg font-semibold">{item.label}</span>
                </span>
                <ArrowUpRight
                  className={
                    'h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ' +
                    (item.active ? 'text-primary' : 'text-outline')
                  }
                />
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-10">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-outline">
                {locale === 'id' ? 'Bahasa' : 'Language'}
              </span>
              <div className="flex items-center text-sm font-bold tracking-widest">
                <button
                  type="button"
                  onClick={() => switchLocale('id')}
                  className={
                    locale === 'id'
                      ? 'cursor-pointer border-b border-primary text-primary'
                      : 'cursor-pointer text-secondary transition-colors hover:text-primary'
                  }
                >
                  ID
                </button>
                <span className="mx-3 text-outline-variant">|</span>
                <button
                  type="button"
                  onClick={() => switchLocale('en')}
                  className={
                    locale === 'en'
                      ? 'cursor-pointer border-b border-primary text-primary'
                      : 'cursor-pointer text-secondary transition-colors hover:text-primary'
                  }
                >
                  EN
                </button>
              </div>
            </div>

            <Link
              href={contactHref}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between bg-primary px-6 py-5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-primary-container"
            >
              {contactLabel}
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </aside>
    </nav>
  )
}
