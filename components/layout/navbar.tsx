'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries'

const anchorIds = ['milestones', 'products', 'news'] as const

export function Navbar({ dict }: { dict: Dictionary }) {
  const pathname = usePathname()
  const router = useRouter()

  const segments = pathname.split('/')
  const locale = (segments[1] ?? 'id') as Locale
  const restOfPath = '/' + segments.slice(2).join('/')
  const isHome = restOfPath === '/'
  const isContactPage = restOfPath === '/contact'
  const isAboutPage = restOfPath === '/about'

  const isServicesPage = restOfPath === '/services'

  const anchorLinks = [
    { label: dict.nav.ourStory, id: 'milestones' },
    { label: dict.nav.products, id: 'products' },
    { label: dict.nav.news, id: 'news' },
  ]

  const [activeSection, setActiveSection] = useState('')
  const [scrolled, setScrolled] = useState(false)

  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      if (!isHome) {
        // Not on the homepage: let the link navigate to /{locale}#id normally
        return
      }
      e.preventDefault()
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      } else {
        router.push(`/${locale}#${id}`)
      }
      setActiveSection(id)
    },
    [isHome, locale, router],
  )

  const switchLocale = useCallback(
    (target: Locale) => {
      document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000`
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
    // Active section detection only makes sense on the homepage
    if (!isHome) return

    const els = anchorIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [isHome])

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
        <Link href={`/${locale}`} className="flex items-center w-56">
          <img
            src="/images/logo.png"
            alt="REGATRON industrial e-waste processing facility"
            className="h-full w-full object-cover"
          />
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          <Link
            href={`/${locale}/about`}
            className={
              isAboutPage
                ? 'border-b-2 border-primary pb-1 text-sm font-bold tracking-wider text-primary transition-colors'
                : 'text-sm font-medium tracking-wider text-secondary transition-colors hover:text-primary'
            }
          >
            {dict.nav.aboutUs}
          </Link>
          <Link
            href={`/${locale}/services`}
            className={
              isServicesPage
                ? 'border-b-2 border-primary pb-1 text-sm font-bold tracking-wider text-primary transition-colors'
                : 'text-sm font-medium tracking-wider text-secondary transition-colors hover:text-primary'
            }
          >
            {dict.nav.services}
          </Link>
          {anchorLinks.map((link) => (
            <Link
              key={link.id}
              href={isHome ? `#${link.id}` : `/${locale}#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className={
                isHome && activeSection === link.id
                  ? 'border-b-2 border-primary pb-1 text-sm font-bold tracking-wider text-primary transition-colors'
                  : 'text-sm font-medium tracking-wider text-secondary transition-colors hover:text-primary'
              }
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`/${locale}/contact`}
            className={
              isContactPage
                ? 'border-b-2 border-primary pb-1 text-sm font-bold tracking-wider text-primary transition-colors'
                : 'text-sm font-medium tracking-wider text-secondary transition-colors hover:text-primary'
            }
          >
            {dict.nav.contact}
          </Link>
        </div>

        <div className="flex items-center gap-6">
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
            href={`/${locale}/contact`}
            className="hidden cursor-pointer bg-primary px-5 py-3 text-xs font-bold tracking-wider text-on-primary transition-transform active:scale-95 md:block"
          >
            {dict.nav.contactCta}
          </Link>
        </div>
      </div>
    </nav>
  )
}