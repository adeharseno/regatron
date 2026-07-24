import { Eye, Factory, HeartHandshake, Users } from 'lucide-react'

export function CorePrinciples() {
  return (
    <section className="bg-surface-container py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-margin-desktop">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-[40px] font-bold leading-tight tracking-tight text-on-background">
            Core Principles
          </h2>
          <p className="text-lg text-on-surface-variant">
            Our roadmap towards a zero-waste industrial ecosystem in Southeast Asia.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          <div className="flex flex-col justify-between border border-outline-variant/30 bg-white p-12 transition-colors hover:border-secondary md:col-span-2">
            <div>
              <div className="mb-8 flex h-12 w-12 items-center justify-center bg-secondary/10 text-secondary">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="mb-6 text-2xl font-semibold text-on-background">Our Vision</h3>
              <p className="text-lg leading-relaxed text-on-surface-variant">
                To be the definitive cornerstone of Indonesia&apos;s circular economy, setting the
                standard for technical precision and ethical transparency in industrial waste
                management.
              </p>
            </div>
            <div className="mt-12 text-xs font-bold tracking-widest text-secondary">
              EST. 2015
            </div>
          </div>

          <div className="bg-primary p-10 text-on-primary">
            <Factory className="mb-6 h-9 w-9" />
            <h4 className="mb-4 text-lg font-semibold">Tech Integrity</h4>
            <p className="text-sm leading-relaxed opacity-80">
              Developing proprietary eco-refining technologies to maximize high-purity material
              extraction.
            </p>
          </div>

          <div className="border border-outline-variant/30 bg-white p-10">
            <HeartHandshake className="mb-6 h-9 w-9 text-secondary" />
            <h4 className="mb-4 text-lg font-semibold text-on-background">Eco-Responsibility</h4>
            <p className="text-sm leading-relaxed text-on-surface-variant">
              Protecting local ecosystems through zero-discharge processing and strict compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 overflow-hidden border border-outline-variant/30 bg-white md:col-span-2 md:grid-cols-2">
            <div className="flex flex-col justify-center p-10">
              <Users className="mb-6 h-9 w-9 text-secondary" />
              <h4 className="mb-4 text-lg font-semibold text-on-background">
                Strategic Partnership
              </h4>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Empowering industries to achieve their sustainability targets through data-driven
                reporting and logistics.
              </p>
            </div>
            <div className="relative h-64 md:h-auto">
              <img
                src="/images/service-collection.png"
                alt="Industrial professionals in safety gear"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
