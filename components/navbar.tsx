'use client'

import { useCallback, useEffect, useState } from 'react'
import { Sun } from 'lucide-react'

const links = [
  { label: 'About Us', href: '#about' },
  { label: 'Our Story', href: '#milestones' },
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'News', href: '#news' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [activeSection, setActiveSection] = useState('about')
  const [scrolled, setScrolled] = useState(false)

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      // scroll to top if no matching element
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    setActiveSection(id)
  }, [])

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
    // Active section detection
    const sectionIds = links.map((l) => l.href.replace('#', ''))
    const els = sectionIds
      .map((id) => document.getElementById(id))
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
  }, [])

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
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={
                activeSection === link.href.replace('#', '')
                  ? 'border-b-2 border-primary pb-1 text-sm font-bold tracking-wider text-primary transition-colors'
                  : 'text-sm font-medium tracking-wider text-secondary transition-colors hover:text-primary'
              }
            >
              {link.label}
            </a>
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
              const el = document.getElementById('contact')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="hidden cursor-pointer bg-primary px-5 py-3 text-xs font-bold uppercase tracking-wider text-on-primary transition-transform active:scale-95 md:block"
          >
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  )
}
