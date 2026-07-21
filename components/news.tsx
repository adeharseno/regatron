import { ArrowRight } from 'lucide-react'

const articles = [
  {
    img: '/images/news-1.png',
    tag: 'Industry Insights',
    date: 'OCT 24, 2024',
    title: 'Masa Depan Circular Economy di Indonesia',
    desc: 'Menganalisis bagaimana regulasi baru akan mempercepat adopsi teknologi daur ulang limbah elektronik di tingkat nasional...',
  },
  {
    img: '/images/news-2.png',
    tag: 'Sustainability',
    date: 'OCT 18, 2024',
    title: 'Laporan Dampak Lingkungan Semester 2',
    desc: 'Pencapaian target penurunan emisi karbon perusahaan sebesar 15% melalui optimalisasi logistik dan energi terbarukan...',
  },
  {
    img: '/images/news-3.png',
    tag: 'Technology',
    date: 'SEP 30, 2024',
    title: 'Integrasi AI dalam Pemurnian Logam',
    desc: 'Bagaimana algoritma machine learning membantu kami mendeteksi konsentrasi logam mulia secara real-time dengan akurasi 99%...',
  },
]

export function News() {
  return (
    <section id="news" className="bg-surface-bright py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-margin-desktop">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <h2 className="text-[32px] font-bold uppercase tracking-tight">News &amp; Articles</h2>
            <p className="text-secondary">
              Wawasan industri daur ulang dan update terbaru dari REGATRON.
            </p>
          </div>
          <a
            href="#"
            className="hidden border-b-2 border-primary pb-1 text-sm font-bold uppercase tracking-widest text-primary md:block"
          >
            Lihat Semua
          </a>
        </div>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {articles.map((a) => (
            <article key={a.title} className="group">
              <div className="mb-6 aspect-[4/5] overflow-hidden border border-outline-variant/30 bg-surface">
                <img
                  src={a.img || '/placeholder.svg'}
                  alt={a.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mb-4 flex items-center gap-4">
                <span className="bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                  {a.tag}
                </span>
                <span className="text-[10px] font-medium text-outline">{a.date}</span>
              </div>
              <h3 className="mb-4 cursor-pointer text-xl font-semibold transition-colors group-hover:text-primary">
                {a.title}
              </h3>
              <p className="mb-6 line-clamp-3 text-sm text-on-surface-variant">{a.desc}</p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
              >
                <span>Baca Selengkapnya</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
