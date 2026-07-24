import { ChevronDown } from 'lucide-react'

const team = [
  {
    name: 'Budi Santoso',
    role: 'Chief Executive Officer',
    bio: 'Formerly lead engineer at global automotive electronics firms. 15+ years in materials science.',
    quote: '"Precision is the driver of impact."',
  },
  {
    name: 'Dr. Maya Lestari',
    role: 'Chief Technology Officer',
    bio: 'PhD in Chemical Engineering. Specialist in non-ferrous metal recovery and waste-to-resource systems.',
    quote: '"Sustainability is a technical requirement."',
  },
  {
    name: 'Hendrik Wijaya',
    role: 'Operations Director',
    bio: 'Operational strategist with deep roots in logistics and industrial facility management across Java.',
    quote: '"Safety and efficiency are inseparable."',
  },
]

export function LeadershipTeam() {
  return (
    <section className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-margin-desktop">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-[40px] font-bold leading-tight tracking-tight text-on-background">
              Strategic Leadership
            </h2>
            <p className="text-on-surface-variant">
              Engineering and environmental expertise at the core.
            </p>
          </div>
          <button className="flex cursor-pointer items-center gap-2 bg-primary px-8 py-4 text-sm font-bold tracking-widest text-on-primary transition-colors hover:bg-primary-container">
            <span>View Advisory Board</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {team.map((member) => (
            <div key={member.name} className="group">
              <div className="relative mb-6 h-96 overflow-hidden">
                <img
                  src="/placeholder-user.jpg"
                  alt={`Portrait of ${member.name}, ${member.role}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full translate-y-4 bg-gradient-to-t from-primary/80 to-transparent p-6 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-xs italic">{member.quote}</p>
                </div>
              </div>
              <h4 className="text-lg font-semibold text-on-background">{member.name}</h4>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-secondary">
                {member.role}
              </p>
              <p className="text-sm text-on-surface-variant">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
