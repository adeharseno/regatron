import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, isValidLocale, locales } from '@/lib/i18n/config'

function detectLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && isValidLocale(cookieLocale)) return cookieLocale

  const acceptLanguage = request.headers.get('accept-language') ?? ''
  if (acceptLanguage.toLowerCase().startsWith('en')) return 'en'

  return defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
  if (hasLocale) return NextResponse.next()

  const locale = detectLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // Skip Sanity Studio, API routes, static files, and Next internals
  matcher: ['/((?!studio|api|_next|.*\\..*).*)'],
}
