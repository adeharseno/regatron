import type { Dictionary } from '@/lib/i18n/dictionaries'
import { urlFor } from '@/sanity/lib/image'
import type { AboutLeadershipContent } from '@/sanity/lib/types'

function initials(name: string) {
  return name
    .split(' ')
    .filter((w) => /[A-Za-z]/.test(w[0]))
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function LeadershipTeam({
  dict,
  content,
}: {
  dict: Dictionary
  content?: AboutLeadershipContent
}) {
  const t = dict.about.leadership
  const members: NonNullable<AboutLeadershipContent['members']> = content?.members?.length
    ? content.members
    : t.members.map((member, index) => ({
        _key: `fallback-member-${index}`,
        ...member,
      }))

  return (
    <section className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-margin-desktop">
        <div className="mb-16">
          <h2 className="text-[40px] font-bold leading-tight tracking-tight text-on-background">
            {content?.heading || t.heading}
          </h2>
          <p className="text-on-surface-variant">{content?.description || t.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-5">
          {members.map((member) => (
            <div
              key={member._key}
              className="flex flex-col items-center border border-outline-variant/30 bg-white p-8 text-center transition-colors hover:border-secondary"
            >
              {member.image ? (
                <img
                  src={urlFor(member.image).width(240).height(240).url()}
                  alt={member.imageAlt || member.name || ''}
                  className="mb-6 h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-lg font-bold text-on-primary">
                  {initials(member.name || '')}
                </div>
              )}
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
