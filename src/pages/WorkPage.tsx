import { useMemo } from 'react';
import { BriefcaseBusiness, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { CaseStudyCard, PageHero } from '../components/site/PageElements';
import Seo from '../components/site/Seo';
import { caseStudies } from '../content/site';

export default function WorkPage() {
  const industries = ['All', ...new Set(caseStudies.map((item) => item.industry))];
  const [searchParams, setSearchParams] = useSearchParams();
  const active = searchParams.get('industry') || 'All';
  const filtered = useMemo(
    () => (active === 'All' ? caseStudies : caseStudies.filter((item) => item.industry === active)),
    [active],
  );

  return (
    <>
      <Seo
        title="Work"
        description="Explore representative Tekzura web, e-commerce, automation, and lead generation engagements."
        path="/work"
      />
      <PageHero
        eyebrow="Work"
        title="Solutions shaped around the operating challenge."
        description="These representative engagements show how we connect business context, focused delivery, and maintainable digital systems."
        visual="/case-ecommerce.jpg"
        visualAlt="Modern e-commerce interface presented across desktop and mobile devices"
        theme="dark"
      />
      <section className="section">
        <div className="container">
          <div className="work-intro">
            <div>
              <p className="eyebrow">Selected engagements</p>
              <h2>Digital work built around a real operating need.</h2>
            </div>
            <p>Browse by industry, then open any project to see the challenge, approach, and practical outcome without leaving the page.</p>
          </div>
          <div className="work-toolbar">
            <div className="work-filter-group">
              <span className="work-filter-label"><SlidersHorizontal aria-hidden="true" /> Filter by industry</span>
              <div className="filter-bar" aria-label="Filter work by industry">
                {industries.map((industry) => (
                  <button
                    key={industry}
                    type="button"
                    className={active === industry ? 'active' : ''}
                    aria-pressed={active === industry}
                    onClick={() => setSearchParams(industry === 'All' ? {} : { industry })}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>
            <p className="results-count" aria-live="polite"><BriefcaseBusiness aria-hidden="true" /> {filtered.length} project {filtered.length === 1 ? 'example' : 'examples'}</p>
          </div>
          {filtered.length > 0 ? (
            <div className="case-grid work-case-grid filter-results" key={active}>
              {filtered.map((item, index) => <CaseStudyCard key={item.title} item={item} featured={index === 0} index={index} />)}
            </div>
          ) : (
            <div className="empty-state"><h2>No matching projects</h2><p>Choose another industry to explore representative work.</p></div>
          )}
        </div>
      </section>
    </>
  );
}
