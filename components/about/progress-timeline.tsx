const milestones = [
  {
    year: '2015',
    label: 'Foundation',
    desc: 'Established the first collection hub in Bekasi, focusing on corporate hardware retirement.',
    done: true,
  },
  {
    year: '2018',
    label: 'Refining Hub',
    desc: 'Opened the primary hydro-metallurgical facility for gold and silver extraction.',
    done: true,
  },
  {
    year: '2021',
    label: 'Digitalization',
    desc: 'Launched the REGATRACK client portal for real-time sustainability reporting.',
    done: true,
  },
  {
    year: '2024',
    label: 'Regional Scale',
    desc: 'Expansion to West Java industrial corridors with automated sorting systems.',
    done: true,
  },
  {
    year: '2025',
    label: 'Zero Waste 2.0',
    desc: 'Scheduled activation of the advanced rare-earth element recovery unit.',
    done: false,
  },
]

export function ProgressTimeline() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-margin-desktop">
        <div className="mb-16">
          <h2 className="text-[40px] font-bold leading-tight tracking-tight text-on-background">
            Decade of Progress
          </h2>
          <p className="text-outline">The evolution of REGATRON&apos;s infrastructure.</p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-0 top-0 h-[2px] w-full bg-outline-variant" />
          <div className="no-scrollbar flex gap-12 overflow-x-auto pb-4">
            {milestones.map((m) => (
              <div key={m.year} className="relative min-w-[280px] pt-12">
                <div
                  className={`absolute -top-[6px] left-0 h-3 w-3 rounded-full ${
                    m.done ? 'bg-secondary' : 'border-2 border-background bg-outline-variant'
                  }`}
                />
                <span
                  className={`mb-4 block text-2xl font-bold ${
                    m.done ? 'text-secondary' : 'text-outline'
                  }`}
                >
                  {m.year}
                </span>
                <h4
                  className={`mb-2 text-xs font-bold uppercase tracking-widest ${
                    m.done ? 'text-on-background' : 'text-outline'
                  }`}
                >
                  {m.label}
                </h4>
                <p
                  className={`text-sm leading-relaxed text-on-surface-variant ${
                    m.done ? '' : 'italic'
                  }`}
                >
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
