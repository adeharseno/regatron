import type { Dictionary } from '@/lib/i18n/dictionaries'

export function ServicesHero({ dict }: { dict: Dictionary }) {
  const t = dict.services.hero

  return (
    <section className="section-slant-bottom relative flex min-h-[500px] items-center overflow-hidden bg-navy">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/service-sorting.png"
          alt="REGATRON e-waste processing facility"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/70" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-32 md:px-margin-desktop">
        <div className="max-w-2xl space-y-6">
          <div className="h-1 w-16 bg-secondary-container" />
          <h1 className="text-[40px] font-black leading-tight tracking-tight text-white text-balance md:text-[42px]">
            {t.title}
          </h1>
          <p className="max-w-lg text-lg italic leading-relaxed text-white/80">
            &ldquo;{t.quote}&rdquo;
          </p>
        </div>
      </div>
    </section>
  )
}