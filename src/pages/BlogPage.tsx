import { Search } from 'lucide-react';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHero } from '../components/site/PageElements';
import Seo from '../components/site/Seo';
import { blogPosts } from '../content/site';

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return blogPosts;
    return blogPosts.filter((post) =>
      [post.title, post.category, post.excerpt, ...post.tags].join(' ').toLowerCase().includes(normalized),
    );
  }, [query]);

  return (
    <>
      <Seo
        title="Insights"
        description="Practical Tekzura articles on web development, AI automation, design, marketing, and infrastructure."
        path="/blog"
      />
      <PageHero
        eyebrow="Insights"
        title="Useful thinking for better digital decisions."
        description="Practical notes on building, improving, and operating digital products and growth systems."
        visual="/service-data-operations.jpg"
        visualAlt="Digital operations specialist reviewing structured records and quality reporting"
        theme="dark"
      />
      <section className="section">
        <div className="container">
          <label className="search-field">
            <span className="sr-only">Search insights</span>
            <Search aria-hidden="true" />
            <input
              type="search"
              name="article-search"
              autoComplete="off"
              placeholder="Search by topic or keyword…"
              value={query}
              onChange={(event) => {
                const value = event.target.value;
                setSearchParams(value ? { q: value } : {}, { replace: true });
              }}
            />
          </label>
          <p className="results-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'article' : 'articles'}</p>
          {filtered.length > 0 ? (
            <div className="article-grid">
              {filtered.map((post) => (
                <article className="article-card" key={post.title}>
                  <div className="article-visual">
                    {post.image && <img src={post.image} alt={post.imageAlt || ''} width="1200" height="800" loading="lazy" />}
                    <div className="article-visual-shade" aria-hidden="true" />
                    <span>{post.category}</span>
                  </div>
                  <div className="article-content">
                    <div className="article-meta">
                      <time dateTime={post.date}>{new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(`${post.date}T00:00:00`))}</time>
                      <span>{post.readTime} read</span>
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <div className="tag-row">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state"><h2>No matching articles</h2><p>Try a broader topic such as web, automation, design, or marketing.</p></div>
          )}
        </div>
      </section>
    </>
  );
}
