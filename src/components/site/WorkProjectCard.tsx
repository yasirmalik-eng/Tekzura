import {
  ArrowUpRight,
  Cloud,
  Facebook,
  Globe2,
  Instagram,
  Layers3,
  Linkedin,
  ShoppingBag,
} from 'lucide-react';
import type { ShowcaseProject } from '../../content/workSection';

const typeAccent: Record<string, string> = {
  'Web App': '#155eef',
  SaaS: '#7f56d9',
  Website: '#0f9f8f',
  Facebook: '#1877f2',
  Instagram: '#c13584',
  LinkedIn: '#0a66c2',
  Shopify: '#0f9f8f',
  WordPress: '#21759b',
};

function getAccent(type: string) {
  return typeAccent[type] ?? '#155eef';
}

function TypeIcon({ type }: { type: string }) {
  if (type === 'SaaS') return <Cloud aria-hidden="true" />;
  if (type === 'Web App') return <Layers3 aria-hidden="true" />;
  if (type === 'Facebook') return <Facebook aria-hidden="true" />;
  if (type === 'Instagram') return <Instagram aria-hidden="true" />;
  if (type === 'LinkedIn') return <Linkedin aria-hidden="true" />;
  if (type === 'Shopify') return <ShoppingBag aria-hidden="true" />;
  if (type === 'WordPress') return <span aria-hidden="true">W</span>;
  return <Globe2 aria-hidden="true" />;
}

function displayHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function WorkProjectCard({
  project,
  index,
  variant = 'full',
}: {
  project: ShowcaseProject;
  index: number;
  variant?: 'full' | 'compact';
}) {
  const hostname = displayHostname(project.websiteUrl);
  const accent = getAccent(project.type);
  const typeClass = project.type.toLowerCase().replace(/\s/g, '-');

  if (variant === 'compact') {
    return (
      <a
        className="work-dashboard-card"
        href={project.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ '--card-accent': accent } as React.CSSProperties}
        aria-label={`Visit ${project.projectName}`}
      >
        <div className="work-dashboard-card-head">
          <span className="work-dashboard-card-type">{project.type}</span>
          <span className="work-dashboard-card-index">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <strong>{project.projectName}</strong>
        <dl className="work-dashboard-card-meta">
          <div><dt>Industry</dt><dd>{project.industry}</dd></div>
          <div><dt>Service</dt><dd>{project.serviceCategory}</dd></div>
          <div><dt>URL</dt><dd>{hostname}</dd></div>
        </dl>
        <span className="work-dashboard-card-action">
          Open project <ArrowUpRight aria-hidden="true" />
        </span>
      </a>
    );
  }

  return (
    <a
      className="work-project-card"
      href={project.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ '--card-accent': accent } as React.CSSProperties}
      aria-label={`Visit ${project.projectName} at ${hostname}`}
    >
      <div className="work-project-card-top">
        <div className={`work-project-type-icon type-${typeClass}`}>
          <TypeIcon type={project.type} />
        </div>
        <span className="work-project-index">{String(index + 1).padStart(2, '0')}</span>
      </div>

      <div className="work-project-card-body">
        <div className="work-project-badges">
          <span>{project.type}</span>
          <span className="work-project-live">Live</span>
        </div>
        <h3>{project.projectName}</h3>

        <dl className="work-project-details">
          <div>
            <dt>Type</dt>
            <dd>{project.type}</dd>
          </div>
          <div>
            <dt>Industry</dt>
            <dd>{project.industry}</dd>
          </div>
          <div>
            <dt>Service category</dt>
            <dd>{project.serviceCategory}</dd>
          </div>
          <div className="work-project-url-row">
            <dt>Website</dt>
            <dd>{hostname}</dd>
          </div>
        </dl>
      </div>

      <span className="work-project-card-cta">
        View live project <ArrowUpRight aria-hidden="true" />
      </span>
    </a>
  );
}
