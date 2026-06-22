import { useMemo } from 'react';
import { ArrowRight, BriefcaseBusiness, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import ConversionCTA from '../components/site/ConversionCTA';
import { CaseStudyCard, PageHero } from '../components/site/PageElements';
import Seo from '../components/site/Seo';
import { WorkProjectCard } from '../components/site/WorkProjectCard';
import { WorkProjectsDashboard } from '../components/site/WorkProjectsDashboard';
import { caseStudies } from '../content/site';
import {
  countWorkSectionCategory,
  filterShowcaseProjects,
  getShowcaseCategoryView,
  getShowcaseFilters,
  getShowcaseProjects,
  resolveWorkSectionCategoryId,
  workSectionCategories,
  workSectionStats,
  type WorkSectionCategoryId,
} from '../content/workSection';

export default function WorkPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategoryId = resolveWorkSectionCategoryId(searchParams.get('category'));
  const activeCategory = workSectionCategories.find((category) => category.id === activeCategoryId)!;
  const showcaseCategory = getShowcaseCategoryView(activeCategoryId);

  const showcaseProjects = useMemo(
    () => getShowcaseProjects(activeCategoryId),
    [activeCategoryId],
  );

  const filters = useMemo(() => getShowcaseFilters(showcaseProjects), [showcaseProjects]);

  const requestedFilter = searchParams.get('filter');
  const activeFilter = requestedFilter && filters.includes(requestedFilter) ? requestedFilter : 'All';

  const filteredProjects = useMemo(
    () => filterShowcaseProjects(showcaseProjects, activeFilter),
    [activeFilter, showcaseProjects],
  );

  function selectCategory(categoryId: WorkSectionCategoryId) {
    setSearchParams({ category: categoryId });
  }

  function selectFilter(filter: string) {
    setSearchParams(
      filter === 'All' ? { category: activeCategoryId } : { category: activeCategoryId, filter },
    );
  }

  function moveCategory(currentIndex: number, direction: number) {
    const nextIndex = (currentIndex + direction + workSectionCategories.length) % workSectionCategories.length;
    const next = workSectionCategories[nextIndex];
    selectCategory(next.id);
    document.getElementById(`work-section-tab-${next.id}`)?.focus();
  }

  return (
    <>
      <Seo
        title="Work"
        description="Explore Tekzura client work and public product examples — digital marketing, web, SaaS, Shopify, WordPress, apps, and websites with live links."
        path="/work"
      />
      <PageHero
        eyebrow=""
        title="Client delivery and product work in one place."
        description={`${workSectionStats.total} public projects across ${workSectionStats.serviceAreas} service areas — client-facing delivery plus product examples you can click through and verify.`}
        theme="dark"
      >
        
      </PageHero>

      <section className="section work-stats-band" aria-label="Portfolio statistics">
        <div className="container">
          <div className="work-stats-panel work-stats-panel-combined">
            <article>
              <strong>{workSectionStats.total}</strong>
              <span>Projects</span>
            </article>
            <article>
              <strong>{workSectionStats.clientProjects}</strong>
              <span>Client-facing</span>
            </article>
            <article>
              <strong>{workSectionStats.productExamples}</strong>
              <span>Product-facing</span>
            </article>
            <article>
              <strong>{workSectionStats.serviceAreas}</strong>
              <span>Categories</span>
            </article>
            <article>
              <strong>{workSectionStats.industries}</strong>
              <span>Industries</span>
            </article>
          </div>
        </div>
      </section>

      <section className="section portfolio-section work-unified-section" id="work-explorer">
        <div className="container">
          <div className="work-intro">
            <div>
              
              <h2>Witness the impact from the successful implementation of our projects.</h2>
            </div>
            <p>
              Every project is delivered with a clear understanding of the business problem, the solution, and the intended business outcome.
            </p>
          </div>

          <div className="work-unified-tabs work-unified-tabs-merged" role="tablist" aria-label="Portfolio categories">
            {workSectionCategories.map((category, index) => {
              const count = countWorkSectionCategory(category.id);
              return (
                <button
                  key={category.id}
                  id={`work-section-tab-${category.id}`}
                  type="button"
                  role="tab"
                  aria-selected={activeCategoryId === category.id}
                  aria-controls="work-section-panel"
                  tabIndex={activeCategoryId === category.id ? 0 : -1}
                  onClick={() => selectCategory(category.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                      event.preventDefault();
                      moveCategory(index, 1);
                    }
                    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                      event.preventDefault();
                      moveCategory(index, -1);
                    }
                    if (event.key === 'Home') {
                      event.preventDefault();
                      selectCategory(workSectionCategories[0].id);
                      document.getElementById(`work-section-tab-${workSectionCategories[0].id}`)?.focus();
                    }
                    if (event.key === 'End') {
                      event.preventDefault();
                      const last = workSectionCategories.at(-1)!;
                      selectCategory(last.id);
                      document.getElementById(`work-section-tab-${last.id}`)?.focus();
                    }
                  }}
                  style={{ '--category-accent': category.accent } as React.CSSProperties}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{category.title}</strong>
                  <small>{count} projects</small>
                </button>
              );
            })}
          </div>

          <div
            className="work-unified-panel-wrap"
            id="work-section-panel"
            role="tabpanel"
            aria-labelledby={`work-section-tab-${activeCategoryId}`}
            key={activeCategoryId}
          >
            <WorkProjectsDashboard category={showcaseCategory} projects={showcaseProjects} />
          </div>

          

         
        </div>
      </section>

      <ConversionCTA
        eyebrow="Ready to build"
        title="Want your project to look this credible?"
        description="Tell us what you want to launch, improve, or grow. We will turn the idea into a clear product, engineering, and growth roadmap."
        bullets={['Project-fit review', 'Technical direction', 'Launch roadmap']}
        tone="dark"
      />

      {/* <section className="section section-soft delivery-stories">
        <div className="container">
          <div className="work-intro">
            <div>
              <p className="eyebrow">Delivery stories</p>
              <h2>The problem behind the polished interface.</h2>
            </div>
            <p>Selected examples with context around the challenge, approach, and intended business outcome.</p>
          </div>
          <div className="case-grid">
            {caseStudies.map((item, index) => (
              <CaseStudyCard key={item.title} item={item} index={index} expandable={false} />
            ))}
          </div>
        </div>
      </section> */}
    </>
  );
}
