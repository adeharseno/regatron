import { Globe, Share2, Mail, ArrowUpRight } from 'lucide-react'

const columns = [
  {
    heading: 'Navigasi',
    links: ['Tentang Kami', 'Layanan & Solusi', 'Katalog Produk', 'Pusat Berita'],
  },
  {
    heading: 'Legalitas',
    links: ['Privacy Policy', 'Terms & Conditions', 'Sertifikasi ISO'],
  },
]

const socials = ['LinkedIn', 'Instagram', 'YouTube']

export function SiteFooter() {
  return (
    <footer className="border-t border-outline/10 bg-on-background pb-12 pt-24 text-white">
      <div className="mx-auto max-w-[1440px] px-6 md:px-margin-desktop">
        <div className="mb-24 grid grid-cols-1 gap-12 md:grid-cols-12 lg:gap-16">
          <div className="md:col-span-5 lg:col-span-4">
            <span className="mb-10 block text-xl font-extrabold uppercase tracking-[0.2em] text-white">
              Regatron
            </span>
            <p className="mb-10 max-w-sm text-sm leading-relaxed text-white/60">
              Solusi terpercaya untuk ekstraksi logam mulia dan pengelolaan e-waste dengan standar
              lingkungan tertinggi. Pionir industri sirkular elektronik Indonesia.
            </p>
            <div className="flex gap-3">
              {[Globe, Share2, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-outline/20 transition-all duration-300 hover:border-primary hover:bg-primary"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 lg:col-span-8">
            <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
              {columns.map((col) => (
                <div key={col.heading}>
                  <h5 className="mb-8 border-l-2 border-primary pl-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                    {col.heading}
                  </h5>
                  <ul className="space-y-5 text-sm">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-white/60 transition-colors duration-200 hover:text-primary"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="col-span-2 md:col-span-1">
                <h5 className="mb-8 border-l-2 border-primary pl-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                  Media Sosial
                </h5>
                <ul className="space-y-5 text-sm">
                  {socials.map((s) => (
                    <li key={s}>
                      <a
                        href="#"
                        className="flex items-center text-white/60 transition-colors duration-200 hover:text-primary"
                      >
                        {s}
                        <ArrowUpRight className="ml-2 h-3 w-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-outline/10 pt-10 md:flex-row">
          <p className="text-[10px] uppercase tracking-widest text-outline">
            © 2024 PT. Regar Karya Utama. Seluruh Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-outline">
            <span>Precision Enterprise</span>
            <span className="h-1 w-1 rounded-full bg-outline" />
            <span>Bekasi, Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
