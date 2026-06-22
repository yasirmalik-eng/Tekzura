import { ArrowRight, CalendarDays, Code2, TrendingUp, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import ConversionCTA from '../components/site/ConversionCTA';
import { PageHero, SectionHeading } from '../components/site/PageElements';
import Seo from '../components/site/Seo';
import { CapabilityExplorer, Reveal } from '../components/site/InteractiveSections';

export default function ServicesPage() {
  return (
    <>
      <Seo
        title="Services"
        description="Explore Tekzura web development, e-commerce, digital marketing, WordPress, automation, lead generation, and data operations services."
        path="/services"
      />
      <PageHero
        eyebrow=""
        title="Services built around launch, growth, and scale."
        description="Choose a focused service or combine product, engineering, automation, and growth into one delivery plan."
        visual=""
        visualAlt="Product engineering team reviewing a responsive website and application interface"
        theme="dark"
      >
        <Link className="button button-primary" to="/get-started">
          <CalendarDays aria-hidden="true" /> Plan My Project
        </Link>
      </PageHero>

      <CapabilityExplorer />

      <section className="section section-soft">
        <div className="container">
          <SectionHeading
            eyebrow=""
            title="Start with the outcome, then choose the capability."
            description="Whether you need to build, operate, or grow, Tekzura helps define the smallest useful engagement that moves the business forward."
            align="center"
          />
          <div className="service-paths">
            <Reveal>
              <article className="service-path-card">
                <div className="service-path-icon"><Code2 aria-hidden="true" /></div>
                <span>Build</span>
                <h3>Create a credible digital product</h3>
                <p>Launch or rebuild with web development, WordPress, and e-commerce expertise.</p>
                <Link className="service-path-link" to="/services/web-development" aria-label="Explore development services">
                  <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            </Reveal>
            <Reveal delay={80}>
              <article className="service-path-card">
                <div className="service-path-icon"><Workflow aria-hidden="true" /></div>
                <span>Operate</span>
                <h3>Reduce repetitive work</h3>
                <p>Connect tools and improve daily execution with automation, AI, and data operations.</p>
                <Link className="service-path-link" to="/services/automation-ai" aria-label="Explore automation services">
                  <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            </Reveal>
            <Reveal delay={160}>
              <article className="service-path-card">
                <div className="service-path-icon"><TrendingUp aria-hidden="true" /></div>
                <span>Grow</span>
                <h3>Build a stronger pipeline</h3>
                <p>Create focused demand with digital marketing and lead generation programs.</p>
                <Link className="service-path-link" to="/services/lead-generation" aria-label="Explore growth services">
                  <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <ConversionCTA
        eyebrow="Build with confidence"
        title="Know the goal but not the roadmap?"
        description="Share what you want to launch, fix, or grow. We will map the first useful step and the capabilities needed to get there."
        bullets={['Outcome-first scope', 'Clear launch path', 'Growth-ready roadmap']}
      />
    </>
  );
}
