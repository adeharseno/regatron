const services = [
  {
    title: 'E-Waste Collection',
    desc: 'Certified logistics for waste collection from households, offices, and industrial zones.',
    img: '/images/service-collection.png',
    clip: 'service-clip-first',
    z: 'z-10',
  },
  {
    title: 'Sorting & Analysis',
    desc: 'Material separation using AI technology to identify precious metal content with high precision.',
    img: '/images/service-sorting.png',
    clip: 'service-clip',
    z: 'z-20',
  },
  {
    title: 'Eco-Refining',
    desc: 'Precious metal extraction using eco-friendly hydrometallurgical methods with minimal carbon emissions.',
    img: '/images/service-refining.png',
    clip: 'service-clip',
    z: 'z-30',
  },
  {
    title: 'Material Supply',
    desc: 'Distribution of extracted materials to global technology manufacturers to support the circular economy.',
    img: '/images/service-supply.png',
    clip: 'service-clip-last',
    z: 'z-40',
  },
]

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#e9e9e9] py-24">
      <div className="relative mx-auto mb-16 max-w-[1440px] px-6 md:px-margin-desktop">
        <h2 className="text-[40px] font-bold tracking-tighter">
          What Sets Us Apart
        </h2>
        <p className="mt-2 max-w-xl">
          End-to-end solutions for high-value electronic waste management with maximum
          material recovery efficiency.
        </p>
      </div>

      <div className="flex h-auto w-full flex-col overflow-hidden md:h-[650px] md:flex-row">
        {services.map((s, i) => (
          <div
            key={s.title}
            className={`group slanted-card relative min-h-[400px] flex-1 cursor-pointer overflow-hidden transition-all duration-700 ease-in-out hover:flex-[1.5] md:min-h-full md:-mr-20 ${s.clip} ${s.z} ${
              i === services.length - 1 ? 'md:mr-0' : ''
            }`}
          >
            <img
              src={s.img || '/placeholder.svg'}
              alt={s.title}
              className="absolute inset-0 h-full w-full scale-105 object-cover transition-all duration-700 group-hover:scale-110"
            />
            <div className="slanted-card-overlay pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-navy/55 transition-all duration-500" />
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-10 md:pl-20">
              <div className="mb-6 h-1 w-12 origin-left bg-white transition-transform group-hover:scale-x-150" />
              <h3 className="mb-4 text-lg font-semibold uppercase tracking-widest text-white md:text-xl">
                {s.title}
              </h3>
              <div className="max-h-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-40">
                <p className="max-w-xs text-sm leading-relaxed text-white/90">{s.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
