import { Factory, FlaskConical, Globe, Sparkles } from 'lucide-react'

const milestones = [
  {
    period: '2014 • Initiation',
    title: 'Circular Vision',
    desc: 'Establishment of the first processing facility with the highest national environmental license standards.',
    tag: 'Initial Plant',
    Icon: Factory,
  },
  {
    period: '2018 • Innovation',
    title: 'Clean Technology',
    desc: 'Implementation of a closed-loop chemical extraction system with zero hazardous emissions and zero liquid waste standards.',
    tag: 'Tech Pivot',
    Icon: FlaskConical,
  },
  {
    period: '2021 • Expansion',
    title: 'Global Supply',
    desc: 'Building strategic partnerships with global electronics manufacturers for closed-loop supply chains.',
    tag: 'Regional Lead',
    Icon: Globe,
  },
  {
    period: 'Current • 4.0',
    title: 'AI Precision',
    desc: 'AI integration in automated sorting for metal purity levels up to 99.9%.',
    tag: 'Industry 4.0',
    Icon: Sparkles,
  },
]

export function Milestones() {
  return (
    <section
      id="milestones"
      className="relative overflow-hidden border-y border-outline-variant bg-surface-bright py-24"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-margin-desktop">
        <div className="mb-20">
          <h2 className="mb-4 text-[40px] font-bold uppercase leading-tight tracking-tight text-on-background text-balance">
            Our Journey Milestones
          </h2>
          <p className="max-w-2xl leading-relaxed text-on-surface-variant">
            Strategic milestones in transforming electronic waste into high-value resources
            for the global industrial ecosystem.
          </p>
        </div>

        <div className="relative pt-12">
          <div className="absolute left-0 top-0 h-[2px] w-full bg-outline-variant/30" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {milestones.map(({ period, title, desc, tag, Icon }) => (
              <div key={title} className="group relative">
                <div className="absolute -top-[13px] left-0 z-10 h-6 w-6 rounded-full border-4 border-background bg-primary transition-transform group-hover:scale-125" />
                <div className="pt-10">
                  <span className="mb-2 block text-sm font-bold uppercase tracking-widest text-primary">
                    {period}
                  </span>
                  <h3 className="mb-3 text-lg font-semibold">{title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">{desc}</p>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-outline">
                    <Icon className="h-4 w-4" />
                    <span>{tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
