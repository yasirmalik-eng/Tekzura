import { ArrowRight, CalendarDays } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { CheckList, PageHero, SectionHeading } from '../components/site/PageElements';
import { ServiceDeliveryProcess } from '../components/site/InteractiveSections';
import Seo from '../components/site/Seo';
import { caseStudies, services, siteConfig } from '../content/site';
import NotFoundPage from './NotFoundPage';

export default function ServiceDetailPage() {
  const { serviceSlug } = useParams();
  const service = services.find((item) => item.slug === serviceSlug);
  if (!service) return <NotFoundPage />;

  const relatedWork = caseStudies.filter((item) => item.service === service.slug).slice(0, 1);
  const Icon = service.icon;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary,
    provider: { '@type': 'Organization', name: siteConfig.name },
  };

  return (
    <>
      <Seo title={service.title} description={service.summary} path={`/services/${service.slug}`} schema={schema} />
      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        description={service.summary}
        visual={service.image}
        visualAlt={service.imageAlt}
        theme="dark"
      >
        <div className="button-row">
          <a className="button button-primary" href={siteConfig.calendly} target="_blank" rel="noreferrer">
            <CalendarDays aria-hidden="true" /> Discuss This Service
          </a>
          <Link className="button button-secondary" to="/work">See Related Work <ArrowRight aria-hidden="true" /></Link>
        </div>
      </PageHero>

      <section className="section service-overview-section">
        <div className="container problem-grid">
          <div className="service-icon-large"><Icon aria-hidden="true" /></div>
          <article><p className="eyebrow">The challenge</p><h2>What this service helps solve</h2><p>{service.problem}</p></article>
          <article><p className="eyebrow">The outcome</p><h2>What we work toward</h2><p>{service.outcome}</p></article>
        </div>
      </section>

      <section className="section section-soft service-scope-section">
        <div className="container two-column">
          <div>
            <SectionHeading eyebrow="Typical scope" title="What we can deliver" description="The final scope is shaped around your priorities, current systems, and team." />
            <CheckList items={service.deliverables} />
          </div>
          <div className="technology-panel">
            <h2>Tools & Platforms</h2>
            <p>Technology choices follow the problem, existing stack, maintainability needs, and budget.</p>
            <div className="tag-row large">{service.technologies.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
        </div>
      </section>

      <ServiceDeliveryProcess service={service} />

      {relatedWork.length > 0 && (
        <section className="section section-ink">
          <div className="container related-work">
            <div><p className="eyebrow eyebrow-light">Related example</p><h2>{relatedWork[0].title}</h2><p>{relatedWork[0].challenge}</p></div>
            <div><h3>Our approach</h3><p>{relatedWork[0].solution}</p><h3>Intended outcome</h3><p>{relatedWork[0].outcome}</p></div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container faq-layout">
          <SectionHeading eyebrow="Common questions" title={`Planning a ${service.shortTitle.toLowerCase()} project`} />
          <div className="faq-list">
            {service.faq.map((item) => (
              <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
