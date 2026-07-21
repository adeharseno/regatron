import { Leaf, ShieldCheck, Cpu, Handshake, Network } from 'lucide-react'

const values = [
  {
    n: '01',
    title: 'Sustainability',
    desc: 'Dedikasi mutlak terhadap pelestarian lingkungan melalui integrasi proses manufaktur sirkular yang bersih.',
    Icon: Leaf,
  },
  {
    n: '02',
    title: 'Responsibility',
    desc: 'Kepatuhan ketat terhadap regulasi limbah B3 internasional guna memastikan keamanan ekosistem global.',
    Icon: ShieldCheck,
  },
  {
    n: '03',
    title: 'Innovation',
    desc: 'Pengembangan teknologi ekstraksi mutakhir untuk optimalisasi pemulihan material berharga secara efisien.',
    Icon: Cpu,
  },
  {
    n: '04',
    title: 'Integrity',
    desc: 'Etika bisnis yang tak tergoyahkan dan transparansi rantai pasok sebagai landasan kepercayaan kemitraan.',
    Icon: Handshake,
  },
  {
    n: '05',
    title: 'Collaboration',
    desc: 'Sinergi lintas industri yang dinamis untuk mewujudkan visi ekonomi sirkular Indonesia yang inklusif.',
    Icon: Network,
  },
]

export function Philosophy() {
  return (
    <section className="industrial-pattern relative overflow-hidden bg-navy py-32">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-gradient-to-b from-navy-deep to-transparent opacity-50" />
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-margin-desktop">
        <div className="mb-24 flex flex-col items-start justify-between gap-12 lg:flex-row">
          <div className="relative">
            <span className="pointer-events-none absolute -left-6 -top-24 select-none text-[140px] font-black leading-none tracking-tighter text-white/[0.03]">
              VALUES
            </span>
            <span className="relative mb-6 block text-xs font-bold uppercase tracking-[0.4em] text-secondary-container">
              The Core of Regatron
            </span>
            <h2 className="relative text-5xl font-bold uppercase leading-none tracking-tighter text-white md:text-7xl">
              Our Philosophy
            </h2>
          </div>
          <div className="lg:pt-14">
            <p className="max-w-lg border-l-2 border-primary-container pl-10 text-lg leading-relaxed text-white/60">
              Prinsip fundamental yang menggerakkan setiap inovasi dan operasional kami dalam
              membangun ekosistem industri sirkular yang transparan dan berdampak.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 border border-white/10 bg-white/[0.02] backdrop-blur-xl md:grid-cols-2 lg:grid-cols-5">
          {values.map(({ n, title, desc, Icon }, i) => (
            <div
              key={title}
              className={`group relative flex h-full flex-col overflow-hidden p-12 transition-all duration-700 ease-out hover:bg-primary ${
                i < values.length - 1 ? 'border-b border-white/10 lg:border-b-0 lg:border-r' : ''
              }`}
            >
              <div className="pointer-events-none absolute -right-8 -top-8 text-9xl font-black text-white/[0.03] transition-colors group-hover:text-white/10">
                {n}
              </div>
              <div className="relative mb-14">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-container/20 transition-all duration-500 group-hover:bg-white/20">
                  <Icon className="h-8 w-8 text-secondary-container transition-colors group-hover:text-white" />
                </div>
              </div>
              <h3 className="relative z-10 mb-6 text-lg font-semibold uppercase tracking-widest text-white">
                {title}
              </h3>
              <p className="relative z-10 text-sm font-medium leading-relaxed text-white/50 transition-colors group-hover:text-white">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
