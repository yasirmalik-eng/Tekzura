import { useId, useState, type ReactNode } from 'react';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services, type CaseStudy, type Service } from '../../content/site';

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  visual,
  visualAlt = '',
  theme = 'light',
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
  visual?: string;
  visualAlt?: string;
  theme?: 'light' | 'dark';
}) {
  return (
    <section className={`page-hero ${visual ? 'has-visual' : ''} page-hero-${theme}`}>
      <div className="container page-hero-layout">
        <div className="page-hero-inner">
          <p className={`eyebrow ${theme === 'dark' ? 'eyebrow-light' : ''}`}>{eyebrow}</p>
          <h1>{title}</h1>
          <p className="lead">{description}</p>
          {children}
        </div>
        {visual && <div className="page-hero-visual"><img src={visual} alt={visualAlt} width="1200" height="800" fetchPriority="high" /></div>}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={`section-heading ${align === 'center' ? 'center' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <article className="service-card reveal-card">
      <div className="icon-tile"><Icon aria-hidden="true" /></div>
      <p className="card-kicker">{service.eyebrow}</p>
      <h3>{service.title}</h3>
      <p>{service.summary}</p>
      <Link className="text-link" to={`/services/${service.slug}`}>
        Explore Service <ArrowRight aria-hidden="true" />
      </Link>
    </article>
  );
}

export function CaseStudyCard({
  item,
  featured = false,
  expandable = true,
  index,
}: {
  item: CaseStudy;
  featured?: boolean;
  expandable?: boolean;
  index?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const summaryId = useId();
  const service = services.find((entry) => entry.slug === item.service);
  const ServiceIcon = service?.icon;

  return (
    <article className={`case-card ${featured ? 'case-card-featured' : ''} ${expanded ? 'is-expanded' : ''}`}>
      <div className="case-visual" data-service={item.service}>
        {item.image && <img src={item.image} alt={item.imageAlt || ''} width="1200" height="800" loading="lazy" />}
        <div className="case-visual-shade" aria-hidden="true" />
        <div className="case-visual-topline">
          {typeof index === 'number' && <span className="case-index">{String(index + 1).padStart(2, '0')}</span>}
          {ServiceIcon && <span className="case-service-icon"><ServiceIcon aria-hidden="true" /></span>}
        </div>
        <div className="case-visual-meta">
          <span>{item.industry}</span>
          <span>{service?.shortTitle}</span>
        </div>
      </div>
      <div className="case-content">
        <div className="tag-row">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <h3>{item.title}</h3>
        <p className="case-summary">{item.challenge}</p>
        <div className="case-outcome">
          <span>Outcome</span>
          <p>{item.outcome}</p>
        </div>
        {expandable && (
          <>
            <button
              className="case-toggle"
              type="button"
              aria-expanded={expanded}
              aria-controls={summaryId}
              onClick={() => setExpanded((open) => !open)}
            >
              <span>{expanded ? 'Hide Project Summary' : 'View Project Summary'}</span>
              <span className="case-toggle-icon"><ChevronDown aria-hidden="true" /></span>
            </button>
            <div className="case-details" id={summaryId} hidden={!expanded}>
              <div><span>Challenge</span><p>{item.challenge}</p></div>
              <div><span>Approach</span><p>{item.solution}</p></div>
              <div><span>Outcome</span><p>{item.outcome}</p></div>
            </div>
          </>
        )}
      </div>
    </article>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => <li key={item}><Check aria-hidden="true" /> <span>{item}</span></li>)}
    </ul>
  );
}
