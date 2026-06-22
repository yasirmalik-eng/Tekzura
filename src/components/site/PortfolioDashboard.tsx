import {
  BarChart3,
  Blocks,
  Braces,
  CheckCircle2,
  Cloud,
  Code2,
  ExternalLink,
  Facebook,
  Globe2,
  Instagram,
  Layers3,
  Linkedin,
  Megaphone,
  MonitorSmartphone,
  PackageCheck,
  PanelsTopLeft,
  ShoppingBag,
  Store,
  Workflow,
} from 'lucide-react';
import type { PortfolioCategory, PortfolioEntry } from '../../content/portfolio';

function MarketingDashboard({ entries }: { entries: PortfolioEntry[] }) {
  const facebook = entries.filter((entry) => entry.platform === 'Facebook').length;
  const instagram = entries.filter((entry) => entry.platform === 'Instagram').length;
  const linkedin = entries.filter((entry) => entry.platform === 'LinkedIn').length;

  return (
    <div className="portfolio-visual marketing-dashboard" role="img" aria-label="Digital marketing portfolio dashboard showing channel distribution and campaign network">
      <div className="portfolio-visual-head">
        <div><span>Channel portfolio</span><strong>Campaign network</strong></div>
        <small><i /> {entries.length} projects</small>
      </div>
      <div className="marketing-dashboard-grid">
        <article><Facebook aria-hidden="true" /><span>Facebook</span><strong>{facebook}</strong><i><b style={{ width: `${(facebook / entries.length) * 100}%` }} /></i></article>
        <article><Instagram aria-hidden="true" /><span>Instagram</span><strong>{instagram}</strong><i><b style={{ width: `${(instagram / entries.length) * 100}%` }} /></i></article>
        <article><Linkedin aria-hidden="true" /><span>LinkedIn</span><strong>{linkedin}</strong><i><b style={{ width: `${Math.max((linkedin / entries.length) * 100, 8)}%` }} /></i></article>
      </div>
      <div className="marketing-network" aria-hidden="true">
        <span className="network-core"><Megaphone /></span>
        {[Facebook, Instagram, BarChart3, Globe2, Linkedin].map((Icon, index) => <i key={index}><Icon /></i>)}
      </div>
    </div>
  );
}

