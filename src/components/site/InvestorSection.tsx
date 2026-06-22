import { ArrowRight, GitBranch, LayoutDashboard, LineChart, Rocket, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../../content/site';
import { SectionHeading } from './PageElements';
import { Reveal } from './InteractiveSections';

const founderValues = [
  {
    icon: Rocket,
    title: 'MVPs that get to market fast',
    text: 'Launch a credible first version quickly so you can test demand, win early users, and show traction — without overbuilding.',
  },
  {
    icon: ShieldCheck,
    title: 'Architecture built to scale',
    text: 'Clean, secure foundations that handle growth in users and data, so you are never forced into a costly rebuild after raising.',
  },
  {
    icon: LineChart,
    title: 'Market-validated products',
    text: 'We validate the idea and the business model first, so what you take to investors is backed by real signal, not assumptions.',
  },
  {
    icon: GitBranch,
    title: 'Clear product roadmaps',
    text: 'A sequenced roadmap that shows exactly where the product is heading — the kind of clarity investors and teams expect.',
  },
];

const investorMetrics = [
  { value: 'MVP', label: 'in weeks, not quarters' },
  { value: '100%', label: 'ownership of code & IP' },
  { value: '24/7', label: 'analytics & growth tracking' },
];

export default function InvestorSection() {
  return (
    <section className="section investor-section" aria-labelledby="investor-title">
      <div className="container investor-grid">
        <div className="investor-copy">
          <Reveal>
            <SectionHeading
              eyebrow=""
              title="Build a product investors take seriously."
              description="Whether you are pre-seed or scaling toward your next round, we build products that stand up to due diligence — validated, scalable, and measurable from day one."
            />
          </Reveal>

          <Reveal>
            <div className="investor-values">
              {founderValues.map((value) => {
                const Icon = value.icon;
                return (
                  <article key={value.title} className="investor-value">
                    <span className="investor-value-icon" aria-hidden="true"><Icon /></span>
                    <div>
                      <h3>{value.title}</h3>
                      <p>{value.text}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </Reveal>

          <Reveal>
            <a className="button button-primary" href={siteConfig.calendly} target="_blank" rel="noreferrer">
              Book a Growth Strategy Call <ArrowRight aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <Reveal className="investor-panel-wrap">
          <aside className="investor-panel" aria-label="What founders get with Tekzura">
            <div className="investor-panel-head">
              <span className="investor-panel-badge"><LayoutDashboard aria-hidden="true" /> Founder dashboard</span>
              <span className="investor-panel-status"><i aria-hidden="true" /> Investor-ready</span>
            </div>

            <dl className="investor-metrics">
              {investorMetrics.map((metric) => (
                <div key={metric.label} className="investor-metric">
                  <dt>{metric.value}</dt>
                  <dd>{metric.label}</dd>
                </div>
              ))}
            </dl>

            <div className="investor-roadmap" aria-hidden="true">
              <span className="investor-roadmap-label">Product roadmap</span>
              <ol className="investor-roadmap-track">
                <li className="is-done"><span>Validate</span></li>
                <li className="is-done"><span>MVP</span></li>
                <li className="is-active"><span>Launch</span></li>
                <li><span>Scale</span></li>
              </ol>
            </div>

            <p className="investor-panel-note">
              Every engagement ships with the metrics, documentation, and roadmap clarity that founders need in the room.
            </p>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
