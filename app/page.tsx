import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Milestones } from '@/components/milestones'
import { Philosophy } from '@/components/philosophy'
import { Services } from '@/components/services'
import { Products } from '@/components/products'
import { News } from '@/components/news'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Milestones />
        <Philosophy />
        <Services />
        <Products />
        <News />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
