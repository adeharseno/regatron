import type { Dictionary } from '@/lib/i18n/dictionaries'

export function Hero({ dict }: { dict: Dictionary }) {
  const t = dict.home.hero

  return (
    <section className="relative flex h-screen min-h-[600px] overflow-hidden bg-navy">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-facility.png"
          alt="REGATRON industrial e-waste processing facility"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative z-10 flex w-full items-center bg-gradient-to-br from-navy via-[#002b6b] to-primary hero-slant md:w-[70%]">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-16 lg:px-16 xl:px-16 2xl:px-46">
          <div className="max-w-2xl space-y-8">
            <div className="h-1 w-20 bg-secondary-container" />
            <h1 className="text-[40px] font-black leading-tight tracking-tight text-white text-balance md:text-[42px]">
              {t.titleLine1} <br />
              <span className="text-secondary-container">{t.titleLine2}</span>
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-white/80">{t.description}</p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-white px-10 py-5 text-sm font-bold cursor-pointer tracking-widest text-primary transition-colors hover:bg-secondary-container">
                {t.ctaPrimary}
              </button>
              <button className="border border-white/30 px-10 py-5 text-sm font-bold cursor-pointer tracking-widest text-white transition-colors hover:bg-white/10">
                {t.ctaSecondary}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
