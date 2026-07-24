import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { SiteFooter } from '@/components/layout/site-footer'
import { AboutHero } from '@/components/about/about-hero'
import { WhyRegatron } from '@/components/about/why-regatron'
import { CorePrinciples } from '@/components/about/core-principles'
import { ProgressTimeline } from '@/components/about/progress-timeline'
import { LeadershipTeam } from '@/components/about/leadership-team'
import { CtaBanner } from '@/components/shared/cta-banner'

export const metadata: Metadata = {
  title: 'About Us — REGATRON',
  description:
    "Pioneering circularity in Indonesian industry. Learn about REGATRON's mission, principles, milestones, and leadership team.",
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <WhyRegatron />
        <CorePrinciples />
        <ProgressTimeline />
        <LeadershipTeam />
        <CtaBanner
          heading="Ready to secure your supply chain?"
          description="Join hundreds of Indonesian enterprises in the transition to industrial circularity. Let's build a cleaner future together."
          primaryLabel="Start Consultation"
          secondaryLabel="Request Site Visit"
        />
      </main>
      <SiteFooter />
    </>
  )
}
