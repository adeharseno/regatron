import Image from 'next/image'
import Link from 'next/link'
import { stegaClean } from '@sanity/client/stega'
import { ArrowUpRight, Globe, Mail, Share2 } from 'lucide-react'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import type { SiteFooterContent, SiteLink } from '@/sanity/lib/types'
import { urlFor } from '@/sanity/lib/image'

function localizedHref(href: string, locale: Locale) {
  const cleanHref = stegaClean(href)
  if (!cleanHref.startsWith('/') || cleanHref.startsWith(`/${locale}`)) {
    return cleanHref
  }

  return `/${locale}${cleanHref === '/' ? '' : cleanHref}`
}

export function SiteFooter({
  dict,
  locale,
  content,
}: {
  dict: Dictionary
  locale: Locale
  content?: SiteFooterContent
}) {
  const fallbackNavigation: SiteLink[] = dict.footer.navigationLinks.map((label, index) => ({
    _key: `fallback-navigation-${index}`,
    label,
    href: ['/about', '/services', '/catalog', '/news'][index],
  }))
  const fallbackLegal: SiteLink[] = dict.footer.legalLinks.map((label, index) => ({
    _key: `fallback-legal-${index}`,
    label,
    href: ['/privacy-policy', '/terms-and-conditions', '#'][index],
  }))
  const fallbackSocial: SiteLink[] = dict.footer.socials.map((label, index) => ({
    _key: `fallback-social-${index}`,
    label,
    href: '#',
  }))

  const navigationLinks = (
    Array.isArray(content?.navigationLinks)
      ? content.navigationLinks
      : fallbackNavigation
  ).filter((item) => item.label && item.href)
  const legalLinks = (
    Array.isArray(content?.legalLinks) ? content.legalLinks : fallbackLegal
  ).filter((item) => item.label && item.href)
  const socialLinks = (
    Array.isArray(content?.socialLinks) ? content.socialLinks : fallbackSocial
  ).filter((item) => item.label && item.href)
  const columns = [
    {
      heading: content?.navigationHeading || dict.footer.navigationHeading,
      links: navigationLinks,
    },
    {
      heading: content?.legalHeading || dict.footer.legalHeading,
      links: legalLinks,
    },
  ]
  const socialIcons = [Globe, Share2, Mail]
  const footerLogoUrl = content?.logo
    ? urlFor(content.logo).width(450).height(160).fit('max').url()
    : null

  return (
    <footer className="border-t border-white/10 bg-navy pb-12 pt-24 text-white">
      <div className="mx-auto max-w-[1440px] px-6 md:px-margin-desktop">
        <div className="mb-24 grid grid-cols-1 gap-12 md:grid-cols-12 lg:gap-16">
          <div className="md:col-span-5 lg:col-span-4">
            {footerLogoUrl ? (
              <Image
                src={footerLogoUrl}
                alt={content?.logoAlt || content?.companyName || 'REGATRON'}
                width={450}
                height={160}
                className="mb-10 h-auto w-48 object-contain brightness-0 invert"
              />
            ) : (
              <span className="mb-10 block text-xl font-extrabold uppercase tracking-[0.2em] text-white">
                {content?.companyName || 'Regatron'}
              </span>
            )}
            <p className="mb-10 max-w-sm text-sm leading-relaxed text-white/60">
              {content?.description || dict.footer.description}
            </p>
            <div className="flex gap-3">
              {socialLinks.slice(0, 3).map((social, index) => {
                const Icon = socialIcons[index] || Share2
                const href = localizedHref(social.href || '#', locale)
                const isExternal = href.startsWith('https://')

                return (
                  <a
                    key={social._key}
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noreferrer' : undefined}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-outline/20 transition-all duration-300 hover:border-primary hover:bg-primary"
                    aria-label={social.label || 'Social link'}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="md:col-span-7 lg:col-span-8">
            <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
              {columns.map((column) => (
                <div key={column.heading}>
                  <h5 className="mb-8 border-l-2 border-primary pl-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                    {column.heading}
                  </h5>
                  <ul className="space-y-5 text-sm">
                    {column.links.map((link) => (
                      <li key={link._key}>
                        <Link
                          href={localizedHref(link.href || '#', locale)}
                          className="text-white/60 transition-colors duration-200 hover:text-primary"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="col-span-2 md:col-span-1">
                <h5 className="mb-8 border-l-2 border-primary pl-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                  {content?.socialHeading || dict.footer.socialHeading}
                </h5>
                <ul className="space-y-5 text-sm">
                  {socialLinks.map((social) => {
                    const href = localizedHref(social.href || '#', locale)
                    const isExternal = href.startsWith('https://')

                    return (
                      <li key={social._key}>
                        <a
                          href={href}
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noreferrer' : undefined}
                          className="flex items-center text-white/60 transition-colors duration-200 hover:text-primary"
                        >
                          {social.label}
                          <ArrowUpRight className="ml-2 h-3 w-3" />
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-outline/10 pt-10 md:flex-row">
          <p className="text-[10px] uppercase tracking-widest text-outline">
            {content?.copyright || dict.footer.copyright}
          </p>
          <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-outline">
            <span>{content?.tagline || dict.footer.tagline}</span>
            <span className="h-1 w-1 rounded-full bg-outline" />
            <span>{content?.location || dict.footer.location}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
