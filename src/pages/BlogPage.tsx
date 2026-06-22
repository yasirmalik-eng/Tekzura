import { Search } from 'lucide-react';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ConversionCTA from '../components/site/ConversionCTA';
import { InsightCaseStudyCard } from '../components/site/InsightCaseStudyCard';
import { PageHero } from '../components/site/PageElements';
import Seo from '../components/site/Seo';
import { insightCaseStudies, INSIGHTS_LISTING_LIMIT } from '../content/insights';

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return insightCaseStudies;
    return insightCaseStudies.filter((study) =>
      [
        study.title,
        study.category,
        study.excerpt,
        study.industry,
        study.challenge,
        study.outcome,
        ...study.tags,
        ...study.highlights,
      ].join(' ').toLowerCase().includes(normalized),
    );
  }, [query]);

  const displayed = useMemo(
    () => filtered.slice(0, INSIGHTS_LISTING_LIMIT),
    [filtered],
  );

  return (
    <>
      <Seo
        title="Insights"
        description="Tekzura case studies and project insights on web development, AI automation, design, marketing, and infrastructure."
        path="/blog"
      />
      <PageHero
        eyebrow=""
        title="Case Studies and Practical Delivery Lessons."
        description="Explore how Tekzura approaches product, growth, and operations work — from challenge and approach through measurable outcome."
        visual=""
        visualAlt="Digital operations specialist reviewing structured records and quality reporting"
        theme="dark"
      />
      <section className="section">
        <div className="container">
          <label className="search-field">
            <span className="sr-only">Search case studies</span>
            <Search aria-hidden="true" />
            <input
              type="search"
              name="case-study-search"
              autoComplete="off"
              placeholder="Search by project, industry, or topic…"
              value={query}
              onChange={(event) => {
                const value = event.target.value;
                setSearchParams(value ? { q: value } : {}, { replace: true });
              }}
            />
          </label>
          <p className="results-count" aria-live="polite">
            {displayed.length} {displayed.length === 1 ? 'case study' : 'case studies'}
          </p>
          {displayed.length > 0 ? (
            <div className="case-grid case-grid-insights">
              {displayed.map((study, index) => (
                <InsightCaseStudyCard key={study.slug} item={study} index={index} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>No matching case studies</h2>
              <p>Try a broader topic such as web, automation, design, or marketing.</p>
            </div>
          )}
        </div>
      </section>

      <ConversionCTA
        eyebrow="Apply the thinking"
        title="Ready to turn insight into execution?"
        description="If a case study sparked a product, automation, or growth idea, Tekzura can help validate it and build the next useful version."
        bullets={['Idea validation', 'Execution plan', 'Build support']}
      />
    </>
  );
}
