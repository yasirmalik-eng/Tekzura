import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Clock3,
  Globe2,
  Layers,
  Rocket,
  ShieldCheck,
  Target,
  TrendingUp,
  UsersRound,
  Workflow,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ConversionCTA from '../components/site/ConversionCTA';
import { SectionHeading } from '../components/site/PageElements';
import Seo from '../components/site/Seo';
import { siteConfig, team } from '../content/site';
import { CommonQuestions, TeamShowcase } from '../components/site/TeamSections';

const companyStats = [
  { value: `10+`, label: 'Years of Experience' },
  { value: `230+`, label: 'Successful Projects' },
  { value: '160+', label: 'Trusted Clients' },
  { value: '6', label: 'countries served' },
];

const companyPillars = [
  {
    icon: Target,
    title: 'Start With The Business Case',
    text: 'Before Tekzura designs or builds, we clarify the offer, audience, revenue path, and decision your customer needs to make.',
  },
  {
    icon: Workflow,
    title: 'Keep Strategy Close To Execution',
    text: 'The same studio connects product planning, design, development, automation, and growth so the work does not get lost between vendors.',
  },
  {
    icon: Rocket,
    title: 'Build For Launch, Not Presentation',
    text: 'Tekzura focuses on usable flows, fast pages, clean handover, analytics, and growth actions clients can actually run after launch.',
  },
  {
    icon: ShieldCheck,
    title: 'Protect The Long-Term Product',
    text: 'We care about performance, maintainable code, accessible interfaces, documented decisions, and systems your team can keep improving.',
  },
];

const operatingModel = [
  'Clarify the business goal, target customer, and current bottleneck.',
  'Map the smallest useful product, website, automation, or growth system.',
  'Build in reviewable milestones with practical UX, clean engineering, and clear ownership.',
  'Launch with measurement in place, then improve based on user behavior and business signals.',
];

const whyChooseTekzura = [
  {
    icon: Award,
    title: 'Proven Track Record',
    text: 'Repeat clients, product upgrades, and long-term support across the US, UK, Canada, and beyond.',
  },
  {
    icon: TrendingUp,
    title: 'Product & Growth Mindset',
    text: 'Every build connects to revenue paths, user journeys, and metrics — not isolated feature lists.',
  },
  {
    icon: UsersRound,
    title: 'Cross-Functional Team',
    text: 'Engineers, marketers, designers, and operators aligned from discovery through launch.',
  },
  {
    icon: Globe2,
    title: 'Global Remote Delivery',
    text: 'Based in Bahawalpur, structured for remote clients with clear communication and documented decisions.',
  },
  {
    icon: Clock3,
    title: 'Milestone-Based Delivery',
    text: 'Reviewable phases and visible priorities — you always know what is done and what comes next.',
  },
  {
    icon: Layers,
    title: 'Partnership Beyond Launch',
    text: 'Handover, optimization, and the next growth phase when your product needs to keep improving.',
  },
];

const companyStandards = [
  'Founder-led communication',
  'Scope tied to business value',
  'Clean handover and documentation',
  'User journeys that convert',
  'Analytics before assumptions',
  'Support beyond launch',
];

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        description="Learn about Tekzura, a Bahawalpur-based product development and growth studio helping clients build digital products, automation workflows, and growth systems."
        path="/about"
      />
      <section className="about-hero" aria-labelledby="about-hero-title">
        <img className="about-hero-bg" src="/team-workshop.jpg" alt="" width="1200" height="800" fetchPriority="high" />
        <div className="about-hero-overlay" aria-hidden="true" />
        <div className="container about-hero-inner">

          <h1 id="about-hero-title">Tekzura builds the digital systems behind growing businesses.</h1>
          <p>
            From Bahawalpur to global clients, Tekzura brings product strategy, full-stack development, automation, AI workflows, and growth execution into one accountable studio.
          </p>
          <div className="button-row">
            <Link className="button button-primary" to="/get-started">
              Start a Project <ArrowRight aria-hidden="true" />
            </Link>
            <a className="button button-outline-light" href={siteConfig.calendly} target="_blank" rel="noreferrer">
              Book a Strategy Call
            </a>
          </div>
          <div className="about-hero-proof" aria-label="Tekzura company strengths">
            <span>Founder-Led Studio</span>
            <span>Product & Growth Delivery</span>
            <span>Remote-Ready Execution</span>
          </div>
        </div>
      </section>

      <section className="section about-company-section">
        <div className="container about-company-grid">
          <div className="about-company-copy">
            <p className="eyebrow">The Tekzura Story</p>
            
            <p>
              Many businesses come to us with a scattered digital setup: a slow website, disconnected tools, weak lead flow, manual operations, or a product idea that needs structure. Tekzura’s role is to turn that confusion into a practical roadmap and then build the system behind it.
            </p>
            <p>
              Tekzura is built as a product development and growth studio where strategy, engineering, automation, content, design, and marketing stay connected until the work is launched, measured, and ready to improve.
            </p>
          </div>

          <div className="about-company-card">
            <Building2 aria-hidden="true" />
            <span>What Tekzura Is</span>
            <h3>{siteConfig.tagline}</h3>
            <p>{siteConfig.description}</p>
            
            
          </div>
        </div>
      </section>

      <section className="section section-soft about-stats-section" aria-label="Tekzura company snapshot">
        <div className="container about-stats-grid">
          {companyStats.map((stat) => (
            <article key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section about-mission-section">
        <div className="container">
          <SectionHeading
            eyebrow=""
            title="Tekzura treats every project as part of the client’s growth system."
            description="A website should earn trust. A product should solve a real workflow. Automation should save time. Marketing should create qualified conversations. That is the standard we use when shaping work."
            align="center"
          />
          <div className="about-pillar-grid">
            {companyPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article key={pillar.title} className="about-pillar-card">
                  <span><Icon aria-hidden="true" /></span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <TeamShowcase
        variant="about"
        eyebrow=""
        title="The people behind Tekzura"
        description={`${team.length} specialists working together as one delivery team — from strategy and engineering to growth and operations.`}
      />
      <section className="section section-soft about-why-section">
        <div className="container">
          <SectionHeading
            eyebrow=""
            title="Why Choose Tekzura?"
            description=""
            align="center"
          />
          <div className="about-why-grid">
            {whyChooseTekzura.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="about-why-card">
                  <span className="about-why-icon"><Icon aria-hidden="true" /></span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <ConversionCTA
        eyebrow="Work with Tekzura"
        title="Bring Tekzura the business problem, not just a feature list."
        description="We will help clarify what should be built first, what can wait, and how the work should move toward launch, traction, and long-term improvement."
        bullets={['Founder-led discovery', 'Product and growth thinking', 'Clear delivery path']}
        tone="dark"
      />


    </>
  );
}
