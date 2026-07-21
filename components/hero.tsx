export function Hero() {
  return (
    <section className="relative flex min-h-[600px] overflow-hidden bg-navy md:h-[750px]">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-facility.png"
          alt="Fasilitas pengolahan e-waste industri REGATRON"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative z-10 flex w-full items-center bg-gradient-to-br from-navy via-[#002b6b] to-primary hero-slant md:w-[70%]">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-margin-desktop">
          <div className="max-w-2xl space-y-8">
            <div className="h-1 w-20 bg-secondary-container" />
            <h1 className="text-[32px] font-black uppercase leading-tight tracking-tight text-white text-balance md:text-[42px]">
              Pionir Pengolahan <br />
              <span className="text-secondary-container">PCB Scrap</span> &amp; E-Waste <br />
              Berkelanjutan
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-white/80">
              Mendefinisikan ulang masa depan ekstraksi logam mulia melalui proses ramah lingkungan
              yang mengutamakan integritas dan inovasi industri 4.0.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-white px-10 py-5 text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:bg-secondary-container">
                Jelajahi Solusi
              </button>
              <button className="border border-white/30 px-10 py-5 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-white/10">
                Kemitraan Bisnis
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
