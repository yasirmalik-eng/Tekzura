import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type InsightCaseStudy } from '../../content/insights';
import { services } from '../../content/site';

export function InsightCaseStudyCard({
  item,
  index,
}: {
  item: InsightCaseStudy;
  index: number;
}) {
  const service = services.find((entry) => entry.slug === item.service);
  const ServiceIcon = service?.icon;

  return (
    <Link to={`/blog/${item.slug}`} className="case-card case-card-link">
      <div className="case-visual" data-service={item.service}>
        {item.image && <img src={item.image} alt={item.imageAlt || ''} width="1200" height="800" loading="lazy" />}
        <div className="case-visual-shade" aria-hidden="true" />
        <div className="case-visual-topline">

          {ServiceIcon && (
            <span className="case-service-icon">
              <ServiceIcon aria-hidden="true" />
            </span>
          )}
        </div>
        <div className="case-visual-meta">
          <span>{item.industry}</span>
          <span>{service?.shortTitle}</span>
        </div>
      </div>
      <div className="case-content">
        <div className="article-meta case-card-meta">
          <time dateTime={item.date}>
            {new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(`${item.date}T00:00:00`))}
          </time>
          <span>{item.readTime} read</span>
          <span>{item.category}</span>
        </div>
        <div className="tag-row">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <h3>{item.title}</h3>
        <p className="case-summary">{item.excerpt}</p>
       
        <span className="case-card-cta">
          Read full case study <ArrowRight aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
