interface CtaBannerProps {
  heading: string
  description: string
  primaryLabel: string
  secondaryLabel: string
}

export function CtaBanner({ heading, description, primaryLabel, secondaryLabel }: CtaBannerProps) {
  return (
    <section className="section-slant-top relative bg-navy py-24 text-on-primary">
      <div className="mx-auto max-w-[1440px] px-6 text-center md:px-margin-desktop">
        <h2 className="mb-8 text-[40px] font-bold leading-tight tracking-tight text-balance md:text-5xl">
          {heading}
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-lg opacity-80">{description}</p>
        <div className="flex flex-col justify-center gap-6 sm:flex-row">
          <button className="cursor-pointer bg-secondary px-10 py-5 text-sm font-bold tracking-widest text-white transition-colors hover:opacity-90">
            {primaryLabel}
          </button>
          <button className="cursor-pointer border border-white/20 px-10 py-5 text-sm font-bold tracking-widest transition-colors hover:bg-white/10">
            {secondaryLabel}
          </button>
        </div>
      </div>
    </section>
  )
}