function WebDashboard({ entries }: { entries: PortfolioEntry[] }) {
  const apps = entries.filter((entry) => entry.platform === 'Web App').length;
  const websites = entries.filter((entry) => entry.platform === 'Website').length;

  return (
    <div className="portfolio-visual web-dashboard" role="img" aria-label="Web development portfolio dashboard showing public websites and product interfaces">
      <div className="portfolio-browser">
        <div className="portfolio-browser-bar"><i /><i /><i /><span>delivery.tekzura.dev</span></div>
        <div className="portfolio-browser-body">
          <aside><Braces /><i className="active" /><i /><i /><i /></aside>
          <div>
            <span>Responsive delivery system</span>
            <strong>Public-facing web experiences built for clarity, speed, and conversion.</strong>
            <div className="web-dashboard-metrics">
              <article><MonitorSmartphone /><b>{entries.length}</b><small>Public projects</small></article>
              <article><Globe2 /><b>{websites}</b><small>Websites</small></article>
              <article><PanelsTopLeft /><b>{apps}</b><small>Product UIs</small></article>
              <article><CheckCircle2 /><b>{entries.length}</b><small>Live links</small></article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SaasDashboard({ entries }: { entries: PortfolioEntry[] }) {
  return (
    <div className="portfolio-visual saas-dashboard" role="img" aria-label="SaaS product portfolio dashboard showing five connected product systems">
      <div className="portfolio-visual-head">
        <div><span>Product portfolio</span><strong>Connected SaaS modules</strong></div>
        <small><i /> {entries.length} platforms</small>
      </div>
      <div className="saas-module-map">
        <span className="saas-core"><Cloud /><b>SaaS</b></span>
        {entries.map((entry, index) => {
          const Icon = [Blocks, Workflow, BarChart3, Code2, Layers3][index];
          return (
            <article key={entry.url} style={{ '--module-index': index } as React.CSSProperties}>
              <Icon aria-hidden="true" />
              <strong>{entry.title}</strong><small>Product system</small>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function CommerceDashboard({ entries }: { entries: PortfolioEntry[] }) {
  return (
    <div className="portfolio-visual commerce-portfolio-dashboard" role="img" aria-label="Shopify portfolio dashboard showing store systems and commerce journeys">
      <div className="portfolio-visual-head">
        <div><span>Storefront portfolio</span><strong>Commerce operating view</strong></div>
        <small><i /> {entries.length} stores</small>
      </div>
      <div className="commerce-portfolio-body">
        <section>
          <div className="commerce-portfolio-icon"><Store /></div>
          <span>Store systems</span>
          <strong>Catalog, merchandising, checkout, and customer experience.</strong>
          <div>{['Discover', 'Browse', 'Purchase', 'Return'].map((label, index) => <i key={label}><b>{index + 1}</b>{label}</i>)}</div>
        </section>
        <aside>
          <article><ShoppingBag /><span>Storefront projects</span><b>{entries.length}</b></article>
          <article><PackageCheck /><span>Commerce journeys</span><b>4</b></article>
          <div className="commerce-bars">{[52, 78, 66, 92, 73, 88, 62].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div>
        </aside>
      </div>
    </div>
  );
}

function WordPressDashboard({ entries }: { entries: PortfolioEntry[] }) {
  const groups = [...new Set(entries.map((entry) => entry.subcategory).filter(Boolean))];
  return (
    <div className="portfolio-visual wordpress-portfolio-dashboard" role="img" aria-label="WordPress portfolio dashboard showing projects grouped by industry and project type">
      <div className="wordpress-portfolio-sidebar">
        <span className="wordpress-mark">W</span>
        {groups.slice(0, 6).map((group, index) => <i key={group} className={index === 0 ? 'active' : ''} />)}
      </div>
      <div className="wordpress-portfolio-main">
        <div className="portfolio-visual-head">
          <div><span>Content ecosystem</span><strong>WordPress portfolio</strong></div>
          <small><i /> {entries.length} projects</small>
        </div>
        <div className="wordpress-category-grid">
          {groups.map((group, index) => {
            const count = entries.filter((entry) => entry.subcategory === group).length;
            return <article key={group}><span>{String(index + 1).padStart(2, '0')}</span><strong>{group}</strong><small>{count} projects</small><i><b style={{ width: `${(count / 15) * 100}%` }} /></i></article>;
          })}
        </div>
      </div>
    </div>
  );
}

export function PortfolioDashboard({
  category,
  entries,
}: {
  category: PortfolioCategory;
  entries: PortfolioEntry[];
}) {
  if (category.dashboardVariant === 'marketing') return <MarketingDashboard entries={entries} />;
  if (category.dashboardVariant === 'web') return <WebDashboard entries={entries} />;
  if (category.dashboardVariant === 'saas') return <SaasDashboard entries={entries} />;
  if (category.dashboardVariant === 'commerce') return <CommerceDashboard entries={entries} />;
  return <WordPressDashboard entries={entries} />;
}

function PlatformIcon({ platform }: { platform: PortfolioEntry['platform'] }) {
  if (platform === 'Facebook') return <Facebook aria-hidden="true" />;
  if (platform === 'Instagram') return <Instagram aria-hidden="true" />;
  if (platform === 'LinkedIn') return <Linkedin aria-hidden="true" />;
  if (platform === 'Shopify') return <ShoppingBag aria-hidden="true" />;
  if (platform === 'WordPress') return <span aria-hidden="true">W</span>;
  if (platform === 'SaaS') return <Cloud aria-hidden="true" />;
  if (platform === 'Web App') return <PanelsTopLeft aria-hidden="true" />;
  return <Globe2 aria-hidden="true" />;
}

export function PortfolioLinkCard({ entry, index }: { entry: PortfolioEntry; index: number }) {
  const displayUrl = new URL(entry.url).hostname.replace(/^www\./, '');
  const descriptor = entry.subcategory || (entry.linkType === 'social' ? 'Social growth channel' : `${entry.platform} delivery`);
  const actionLabel = entry.linkType === 'social' ? 'Open Channel' : 'View Live Project';
  return (
    <article className="portfolio-link-card">
      <div className="portfolio-link-card-top">
        <div className={`portfolio-platform-icon platform-${entry.platform.toLowerCase().replace(/\s/g, '-')}`}>
          <PlatformIcon platform={entry.platform} />
        </div>
        <span className="portfolio-project-index">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="portfolio-link-copy">
        <div className="portfolio-link-badges">
          <span>{entry.platform}</span>
          {entry.linkType === 'live' && <span className="status-live"><CheckCircle2 aria-hidden="true" /> Public</span>}
        </div>
        <h3>{entry.title}</h3>
        <p>{displayUrl}</p>
        <small>{descriptor}</small>
      </div>
      <a href={entry.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${entry.title} project`}>
        <span>{actionLabel}</span><ExternalLink aria-hidden="true" />
      </a>
    </article>
  );
}
