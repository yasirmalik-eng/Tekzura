import { ArrowLeft, ArrowRight, CalendarDays } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import ConversionCTA from '../components/site/ConversionCTA';
import Seo from '../components/site/Seo';
import { getInsightBySlug } from '../content/insights';
import { services, siteConfig } from '../content/site';

export default function CaseStudyDetailPage() {
  const { slug } = useParams();
  const study = slug ? getInsightBySlug(slug) : undefined;

  if (!study) {
    return <Navigate to="/blog" replace />;
  }

  const service = services.find((entry) => entry.slug === study.service);
  const formattedDate = new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(
    new Date(`${study.date}T00:00:00`),
  );

  return (
    <>
      <Seo
        title={study.title}
        description={study.excerpt}
        path={`/blog/${study.slug}`}
      />

      <section className={`article-hero ${study.image ? 'article-hero-cover' : ''}`}>
        {study.image && (
          <>
            <img
              className="article-hero-bg"
              src={study.image}
              alt=""
              aria-hidden="true"
              width="1200"
              height="800"
              fetchPriority="high"
            />
            <div className="article-hero-overlay" aria-hidden="true" />
          </>
        )}
        <div className="container article-hero-inner">
          <Link className="text-link article-back" to="/blog">
            <ArrowLeft aria-hidden="true" /> Back to Insights
          </Link>
          <header className="article-header">

            <h1>{study.title}</h1>
            <p className="lead">{study.excerpt}</p>
            <div className="article-meta article-meta-hero">
              <time dateTime={study.date}>{formattedDate}</time>
              <span>{study.readTime} read</span>
              <span>{study.industry}</span>
              {service && <span>{service.shortTitle}</span>}
            </div>
            <div className="tag-row large">{study.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </header>
        </div>
      </section>

      <section className="section case-study-body">
        <div className="container case-study-layout">
          <article className="case-study-article">
            <div className="case-study-summary-grid">
              <div>
                <span>Challenge</span>
                <p>{study.challenge}</p>
              </div>
              <div>
                <span>Approach</span>
                <p>{study.solution}</p>
              </div>
              <div>
                <span>Outcome</span>
                <p>{study.outcome}</p>
              </div>
            </div>

            {study.sections.map((section) => (
              <section key={section.heading} className="case-study-section">
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </article>

          <aside className="case-study-sidebar">
            <div className="case-study-sidebar-card">
              <span>Project highlights</span>
              <ul>
                {study.highlights.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="case-study-sidebar-card">
              <span>Interested in similar work?</span>
              <p>Talk with Tekzura about a project in {service?.shortTitle.toLowerCase() || 'this space'}.</p>
              <Link className="button button-primary" to="/get-started">
                Start a Project <ArrowRight aria-hidden="true" />
              </Link>
              <a className="button button-secondary" href={siteConfig.calendly} target="_blank" rel="noreferrer">
                <CalendarDays aria-hidden="true" /> Book a Call
              </a>
            </div>
          </aside>
        </div>
      </section>

      <ConversionCTA
        eyebrow="Apply the thinking"
        title="Ready to turn insight into execution?"
        description="If this case study sparked a product, automation, or growth idea, Tekzura can help validate it and build the next useful version."
        bullets={['Idea validation', 'Execution plan', 'Build support']}
      />
    </>
  );
}
