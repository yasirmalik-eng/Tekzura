import { ArrowRight, CalendarDays, Code2, TrendingUp, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero, SectionHeading } from '../components/site/PageElements';
import Seo from '../components/site/Seo';
import { siteConfig } from '../content/site';
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
        eyebrow="Services"
        title="Focused capabilities, assembled around your goal."
        description="Engage Tekzura for a defined project or combine complementary services into one coordinated delivery plan."
        visual="/service-web-development.jpg"
        visualAlt="Product engineering team reviewing a responsive website and application interface"
        theme="dark"
      >
        <a className="button button-primary" href={siteConfig.calendly} target="_blank" rel="noreferrer">
          <CalendarDays aria-hidden="true" /> Discuss Your Project
        </a>
      </PageHero>

      <CapabilityExplorer />

      <section className="section section-soft">
        <div className="container">
          <SectionHeading
            eyebrow="Choose the right starting point"
            title="Not sure which service fits?"
            description="Start with the business outcome. We will help identify the smallest useful engagement and the capabilities it needs."
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
    </>
  );
}
