import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Locale } from '@/lib/i18n/config'

interface PaginationProps {
  currentPage: number
  totalPages: number
  locale: Locale
}

export function Pagination({ currentPage, totalPages, locale }: PaginationProps) {
  if (totalPages <= 1) return null

  const pageHref = (page: number) =>
    page === 1 ? `/${locale}/news` : `/${locale}/news?page=${page}`

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
  const labels =
    locale === 'id'
      ? { navigation: 'Navigasi halaman berita', previous: 'Halaman sebelumnya', next: 'Halaman berikutnya' }
      : { navigation: 'News page navigation', previous: 'Previous page', next: 'Next page' }

  return (
    <nav aria-label={labels.navigation} className="mt-16 flex items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link
          href={pageHref(currentPage - 1)}
          aria-label={labels.previous}
          className="flex size-11 items-center justify-center rounded-full border border-outline-variant text-on-surface transition-colors hover:border-primary hover:bg-primary hover:text-white"
        >
          <ChevronLeft className="size-4" />
        </Link>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={pageHref(page)}
          aria-current={page === currentPage ? 'page' : undefined}
          className={`flex size-11 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
            page === currentPage
              ? 'bg-primary text-white'
              : 'border border-outline-variant text-on-surface hover:border-primary hover:text-primary'
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={pageHref(currentPage + 1)}
          aria-label={labels.next}
          className="flex size-11 items-center justify-center rounded-full border border-outline-variant text-on-surface transition-colors hover:border-primary hover:bg-primary hover:text-white"
        >
          <ChevronRight className="size-4" />
        </Link>
      )}
    </nav>
  )
}
