import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Check,
  ChevronRight,
  CircuitBoard,
  Code2,
  Database,
  MessagesSquare,
  Rocket,
  SearchCheck,
  Workflow,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { services, type Service, type ServiceSlug } from '../../content/site';
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

  return (
    <div className={`service-dashboard-ui dashboard-${service.slug}`} aria-label={`${service.title} interactive dashboard preview`}>
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
          {service.slug === 'web-development' && (
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

          {service.slug === 'ecommerce' && (
            <div className="commerce-preview">
              <div className="mini-dashboard-title"><div><span>Store overview</span><strong>Commerce control room</strong></div><i>Live</i></div>
              <div className="commerce-metrics"><article><span>Orders</span><b>248</b><small>+18% this month</small></article><article><span>Conversion</span><b>4.8%</b><small>Healthy checkout</small></article></div>
              <div className="commerce-body">
                <div className="commerce-chart">{[44, 62, 52, 78, 66, 88, 96].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div>
                <div className="commerce-orders"><span>Recent orders</span>{['#TK-2408', '#TK-2407', '#TK-2406'].map((order, index) => <div key={order}><b>{order}</b><small>{index === 1 ? 'Processing' : 'Paid'}</small></div>)}</div>
              </div>
            </div>
          )}

          {service.slug === 'digital-marketing' && (
            <div className="marketing-preview">
              <div className="mini-dashboard-title"><div><span>Campaign center</span><strong>Growth performance</strong></div><i>Last 30 days</i></div>
              <div className="marketing-graph"><span>Qualified traffic</span><svg viewBox="0 0 420 150" preserveAspectRatio="none" aria-hidden="true"><path d="M0 130 C45 125 55 92 95 100 S145 122 180 75 S235 94 270 55 S330 70 360 34 S395 24 420 12" /><path className="area" d="M0 130 C45 125 55 92 95 100 S145 122 180 75 S235 94 270 55 S330 70 360 34 S395 24 420 12 V150 H0 Z" /></svg></div>
              <div className="channel-row">{['Search', 'Social', 'Content'].map((channel, index) => <div key={channel}><span><i />{channel}</span><b>{[46, 32, 22][index]}%</b></div>)}</div>
            </div>
          )}

          {service.slug === 'wordpress' && (
            <div className="wordpress-preview">
              <div className="editor-sidebar"><strong>Pages</strong>{['Home', 'Services', 'Work', 'Insights'].map((page, index) => <span key={page} className={index === 0 ? 'active' : ''}>{page}<i /></span>)}</div>
              <div className="editor-canvas">
                <div className="editor-top"><span>Home page</span><button type="button" tabIndex={-1}>Publish</button></div>
                <div className="editor-block hero-block"><small>Hero block</small><strong>Content your team can control.</strong><span /></div>
                <div className="editor-columns"><i /><i /><i /></div>
              </div>
            </div>
          )}

          {service.slug === 'automation-ai' && (
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

          {service.slug === 'lead-generation' && (
            <div className="pipeline-preview">
              <div className="mini-dashboard-title"><div><span>Sales pipeline</span><strong>Qualified opportunities</strong></div><i>12 active</i></div>
              <div className="pipeline-board">
                {[
                  ['Identified', 'Nova Labs', 'Axis Co.'],
                  ['Contacted', 'Northstar', 'Vertex'],
                  ['Qualified', 'BrightPath', ''],
                ].map(([stage, first, second], index) => (
                  <div key={stage}><span>{stage}<b>{index + 1}</b></span><article><i /><strong>{first}</strong><small>B2B Services</small></article>{second && <article><i /><strong>{second}</strong><small>Technology</small></article>}</div>
                ))}
              </div>
            </div>
          )}

          {service.slug === 'data-entry' && (
            <div className="data-preview">
              <div className="mini-dashboard-title"><div><span>Data quality</span><strong>Customer records</strong></div><i>98.7% valid</i></div>
              <div className="data-table">
                <div className="data-head"><span>Name</span><span>Company</span><span>Status</span><span>Quality</span></div>
                {[
                  ['A. Khan', 'Nexa', 'Verified', '100%'],
                  ['S. Malik', 'Orbit', 'Review', '84%'],
                  ['M. Ali', 'Vertex', 'Verified', '100%'],
                  ['H. Noor', 'Bright', 'Verified', '96%'],
                ].map((row) => <div key={row[0]}>{row.map((cell, index) => <span key={cell} className={index === 2 ? cell.toLowerCase() : ''}>{cell}</span>)}</div>)}
              </div>
              <div className="data-footer"><span><i /> 386 records validated</span><b>12 need review</b></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function CapabilityExplorer({ variant = 'directory' }: { variant?: 'directory' | 'dashboard' }) {
  const [activeSlug, setActiveSlug] = useState<ServiceSlug>('web-development');
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
          <SectionHeading
            eyebrow={variant === 'dashboard' ? 'Capability explorer' : 'Service portfolio'}
            title={variant === 'dashboard' ? 'One team, several ways to move the business forward' : 'Specialist capabilities, connected by one delivery team'}
            description={variant === 'dashboard'
              ? 'Select a capability to see how Tekzura connects delivery work with the result your team needs.'
              : 'Explore each capability by the business result it supports, then open the service that matches your next priority.'}
          />
        </Reveal>
        {variant === 'dashboard' ? (
          <div className="capability-dashboard">
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
              <div className="dashboard-service-copy" key={`copy-${active.slug}`}>
                <p className="eyebrow">{active.eyebrow}</p>
                <h3>{active.title}</h3>
                <p>{active.summary}</p>
                <ul>
                  {active.deliverables.slice(0, 3).map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}
                </ul>
                <Link className="text-link" to={`/services/${active.slug}`}>Explore Service <ArrowRight aria-hidden="true" /></Link>
              </div>
              <ServiceDashboardVisual service={active} key={`dashboard-${active.slug}`} />
            </div>
          </div>
        ) : (
        <div className="service-directory">
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
        )}
      </div>
    </section>
  );
}

const processItems = [
  { icon: SearchCheck, title: 'Discover the constraint', text: 'We align on the audience, operating problem, evidence, and practical definition of success.' },
  { icon: Boxes, title: 'Shape the right system', text: 'We turn the goal into a prioritized experience, technical approach, and reviewable roadmap.' },
  { icon: Code2, title: 'Build in visible stages', text: 'Work moves through small milestones so decisions stay clear and feedback arrives while it is useful.' },
  { icon: Rocket, title: 'Launch and improve', text: 'We validate the experience, prepare the handover, and identify the next highest-value improvement.' },
];

export function ProcessStory() {
  const [active, setActive] = useState(0);
  const ActiveIcon = processItems[active].icon;

  return (
    <section className="section process-story-section">
      <div className="container process-story">
        <div className="process-story-copy">
          <p className="eyebrow eyebrow-light">How delivery works</p>
          <h2>Structure that creates momentum, not overhead.</h2>
          <p>Move through the stages to see how strategy, design, engineering, and handover stay connected.</p>
          <div className="process-selector" role="tablist" aria-label="Delivery process">
            {processItems.map((item, index) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={active === index}
                onClick={() => setActive(index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>{item.title}
              </button>
            ))}
          </div>
        </div>
        <div className="process-stage" key={active}>
          <div className="process-stage-grid" aria-hidden="true" />
          <div className="process-stage-icon"><ActiveIcon aria-hidden="true" /></div>
          <span>Stage {active + 1} of {processItems.length}</span>
          <h3>{processItems[active].title}</h3>
          <p>{processItems[active].text}</p>
          <div className="process-progress"><i style={{ width: `${((active + 1) / processItems.length) * 100}%` }} /></div>
        </div>
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

export function ServiceDeliveryProcess({ service }: { service: Service }) {
  const [active, setActive] = useState(0);
  const Icon = service.icon;
  const step = service.process[active];
  const detail = serviceProcessDetails[active];

  function moveStep(currentIndex: number, direction: number) {
    const nextIndex = (currentIndex + direction + service.process.length) % service.process.length;
    setActive(nextIndex);
    document.getElementById(`service-step-${service.slug}-${nextIndex}`)?.focus();
  }

  return (
    <section className="section service-process-section" id="delivery-process">
      <div className="container">
        <SectionHeading
          eyebrow="Delivery approach"
          title="Visible progress at every stage"
          description={`Each ${service.shortTitle.toLowerCase()} engagement moves through visible stages, with decisions and progress kept close to the business goal.`}
          align="center"
        />
        <div className="service-process">
          <div className="service-process-tabs" role="tablist" aria-label={`${service.title} delivery stages`}>
            {service.process.map((item, index) => (
              <button
                key={item}
                id={`service-step-${service.slug}-${index}`}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-controls={`service-step-panel-${service.slug}`}
                tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                    event.preventDefault();
                    moveStep(index, 1);
                  }
                  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                    event.preventDefault();
                    moveStep(index, -1);
                  }
                  if (event.key === 'Home') {
                    event.preventDefault();
                    setActive(0);
                    document.getElementById(`service-step-${service.slug}-0`)?.focus();
                  }
                  if (event.key === 'End') {
                    event.preventDefault();
                    const last = service.process.length - 1;
                    setActive(last);
                    document.getElementById(`service-step-${service.slug}-${last}`)?.focus();
                  }
                }}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item}</strong>
              </button>
            ))}
          </div>
          <div
            className="service-process-panel"
            id={`service-step-panel-${service.slug}`}
            role="tabpanel"
            aria-labelledby={`service-step-${service.slug}-${active}`}
            key={`${service.slug}-${active}`}
          >
            <div className="service-process-copy">
              <div className="service-process-icon"><Icon aria-hidden="true" /></div>
              <p className="eyebrow">Stage {active + 1} of {service.process.length}</p>
              <span>{detail.label}</span>
              <h3>{step}</h3>
              <p>{detail.description}</p>
              <div className="service-process-status">
                <span>Progress</span>
                <strong>{Math.round(((active + 1) / service.process.length) * 100)}%</strong>
              </div>
            </div>
            <div className="service-process-visual" aria-hidden="true">
              <div className="service-process-orbit">
                <span><Icon /></span>
                {service.process.map((processStep, index) => (
                  <i key={processStep} className={index <= active ? 'complete' : ''}>
                    {index < active ? <Check /> : index + 1}
                  </i>
                ))}
              </div>
              <strong>{detail.label}</strong>
              <small>{service.shortTitle}</small>
            </div>
            <div className="service-process-progress" aria-hidden="true">
              <i style={{ transform: `scaleX(${(active + 1) / service.process.length})` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const matcherOptions = [
  { icon: CircuitBoard, label: 'Launch or rebuild a digital product', slug: 'web-development' as ServiceSlug },
  { icon: Workflow, label: 'Reduce repetitive operational work', slug: 'automation-ai' as ServiceSlug },
  { icon: BarChart3, label: 'Build a healthier sales pipeline', slug: 'lead-generation' as ServiceSlug },
  { icon: MessagesSquare, label: 'Improve campaigns and visibility', slug: 'digital-marketing' as ServiceSlug },
];

export function ServiceMatcher() {
  const [selected, setSelected] = useState<ServiceSlug>('web-development');
  const service = services.find((item) => item.slug === selected)!;

  return (
    <section className="section matcher-section">
      <div className="container matcher-grid">
        <div>
          <p className="eyebrow">Find your starting point</p>
          <h2>What are you trying to improve?</h2>
          <p>Select the closest goal. We will point you toward a useful first conversation.</p>
          <div className="matcher-options">
            {matcherOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button key={option.slug} type="button" aria-pressed={selected === option.slug} onClick={() => setSelected(option.slug)}>
                  <Icon aria-hidden="true" /><span>{option.label}</span><ChevronRight aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </div>
        <div className="matcher-result" key={selected}>
          <span>Recommended starting point</span>
          <service.icon aria-hidden="true" />
          <h3>{service.title}</h3>
          <p>{service.outcome}</p>
          <div className="button-row">
            <Link className="button button-primary" to={`/services/${service.slug}`}>View Service <ArrowRight aria-hidden="true" /></Link>
            <Link className="button button-secondary" to="/contact">Discuss Your Goal</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
