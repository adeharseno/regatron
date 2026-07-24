import type { Dictionary } from '@/lib/i18n/dictionaries'

function initials(name: string) {
  return name
    .split(' ')
    .filter((w) => /[A-Za-z]/.test(w[0]))
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function LeadershipTeam({ dict }: { dict: Dictionary }) {
  const t = dict.about.leadership

  return (
    <section className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-margin-desktop">
        <div className="mb-16">
          <h2 className="text-[40px] font-bold leading-tight tracking-tight text-on-background">
            {t.heading}
          </h2>
          <p className="text-on-surface-variant">{t.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-5">
          {t.members.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center border border-outline-variant/30 bg-white p-8 text-center transition-colors hover:border-secondary"
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-lg font-bold text-on-primary">
                {initials(member.name)}
              </div>
              <h4 className="mb-2 text-base font-semibold text-on-background">{member.name}</h4>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
