import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/config'

type SeoPage = 'home' | 'about' | 'services' | 'catalog' | 'news' | 'contact'
type SeoContent = { title: string; description: string; keywords: string[] }

const seoContent: Record<SeoPage, Record<Locale, SeoContent>> = {
  home: {
    id: {
      title: 'REGATRON | Solusi Pengelolaan & Daur Ulang E-Waste Terpercaya',
      description:
        'REGATRON menghadirkan solusi daur ulang, penjemputan, dan perdagangan e-waste secara menyeluruh di Indonesia. Bersama ciptakan lingkungan bersih dan aman.',
      keywords: [
        'pengelolaan e-waste',
        'daur ulang limbah elektronik',
        'penjemputan e-waste',
        'jual beli scrap elektronik',
        'REGATRON',
      ],
    },
    en: {
      title: 'REGATRON | Sustainable E-Waste Management & Recycling Solutions',
      description:
        'REGATRON provides end-to-end e-waste recycling, safe disposal, and scrap trading solutions in Indonesia. Turn electronic waste into a cleaner future today.',
      keywords: [
        'e-waste management',
        'e-waste recycling Indonesia',
        'electronic waste disposal',
        'scrap trading',
        'REGATRON',
      ],
    },
  },
  about: {
    id: {
      title: 'REGATRON | Tentang Kami - Perusahaan Pengelolaan E-Waste',
      description:
        'Berdiri sejak 2015, REGATRON adalah perusahaan pengelolaan limbah elektronik di Indonesia yang berdedikasi pada inovasi daur ulang yang bertanggung jawab dan aman.',
      keywords: [
        'tentang REGATRON',
        'profil perusahaan e-waste',
        'ekosistem daur ulang',
        'perusahaan limbah elektronik',
      ],
    },
    en: {
      title: 'REGATRON | About Us - Sustainable E-Waste Management',
      description:
        'Founded in 2015, REGATRON is an Indonesian e-waste management company dedicated to responsible recycling, eco-friendly innovation, and sustainability.',
      keywords: [
        'about REGATRON',
        'e-waste company profile',
        'sustainable recycling ecosystem',
        'e-waste handling Indonesia',
      ],
    },
  },
  services: {
    id: {
      title: 'REGATRON | Layanan E-Waste - Penjemputan, Daur Ulang & Trading',
      description:
        'Temukan layanan e-waste menyeluruh dari REGATRON, mulai dari penjemputan aman, pemilahan, daur ulang ramah lingkungan, hingga perdagangan scrap industri.',
      keywords: [
        'penjemputan e-waste',
        'pemilahan limbah elektronik',
        'daur ulang ramah lingkungan',
        'perdagangan e-waste',
      ],
    },
    en: {
      title: 'REGATRON | E-Waste Services - Collection, Recycling & Trading',
      description:
        "Explore REGATRON's end-to-end services, from safe e-waste collection and precise sorting to eco-friendly recycling and industrial scrap trading.",
      keywords: [
        'e-waste collection',
        'e-waste sorting',
        'eco-friendly recycling',
        'e-waste trading',
        'scrap supply',
      ],
    },
  },
  catalog: {
    id: {
      title: 'REGATRON | Katalog E-Waste & Scrap Elektronik',
      description:
        'Temukan katalog material e-waste REGATRON berdasarkan nama, kode, dan kategori untuk kebutuhan pemrosesan serta perdagangan scrap elektronik.',
      keywords: [
        'katalog e-waste',
        'scrap elektronik',
        'scrap PCB',
        'limbah komponen elektronik',
        'jual beli e-waste',
      ],
    },
    en: {
      title: 'REGATRON | E-Waste & Electronic Scrap Catalog',
      description:
        'Explore the REGATRON e-waste catalog by material name, item code, and category for responsible electronic scrap processing and trading.',
      keywords: [
        'e-waste catalog',
        'electronic scrap',
        'PCB scrap',
        'electronic component waste',
        'e-waste trading',
      ],
    },
  },
  news: {
    id: {
      title: 'REGATRON | Insight & Berita Pengelolaan E-Waste',
      description:
        'Baca kabar terbaru, panduan edukasi, dan perspektif industri seputar pengelolaan limbah elektronik dan standar daur ulang berkelanjutan di Indonesia.',
      keywords: [
        'berita e-waste',
        'regulasi limbah elektronik',
        'edukasi daur ulang',
        'update REGATRON',
      ],
    },
    en: {
      title: 'REGATRON | Insights & News on E-Waste Management',
      description:
        'Read the latest updates, educational guides, and industry perspectives on sustainable e-waste management and recycling standards in Indonesia.',
      keywords: [
        'e-waste news',
        'e-waste regulations Indonesia',
        'electronics recycling guides',
        'REGATRON updates',
      ],
    },
  },
  contact: {
    id: {
      title: 'REGATRON | Hubungi Kami - Penjemputan & Konsultasi E-Waste',
      description:
        'Siap mengelola e-waste Anda dengan aman? Hubungi REGATRON hari ini untuk mengatur jadwal penjemputan, pasokan material scrap, atau penjajakan kerja sama bisnis.',
      keywords: [
        'kontak REGATRON',
        'jemput e-waste',
        'konsultasi limbah elektronik',
        'jual scrap',
      ],
    },
    en: {
      title: 'REGATRON | Contact Us - E-Waste Pickup & Consultation',
      description:
        'Ready to manage your e-waste safely? Contact REGATRON today for pickup schedules, high-quality scrap material supply, or business partnership inquiries.',
      keywords: [
        'contact REGATRON',
        'e-waste pickup',
        'e-waste consultation',
        'sell electronic scrap',
      ],
    },
  },
}

const pagePaths: Record<SeoPage, string> = {
  home: '',
  about: '/about',
  services: '/services',
  catalog: '/catalog',
  news: '/news',
  contact: '/contact',
}

function localizedPath(locale: Locale, path: string) {
  if (locale === 'id' && path === '') return '/'
  return `/${locale}${path}`
}

export function createPageMetadata(page: SeoPage, locale: Locale): Metadata {
  const content = seoContent[page][locale]
  const path = pagePaths[page]
  const canonical = localizedPath(locale, path)
  const idUrl = localizedPath('id', path)
  const enUrl = localizedPath('en', path)

  return {
    ...content,
    alternates: {
      canonical,
      languages: { id: idUrl, en: enUrl, 'x-default': idUrl },
    },
    openGraph: {
      title: content.title,
      description: content.description,
      url: canonical,
      siteName: 'REGATRON',
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
    },
  }
}
