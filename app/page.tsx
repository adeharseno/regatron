import { Navbar } from '@/components/layout/navbar'
import { Hero } from '@/components/home/hero'
import { Milestones } from '@/components/home/milestones'
import { Services } from '@/components/home/services'
import { Products } from '@/components/home/products'
import { News } from '@/components/home/news-section'
import { Contact } from '@/components/home/contact'
import { SiteFooter } from '@/components/layout/site-footer'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Milestones />
        <Services />
        <Products />
        <News />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
