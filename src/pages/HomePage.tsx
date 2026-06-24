import { ArrowRight, CalendarDays, CheckCircle2, MoveDown } from 'lucide-react';
import { siteConfig, team, testimonials } from '../content/site';
import { SectionHeading } from '../components/site/PageElements';
import Seo from '../components/site/Seo';
import { CapabilityExplorer } from '../components/site/InteractiveSections';
import { CommonQuestions, FounderSpotlight } from '../components/site/TeamSections';
import TestimonialsCarousel from '../components/site/TestimonialsCarousel';
import PortfolioStats from '../components/site/PortfolioStats';
import TrustSection from '../components/site/TrustSection';
import ProductStudioFramework from '../components/site/ProductStudioFramework';
import InvestorSection from '../components/site/InvestorSection';

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

            <h1>Your Trusted Partner for Development and Growth.</h1>
            <p className="lead">
              Tekzura transforms ideas into launch-ready assets with strategy, engineering, and marketing under one roof.
            </p>
            <div className="button-row">
              <a className="button button-primary" href={siteConfig.calendly} target="_blank" rel="noreferrer">
                <CalendarDays aria-hidden="true" /> Book a Growth Strategy Call
              </a>
              <a className="button button-secondary" href="#product-studio">
                See How We Scale Products <ArrowRight aria-hidden="true" />
              </a>
            </div>
            <ul className="hero-points" aria-label="Why teams choose Tekzura">
              <li><CheckCircle2 aria-hidden="true" /> Product strategy to launch</li>
              <li><CheckCircle2 aria-hidden="true" /> Conversion-focused execution</li>
              <li><CheckCircle2 aria-hidden="true" /> Growth support after release</li>
            </ul>
          </div>
          <div className="hero-signal-panel" aria-label="Tekzura product studio model">

            <strong>From idea to launch, traction, and scale.</strong>
            <div className="signal-flow">
              <span>Validate</span><i /><span>Build</span><i /><span>Launch</span><i /><span>Scale</span>
            </div>
            <div className="hero-team-strip">
              <img
                src={team[0].image}
                alt=""
                width={team[0].width}
                height={team[0].height}
                loading="eager"
              />
              <div><strong>Founder-led delivery</strong><span>Strategy stays connected to execution</span></div>
            </div>
          </div>
        </div>
        <a className="hero-scroll-cue" href="#capabilities"><MoveDown aria-hidden="true" /> Explore Capabilities</a>
      </section>
      <section className="trust-strip capability-rail" aria-label="Tekzura capabilities">
        <div className="container trust-grid">
          <div><strong>Development</strong><span>Full stack, WordPress & Shopify</span></div>
          <div><strong>Marketing</strong><span>SEO, ads, YouTube & automation</span></div>
          <div><strong>Design</strong><span>Brand, content & visual identity</span></div>
          <div><strong>Support</strong><span>Live chat, VA & helpdesk ops</span></div>
        </div>
      </section>

      <TrustSection />



      <PortfolioStats />

      <CapabilityExplorer variant="dashboard" />

      <ProductStudioFramework />

      <InvestorSection />


      <FounderSpotlight />
      <section className="section section-ink testimonial-section" id="testimonials">
        <div className="container testimonial-layout">
          <div className="testimonial-intro">
            <SectionHeading
              eyebrow=""
              title="Don't just take our words for it – Take theirs!"
              description="Feedback from founders, operators, and product leaders who wanted more than task-based delivery."
            />
          </div>
          <TestimonialsCarousel items={testimonials} />
        </div>
      </section>

      <CommonQuestions />

    </>
  );
}
