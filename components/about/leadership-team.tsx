import { ChevronDown } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n/dictionaries'

export function LeadershipTeam({ dict }: { dict: Dictionary }) {
  const t = dict.about.leadership

  return (
    <section className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-margin-desktop">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-[40px] font-bold leading-tight tracking-tight text-on-background">
              {t.heading}
            </h2>
            <p className="text-on-surface-variant">{t.description}</p>
          </div>
          <button className="flex cursor-pointer items-center gap-2 bg-primary px-8 py-4 text-sm font-bold tracking-widest text-on-primary transition-colors hover:bg-primary-container">
            <span>{t.viewBoard}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {t.members.map((member) => (
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
