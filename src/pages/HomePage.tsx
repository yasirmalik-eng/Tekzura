import { ArrowRight, CalendarDays, CheckCircle2, MoveDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { caseStudies, siteConfig, team, testimonials } from '../content/site';
import { CaseStudyCard, SectionHeading } from '../components/site/PageElements';
import Seo from '../components/site/Seo';
import { CapabilityExplorer, ProcessStory, Reveal, ServiceMatcher } from '../components/site/InteractiveSections';
import { CommonQuestions, FounderSpotlight } from '../components/site/TeamSections';

export default function HomePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: siteConfig.address,
    url: window.location.origin,
  };

  return (
    <>
      <Seo title="Tekzura" description={siteConfig.description} path="/" schema={schema} />
      <section className="home-hero immersive-hero">
        <img className="immersive-hero-image" src="/tech-studio-hero.jpg" alt="" width="1536" height="1024" fetchPriority="high" />
        <div className="immersive-overlay" aria-hidden="true" />
        <div className="container home-hero-grid">
          <div className="hero-copy">
            <p className="eyebrow eyebrow-light">Digital delivery for ambitious businesses</p>
            <h1>Build what moves your business forward.</h1>
            <p className="lead">
              Tekzura connects product design, engineering, automation, and growth into focused digital systems for SMBs and startups.
            </p>
            <div className="button-row">
              <a className="button button-primary" href={siteConfig.calendly} target="_blank" rel="noreferrer">
                <CalendarDays aria-hidden="true" /> Book a Strategy Call
              </a>
              <Link className="button button-secondary" to="/work">
                Explore Our Work <ArrowRight aria-hidden="true" />
              </Link>
            </div>
            <ul className="hero-points" aria-label="Engagement benefits">
              <li><CheckCircle2 aria-hidden="true" /> Strategy through delivery</li>
              <li><CheckCircle2 aria-hidden="true" /> Practical milestones</li>
              <li><CheckCircle2 aria-hidden="true" /> Global collaboration</li>
            </ul>
          </div>
          <div className="hero-signal-panel" aria-label="Tekzura delivery model">
            <span className="signal-live"><i /> Delivery system online</span>
            <strong>From business challenge to working digital system.</strong>
            <div className="signal-flow">
              <span>Discover</span><i /><span>Design</span><i /><span>Build</span><i /><span>Improve</span>
            </div>
            <div className="hero-team-strip">
              <img
                src={team[0].image}
                alt=""
                width={team[0].width}
                height={team[0].height}
                loading="eager"
              />
              <div><strong>Founder-led delivery</strong><span>Strategy connected directly to execution</span></div>
            </div>
          </div>
        </div>
        <a className="hero-scroll-cue" href="#capabilities"><MoveDown aria-hidden="true" /> Explore Capabilities</a>
      </section>

      <section className="trust-strip capability-rail" aria-label="Tekzura capabilities">
        <div className="container trust-grid">
          <div><strong>Product & Web</strong><span>Fast, scalable digital experiences</span></div>
          <div><strong>Automation & AI</strong><span>Connected operational workflows</span></div>
          <div><strong>Commerce</strong><span>Clearer journeys from interest to sale</span></div>
          <div><strong>Growth Systems</strong><span>Campaigns, leads, and useful reporting</span></div>
        </div>
      </section>

      <CapabilityExplorer variant="dashboard" />

      <ProcessStory />

      <section className="section work-showcase">
        <div className="container">
          <Reveal><SectionHeading
              eyebrow="Selected work"
              title="Digital systems designed around the operating challenge"
              description="Representative engagements showing how product thinking, technology, and business context come together."
            /></Reveal>
          <div className="case-grid case-grid-featured">
            {caseStudies.slice(0, 2).map((item, index) => <Reveal key={item.title} delay={index * 80}><CaseStudyCard item={item} expandable={false} /></Reveal>)}
          </div>
          <div className="section-action"><Link className="text-link" to="/work">See More Work <ArrowRight aria-hidden="true" /></Link></div>
        </div>
      </section>

      <section className="section section-ink">
        <div className="container testimonial-layout">
          <SectionHeading
            eyebrow="Client experience"
            title="A collaborative partner, not a black box"
            description="We keep communication direct and decisions visible throughout the engagement."
          />
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <blockquote key={item.quote}>
                <p>“{item.quote}”</p>
                <cite>{item.attribution}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
      <FounderSpotlight />
      <CommonQuestions />
      <ServiceMatcher />
    </>
  );
}
