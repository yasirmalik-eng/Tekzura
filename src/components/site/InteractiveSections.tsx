import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Boxes,
  Check,
  ChevronDown,
  ChevronRight,
  CircuitBoard,
  Code2,
  Database,
  MessagesSquare,
  Rocket,
  Workflow,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { services, type Service, type ServiceSlug } from '../../content/site';
import PackageBuilderButton from './PackageBuilderButton';
import { SectionHeading } from './PageElements';

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.visible = 'true';
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}>{children}</div>;
}

function ServiceDashboardVisual({ service }: { service: Service }) {
  const Icon = service.icon;
  const slug = service.slug;

  return (
    <div className={`service-dashboard-ui dashboard-${slug}`} aria-label={`${service.title} interactive dashboard preview`}>
      <div className="dashboard-browser-bar">
        <span /><span /><span />
        <b>{service.shortTitle} workspace</b>
      </div>
      <div className="dashboard-app">
        <aside>
          <span className="dashboard-app-logo"><Icon aria-hidden="true" /></span>
          {service.technologies.slice(0, 4).map((tech, index) => <i key={tech} className={index === 0 ? 'active' : ''} title={tech} />)}
        </aside>
        <div className="dashboard-workspace">
          {slug === 'full-stack-dev' && (
            <div className="web-product-preview">
              <div className="mini-toolbar"><span>tekzura.dev</span><i>Desktop</i><i>Mobile</i></div>
              <div className="mini-browser">
                <div><small>Digital product</small><strong>Build a faster way forward.</strong><span /><span /><button type="button" tabIndex={-1}>Start a project</button></div>
                <aside><i /><i /><i /></aside>
              </div>
              <div className="mini-performance">
                <span><b>96</b>Performance</span><span><b>100</b>Accessibility</span><span><b>98</b>SEO</span>
              </div>
            </div>
          )}

          {slug === 'shopify' && (
            <div className="commerce-preview">
              <div className="mini-dashboard-title"><div><span>Store overview</span><strong>Commerce control room</strong></div><i>Live</i></div>
              <div className="commerce-metrics"><article><span>Orders</span><b>248</b><small>+18% this month</small></article><article><span>Conversion</span><b>4.8%</b><small>Healthy checkout</small></article></div>
              <div className="commerce-body">
                <div className="commerce-chart">{[44, 62, 52, 78, 66, 88, 96].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div>
                <div className="commerce-orders"><span>Recent orders</span>{['#TK-2408', '#TK-2407', '#TK-2406'].map((order, index) => <div key={order}><b>{order}</b><small>{index === 1 ? 'Processing' : 'Paid'}</small></div>)}</div>
              </div>
            </div>
          )}

          {slug === 'digital-marketing' && (
            <div className="marketing-preview">
              <div className="mini-dashboard-title"><div><span>Campaign center</span><strong>Growth performance</strong></div><i>Last 30 days</i></div>
              <div className="marketing-graph"><span>Qualified traffic</span><svg viewBox="0 0 420 150" preserveAspectRatio="none" aria-hidden="true"><path d="M0 130 C45 125 55 92 95 100 S145 122 180 75 S235 94 270 55 S330 70 360 34 S395 24 420 12" /><path className="area" d="M0 130 C45 125 55 92 95 100 S145 122 180 75 S235 94 270 55 S330 70 360 34 S395 24 420 12 V150 H0 Z" /></svg></div>
              <div className="channel-row">{['Search', 'Social', 'Content'].map((channel, index) => <div key={channel}><span><i />{channel}</span><b>{[46, 32, 22][index]}%</b></div>)}</div>
            </div>
          )}

          {slug === 'wordpress' && (
            <div className="wordpress-preview">
              <div className="editor-sidebar"><strong>Pages</strong>{['Home', 'Services', 'Work', 'Insights'].map((page, index) => <span key={page} className={index === 0 ? 'active' : ''}>{page}<i /></span>)}</div>
              <div className="editor-canvas">
                <div className="editor-top"><span>Home page</span><button type="button" tabIndex={-1}>Publish</button></div>
                <div className="editor-block hero-block"><small>Hero block</small><strong>Content your team can control.</strong><span /></div>
                <div className="editor-columns"><i /><i /><i /></div>
              </div>
            </div>
          )}

          {slug === 'marketing-automation' && (
            <div className="automation-preview">
              <div className="ai-dashboard-title">
                <div><span>Operations Overview</span><strong>Automation Control Center</strong></div>
                <small><i /> Systems Active</small>
              </div>
              <div className="ai-metrics">
                {[
                  ['Workflows', '24', '+4 active'],
                  ['Success Rate', '98.6%', 'Last 7 days'],
                  ['Tasks Completed', '1,842', 'Today'],
                  ['Time Saved', '128h', 'This month'],
                ].map(([label, value, note], index) => (
                  <article key={label}>
                    <span>{label}</span><strong>{value}</strong><small>{note}</small>
                    <svg viewBox="0 0 80 24" preserveAspectRatio="none" aria-hidden="true">
                      <path className={`metric-line metric-line-${index + 1}`} d="M0 21 L10 17 L18 19 L28 10 L37 14 L48 7 L59 11 L69 4 L80 8" />
                    </svg>
                  </article>
                ))}
              </div>
              <div className="ai-dashboard-main">
                <section className="ai-flow-panel">
                  <span>Automation Flow</span>
                  <div className="ai-flow">
                    <svg className="ai-flow-connectors" viewBox="0 0 400 118" preserveAspectRatio="none" aria-hidden="true">
                      <path d="M86 24 H114 M186 24 H214 M286 24 H314" />
                      <path d="M350 48 V62 H150 V70" />
                      <path d="M186 96 H214" />
                    </svg>
                    <article className="flow-step step-lead"><Icon /><strong>New Lead</strong><small>Trigger</small></article>
                    <article className="flow-step step-enrich"><Database /><strong>Enrich</strong><small>Data</small></article>
                    <article className="flow-step step-score"><CircuitBoard /><strong>AI Score</strong><small>Qualify</small></article>
                    <article className="flow-step step-route"><Workflow /><strong>Route</strong><small>Assign</small></article>
                    <article className="flow-step step-task"><Check /><strong>Create</strong><small>Task</small></article>
                    <article className="flow-step step-notify"><MessagesSquare /><strong>Notify</strong><small>Team</small></article>
                  </div>
                </section>
                <section className="ai-task-panel">
                  <span>Task Queue</span>
                  {[
                    ['Follow up with Acme Corp', 'In Progress'],
                    ['Send proposal to Globex', 'In Progress'],
                    ['Contact new lead', 'Pending'],
                    ['Onboard new client', 'Completed'],
                  ].map(([task, status], index) => (
                    <div key={task}><i className={`queue-dot queue-dot-${index + 1}`} /><strong>{task}</strong><small>{status}</small></div>
                  ))}
                </section>
              </div>
              <div className="ai-dashboard-bottom">
                <section className="ai-pipeline-panel">
                  <div><span>Pipeline</span><small>This Month</small></div>
                  <div className="ai-pipeline-stages">
                    {[
                      ['New', '128', 78],
                      ['Qualified', '64', 62],
                      ['Proposal', '32', 46],
                      ['Closed', '12', 28],
                    ].map(([stage, count, width]) => (
                      <article key={stage}><span>{stage}</span><strong>{count}</strong><i><b style={{ width: `${width}%` }} /></i></article>
                    ))}
                  </div>
                </section>
                <section className="ai-performance-panel">
                  <div><span>Performance</span><small>Success Rate</small></div>
                  <svg viewBox="0 0 240 90" preserveAspectRatio="none" aria-hidden="true">
                    <path className="performance-grid" d="M0 20 H240 M0 45 H240 M0 70 H240" />
                    <path className="performance-blue" d="M0 76 C25 70 35 55 60 58 S95 42 118 46 S152 27 176 34 S210 16 240 20" />
                    <path className="performance-teal" d="M0 84 C28 80 48 70 72 73 S108 52 132 61 S170 43 194 49 S219 36 240 39" />
                  </svg>
                </section>
              </div>
            </div>
          )}

          {slug === 'youtube-automation' && (
            <div className="youtube-preview">
              <div className="mini-dashboard-title"><div><span>Channel studio</span><strong>YouTube command center</strong></div><i>Live</i></div>
              <div className="youtube-stats">
                {[
                  ['Subscribers', '48.2K', '+1.2K'],
                  ['Watch time', '312K', 'hrs/mo'],
                  ['CTR', '6.4%', 'Above avg'],
                ].map(([label, value, note]) => (
                  <article key={label}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>
                ))}
              </div>
              <div className="youtube-body">
                <div className="youtube-upload"><span>Upload pipeline</span>{['Script', 'Edit', 'Thumbnail', 'Schedule'].map((step, index) => <i key={step} className={index < 3 ? 'done' : 'active'}>{step}</i>)}</div>
                <div className="youtube-grid">
                  <span>Top videos</span>
                  {[
                    ['Product walkthrough', '24K views'],
                    ['Client case study', '18K views'],
                    ['How-to series #4', '12K views'],
                  ].map(([title, views]) => (
                    <article key={title}><i aria-hidden="true" /><div><strong>{title}</strong><small>{views}</small></div></article>
                  ))}
                </div>
              </div>
            </div>
          )}

          {slug === 'graphic-design' && (
            <div className="design-preview">
              <div className="mini-dashboard-title"><div><span>Brand studio</span><strong>Design workspace</strong></div><i>v3.2</i></div>
              <div className="design-board">
                <section className="design-brand-kit">
                  <span>Brand kit</span>
                  <div className="design-logo-mark" aria-hidden="true" />
                  <div className="design-swatches">{['#534AB7', '#0F9F8F', '#B6F36B', '#08111F'].map((color) => <i key={color} style={{ background: color }} />)}</div>
                  <div className="design-type"><strong>Aa</strong><small>Plus Jakarta / Inter</small></div>
                </section>
                <section className="design-templates">
                  <span>Content templates</span>
                  {['Instagram post', 'LinkedIn banner', 'Pitch deck'].map((template, index) => (
                    <article key={template} className={index === 0 ? 'active' : ''}><i aria-hidden="true" /><strong>{template}</strong><small>{index === 0 ? 'In review' : 'Approved'}</small></article>
                  ))}
                </section>
              </div>
            </div>
          )}

          {slug === 'customer-support' && (
            <div className="support-preview">
              <div className="mini-dashboard-title"><div><span>Helpdesk</span><strong>Support inbox</strong></div><i>SLA 98%</i></div>
              <div className="support-metrics">
                {[
                  ['Open', '14', 'Needs reply'],
                  ['Pending', '6', 'Awaiting client'],
                  ['Resolved', '128', 'This week'],
                ].map(([label, value, note]) => (
                  <article key={label}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>
                ))}
              </div>
              <div className="support-inbox">
                <span>Live conversations</span>
                {[
                  ['Billing question — Acme Co.', '2m ago', 'urgent'],
                  ['Onboarding help — Nova Labs', '8m ago', ''],
                  ['Refund request — BrightPath', '14m ago', ''],
                  ['Feature question — Vertex', 'Resolved', 'done'],
                ].map(([subject, time, status]) => (
                  <article key={subject} className={status || undefined}><i aria-hidden="true" /><div><strong>{subject}</strong><small>{time}</small></div>{status === 'urgent' && <b>Urgent</b>}{status === 'done' && <b className="resolved">Done</b>}</article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ServiceDashboardCopy({ service }: { service: Service }) {
  return (
    <div className="dashboard-service-copy">
      <p className="eyebrow">{service.eyebrow}</p>
      <h3>{service.title}</h3>
      <p>{service.summary}</p>
      <ul>
        {service.deliverables.slice(0, 3).map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}
      </ul>
      <Link className="text-link" to={`/services/${service.slug}`}>Explore Service <ArrowRight aria-hidden="true" /></Link>
    </div>
  );
}

function ServiceDirectoryMobilePanel({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <div className="service-directory-mobile-panel">
      <div className="service-directory-mobile-visual">
        <img src={service.image} alt={service.imageAlt} width="1200" height="800" loading="lazy" />
        <div className="service-directory-shade" aria-hidden="true" />
        <div className="service-directory-badge"><Icon aria-hidden="true" /><span>{service.eyebrow}</span></div>
      </div>
      <h3>{service.title}</h3>
      <p>{service.summary}</p>
      <p className="service-directory-mobile-outcome"><strong>Designed outcome:</strong> {service.outcome}</p>
      <div className="tag-row">{service.technologies.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}</div>
      <Link className="text-link" to={`/services/${service.slug}`}>Explore Service <ArrowRight aria-hidden="true" /></Link>
    </div>
  );
}

function ServicesMobileAccordion({
  activeSlug,
  onSelect,
  variant,
}: {
  activeSlug: ServiceSlug;
  onSelect: (slug: ServiceSlug) => void;
  variant: 'dashboard' | 'directory';
}) {
  return (
    <div className="services-mobile-accordion">
      {services.map((service) => {
        const isOpen = activeSlug === service.slug;
        const panelId = `service-mobile-panel-${service.slug}`;
        const triggerId = `service-mobile-trigger-${service.slug}`;

        return (
          <article key={service.slug} className={`services-mobile-accordion-item ${isOpen ? 'is-open' : ''}`}>
            <button
              id={triggerId}
              type="button"
              className="services-mobile-accordion-trigger"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => onSelect(service.slug)}
            >
              <span>{service.shortTitle}</span>
              <ChevronDown aria-hidden="true" />
            </button>
            <div
              id={panelId}
              className="services-mobile-accordion-panel"
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
            >
              {variant === 'dashboard' ? (
                <ServiceDashboardCopy service={service} />
              ) : (
                <ServiceDirectoryMobilePanel service={service} />
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function CapabilityExplorer({ variant = 'directory' }: { variant?: 'directory' | 'dashboard' }) {
  const [activeSlug, setActiveSlug] = useState<ServiceSlug>('full-stack-dev');
  const active = services.find((service) => service.slug === activeSlug)!;
  const Icon = active.icon;

  function select(slug: ServiceSlug, updateHash = false) {
    setActiveSlug(slug);
    if (updateHash) window.history.replaceState(null, '', `#${slug}`);
  }

  function moveTab(currentIndex: number, direction: number) {
    const nextIndex = (currentIndex + direction + services.length) % services.length;
    select(services[nextIndex].slug);
    document.getElementById(`dashboard-tab-${services[nextIndex].slug}`)?.focus();
  }

  useEffect(() => {
    const hash = window.location.hash.slice(1) as ServiceSlug;
    if (services.some((service) => service.slug === hash)) setActiveSlug(hash);
  }, []);

  return (
    <section className="section capability-section" id="capabilities">
      <div className="container">
        <Reveal>
          <div className="capability-section-head">
            <SectionHeading
              eyebrow={ ''}
              title={ 'Services we offer'}
              description={'Select a capability to see how Tekzura connects delivery work with the result your team needs.'}
            />
            <PackageBuilderButton label="Build custom package" variant="primary" />
          </div>
        </Reveal>
        {variant === 'dashboard' ? (
          <>
            <div className="capability-dashboard capability-dashboard-desktop">
              <div className="dashboard-tabs" role="tablist" aria-label="Tekzura services">
                {services.map((service, index) => {
                  const ServiceIcon = service.icon;
                  return (
                    <button
                      key={service.slug}
                      id={`dashboard-tab-${service.slug}`}
                      type="button"
                      role="tab"
                      aria-selected={activeSlug === service.slug}
                      aria-controls={`dashboard-panel-${service.slug}`}
                      tabIndex={activeSlug === service.slug ? 0 : -1}
                      onClick={() => select(service.slug)}
                      onKeyDown={(event) => {
                        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                          event.preventDefault();
                          moveTab(index, 1);
                        }
                        if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                          event.preventDefault();
                          moveTab(index, -1);
                        }
                      }}
                    >
                      <ServiceIcon aria-hidden="true" />
                      <span><strong>{service.shortTitle}</strong><small>{service.eyebrow}</small></span>
                      <ChevronRight aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
              <div
                className="dashboard-panel"
                id={`dashboard-panel-${active.slug}`}
                role="tabpanel"
                aria-labelledby={`dashboard-tab-${active.slug}`}
              >
                <ServiceDashboardCopy service={active} key={`copy-${active.slug}`} />
                <ServiceDashboardVisual service={active} key={`dashboard-${active.slug}`} />
              </div>
            </div>
            <ServicesMobileAccordion activeSlug={activeSlug} onSelect={select} variant="dashboard" />
          </>
        ) : (
        <>
        <div className="service-directory service-directory-desktop">
          <div className="service-directory-visual" key={active.slug}>
            <img src={active.image} alt={active.imageAlt} width="1200" height="800" loading="lazy" />
            <div className="service-directory-shade" aria-hidden="true" />
            <div className="service-directory-badge"><Icon aria-hidden="true" /><span>{active.eyebrow}</span></div>
            <div className="service-directory-outcome">
              <span>Designed outcome</span>
              <strong>{active.outcome}</strong>
              <div>{active.technologies.slice(0, 4).map((tech) => <small key={tech}>{tech}</small>)}</div>
            </div>
          </div>
          <div className="service-directory-list" aria-label="Tekzura services">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className={activeSlug === service.slug ? 'active' : ''}
                  onMouseEnter={() => select(service.slug)}
                  onFocus={() => select(service.slug)}
                  onClick={() => select(service.slug, true)}
                >
                  <span className="service-directory-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="service-directory-icon"><ServiceIcon aria-hidden="true" /></span>
                  <span className="service-directory-copy">
                    <strong>{service.shortTitle}</strong>
                    <small>{service.summary}</small>
                  </span>
                  <ArrowRight aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>
        <ServicesMobileAccordion activeSlug={activeSlug} onSelect={select} variant="directory" />
        </>
        )}
      </div>
    </section>
  );
}

const serviceProcessDetails = [
  {
    label: 'Align',
    description: 'Confirm the audience, operating constraint, available evidence, and the practical definition of success.',
  },
  {
    label: 'Shape',
    description: 'Translate priorities into a focused experience, technical direction, and sequence of reviewable milestones.',
  },
  {
    label: 'Deliver',
    description: 'Build the highest-value parts first, share visible progress, and resolve decisions while feedback is useful.',
  },
  {
    label: 'Validate',
    description: 'Review quality, usability, performance, integrations, and readiness against the agreed delivery goals.',
  },
  {
    label: 'Continue',
    description: 'Launch with a clear handover, document the system, and identify the next useful improvement.',
  },
];

export type ProcessStageDetail = {
  label: string;
  description: string;
  deliverables?: string[];
  duration?: string;
};

const studioStages = ['Discover', 'Design', 'Build', 'Validate', 'Launch'];

function DeliveryProcessTabs({
  stages,
  active,
  onSelect,
  slug,
  onMoveStep,
}: {
  stages: string[];
  active: number;
  onSelect: (index: number) => void;
  slug: string;
  onMoveStep: (currentIndex: number, direction: number) => void;
}) {
  return (
    <div className="service-process-tabs" role="tablist" aria-label="Delivery stages">
      {stages.map((item, index) => (
        <button
          key={item}
          id={`service-step-${slug}-${index}`}
          type="button"
          role="tab"
          aria-selected={active === index}
          aria-controls={`service-step-panel-${slug}`}
          tabIndex={active === index ? 0 : -1}
          onClick={() => onSelect(index)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
              event.preventDefault();
              onMoveStep(index, 1);
            }
            if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
              event.preventDefault();
              onMoveStep(index, -1);
            }
            if (event.key === 'Home') {
              event.preventDefault();
              onSelect(0);
              document.getElementById(`service-step-${slug}-0`)?.focus();
            }
            if (event.key === 'End') {
              event.preventDefault();
              const last = stages.length - 1;
              onSelect(last);
              document.getElementById(`service-step-${slug}-${last}`)?.focus();
            }
          }}
        >
          <span>{String(index + 1).padStart(2, '0')}</span>
          <strong>{item}</strong>
        </button>
      ))}
    </div>
  );
}

function DeliveryProcessPanel({
  stages,
  active,
  slug,
  icon: Icon,
  contextLabel,
  details,
}: {
  stages: string[];
  active: number;
  slug: string;
  icon: typeof Workflow;
  contextLabel: string;
  details?: ProcessStageDetail[];
}) {
  const step = stages[active];
  const detail: ProcessStageDetail = details?.[active] ?? serviceProcessDetails[active];

  return (
    <div
      className="service-process-panel"
      id={`service-step-panel-${slug}`}
      role="tabpanel"
      aria-labelledby={`service-step-${slug}-${active}`}
      key={`${slug}-${active}`}
    >
      <div className="service-process-copy">
        <div className="service-process-icon"><Icon aria-hidden="true" /></div>
        <p className="eyebrow">Stage {active + 1} of {stages.length}</p>
        <span>{detail.label}</span>
        <h3>{step}</h3>
        <p>{detail.description}</p>
        {detail.deliverables?.length ? (
          <ul className="service-process-deliverables">
            {detail.deliverables.map((item) => <li key={item}>{item}</li>)}
          </ul>
        ) : null}
        <div className="service-process-status">
          <span>{detail.duration ? detail.duration : 'Progress'}</span>
          <strong>{detail.duration ? `Stage ${active + 1}` : `${Math.round(((active + 1) / stages.length) * 100)}%`}</strong>
        </div>
      </div>
      <div className="service-process-visual" aria-hidden="true">
        <div className="service-process-orbit">
          <span><Icon /></span>
          {stages.map((processStep, index) => (
            <i key={processStep} className={index <= active ? 'complete' : ''}>
              {index < active ? <Check /> : index + 1}
            </i>
          ))}
        </div>
        <strong>{detail.label}</strong>
        <small>{contextLabel}</small>
      </div>
      <div className="service-process-progress" aria-hidden="true">
        <i style={{ transform: `scaleX(${(active + 1) / stages.length})` }} />
      </div>
    </div>
  );
}

export function StudioDeliveryProcess({
  eyebrow = '',
  title = 'How every Tekzura engagement moves forward',
  description = 'From first conversation to launch and beyond, each project follows the same visible stages — with decisions, progress, and ownership kept close to the business goal.',
  stageDetails,
  className = '',
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  stageDetails?: ProcessStageDetail[];
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const slug = 'studio';

  function moveStep(currentIndex: number, direction: number) {
    const nextIndex = (currentIndex + direction + studioStages.length) % studioStages.length;
    setActive(nextIndex);
    document.getElementById(`service-step-${slug}-${nextIndex}`)?.focus();
  }

  return (
    <section className={`section service-process-section ${className}`.trim()} id="delivery-process">
      <div className="container">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
        />
        <div className="service-process">
          <DeliveryProcessTabs
            stages={studioStages}
            active={active}
            onSelect={setActive}
            slug={slug}
            onMoveStep={moveStep}
          />
          <DeliveryProcessPanel
            stages={studioStages}
            active={active}
            slug={slug}
            icon={Workflow}
            contextLabel="Tekzura Studio"
            details={stageDetails}
          />
        </div>
      </div>
    </section>
  );
}

export function ServiceDeliveryProcess({ service }: { service: Service }) {
  const [active, setActive] = useState(0);
  const Icon = service.icon;

  function moveStep(currentIndex: number, direction: number) {
    const nextIndex = (currentIndex + direction + service.process.length) % service.process.length;
    setActive(nextIndex);
    document.getElementById(`service-step-${service.slug}-${nextIndex}`)?.focus();
  }

  return (
    <section className="section service-process-section" id="delivery-process">
      <div className="container">
        <SectionHeading
          eyebrow=""
          title="Visible progress at every stage"
          description={`Each ${service.shortTitle.toLowerCase()} engagement moves through visible stages, with decisions and progress kept close to the business goal.`}
          align="center"
        />
        <div className="service-process">
          <DeliveryProcessTabs
            stages={service.process}
            active={active}
            onSelect={setActive}
            slug={service.slug}
            onMoveStep={moveStep}
          />
          <DeliveryProcessPanel
            stages={service.process}
            active={active}
            slug={service.slug}
            icon={Icon}
            contextLabel={service.shortTitle}
          />
        </div>
      </div>
    </section>
  );
}
