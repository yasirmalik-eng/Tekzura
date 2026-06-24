import { ArrowRight, CalendarDays, Code2, TrendingUp, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import ConversionCTA from '../components/site/ConversionCTA';
import PackageBuilderButton from '../components/site/PackageBuilderButton';
import { PageHero, SectionHeading } from '../components/site/PageElements';
import Seo from '../components/site/Seo';
import { CapabilityExplorer, Reveal } from '../components/site/InteractiveSections';

export default function ServicesPage() {
  return (
    <>
      <Seo
        title="Services"
        description="Full stack development, WordPress, Shopify, digital marketing, YouTube automation, marketing automation, graphic design, and customer support."
        path="/services"
      />
      <PageHero
        eyebrow=""
        title="Services built around development, growth, and support."
        description="Choose a focused service or combine development, marketing, design, and support into one delivery plan."
        visual=""
        visualAlt="Product engineering team reviewing a responsive website and application interface"
        theme="dark"
      >
        <Link className="button button-primary" to="/get-started">
          <CalendarDays aria-hidden="true" /> Plan My Project
        </Link>
        <PackageBuilderButton label="Build custom package" variant="secondary" />
      </PageHero>

      <CapabilityExplorer />

      <section className="section section-soft package-builder-band">
        <div className="container package-builder-band-inner">
          <div>
            <p className="eyebrow">Custom packages</p>
            <h2>Mix and match services for one tailored quote.</h2>
            <p>Pick what you need, see an instant estimate, and send your request in minutes.</p>
          </div>
          <PackageBuilderButton label="Open package builder" variant="primary" />
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading
            eyebrow=""
            title="Start with the outcome, then choose the service."
            description="Whether you need to build, market, or support, Tekzura helps define the smallest useful engagement that moves the business forward."
            align="center"
          />
          <div className="service-paths">
            <Reveal>
              <article className="service-path-card">
                <div className="service-path-icon"><Code2 aria-hidden="true" /></div>
                <span>Development</span>
                <h3>Build apps, sites, and stores</h3>
                <p>Full stack development, WordPress, and Shopify expertise for credible digital products.</p>
                <Link className="service-path-link" to="/services/full-stack-dev" aria-label="Explore development services">
                  <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            </Reveal>
            <Reveal delay={80}>
              <article className="service-path-card">
                <div className="service-path-icon"><Workflow aria-hidden="true" /></div>
                <span>Marketing</span>
                <h3>Grow visibility and leads</h3>
                <p>Digital marketing, YouTube automation, and funnel systems that compound over time.</p>
                <Link className="service-path-link" to="/services/digital-marketing" aria-label="Explore marketing services">
                  <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            </Reveal>
            <Reveal delay={160}>
              <article className="service-path-card">
                <div className="service-path-icon"><TrendingUp aria-hidden="true" /></div>
                <span>Design & Support</span>
                <h3>Look professional and stay responsive</h3>
                <p>Brand design, content assets, and customer support that protect trust and retention.</p>
                <Link className="service-path-link" to="/services/graphic-design" aria-label="Explore design and support services">
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
