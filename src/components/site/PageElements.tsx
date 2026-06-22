import { type ReactNode } from 'react';
import { Check } from 'lucide-react';

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
      <h2 className="section-title">{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => <li key={item}><Check aria-hidden="true" /> <span>{item}</span></li>)}
    </ul>
  );
}
