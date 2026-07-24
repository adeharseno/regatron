'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

const anchorLinks = [
  { label: 'Our Story', id: 'milestones' },
  { label: 'Services', id: 'services' },
  { label: 'Products', id: 'products' },
  { label: 'News', id: 'news' },
  { label: 'Contact', id: 'contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'

  const [activeSection, setActiveSection] = useState('')
  const [scrolled, setScrolled] = useState(false)

  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      if (!isHome) {
        // Not on the homepage: let the link navigate to /#id normally
        return
      }
      e.preventDefault()
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      } else {
        router.push(`/#${id}`)
      }
      setActiveSection(id)
    },
    [isHome, router],
  )

  useEffect(() => {
    // Scroll-based shadow animation
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

    const els = anchorLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[]

    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Find all entries that are currently intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          // Sort by the element's top position so the highest one wins
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        // Adjust rootMargin so detection triggers at a sensible scroll position
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
        <div className="flex items-center w-56">
          <img
            src="/images/logo.png"
            alt="REGATRON industrial e-waste processing facility"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="hidden items-center gap-10 md:flex">
          <Link
            href="/about"
            className={
              pathname === '/about'
                ? 'border-b-2 border-primary pb-1 text-sm font-bold tracking-wider text-primary transition-colors'
                : 'text-sm font-medium tracking-wider text-secondary transition-colors hover:text-primary'
            }
          >
            About Us
          </Link>
          {anchorLinks.map((link) => (
            <Link
              key={link.label}
              href={isHome ? `#${link.id}` : `/#${link.id}`}
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
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center text-xs font-bold tracking-widest">
            <span className="cursor-pointer border-b border-primary font-bold text-primary">ID</span>
            <span className="mx-2 text-outline">|</span>
            <span className="cursor-pointer text-secondary transition-colors hover:text-primary">
              EN
            </span>
          </div>
          <button
            onClick={() => {
              if (!isHome) {
                router.push('/#contact')
                return
              }
              const el = document.getElementById('contact')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="hidden cursor-pointer bg-primary px-5 py-3 text-xs font-bold tracking-wider text-on-primary transition-transform active:scale-95 md:block"
          >
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  )
}
