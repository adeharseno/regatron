import { ArrowRight } from 'lucide-react'

export function AboutHero() {
  return (
    <section className="section-slant-bottom relative flex min-h-[600px] items-center overflow-hidden bg-navy">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-facility.png"
          alt="REGATRON industrial e-waste processing facility"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/60" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-32 md:px-margin-desktop">
        <div className="max-w-2xl space-y-8">
          <div className="h-1 w-16 bg-secondary-container" />
          <h1 className="text-[40px] font-black leading-tight tracking-tight text-white text-balance md:text-[42px]">
            Pioneering Circularity in Indonesian Industry
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-white/80">
            Turning industrial e-waste into high-purity raw materials. We are Indonesia&apos;s
            strategic partner for sustainable material recovery and environmental stewardship.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="group flex cursor-pointer items-center gap-2 bg-white px-10 py-5 text-sm font-bold tracking-widest text-primary transition-colors hover:bg-secondary-container">
              <span>Our Capabilities</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="border border-white/30 px-10 py-5 text-sm font-bold cursor-pointer tracking-widest text-white transition-colors hover:bg-white/10">
              Sustainability Report
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
