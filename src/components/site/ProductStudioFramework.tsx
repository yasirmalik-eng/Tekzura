import { useState } from 'react';
import {
  Code2,
  Compass,
  Gauge,
  Lightbulb,
  Megaphone,
  Palette,
  Rocket,
  TrendingUp,
  UserPlus,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SectionHeading } from './PageElements';
import { Reveal } from './InteractiveSections';

type Phase = 'Foundation' | 'Build' | 'Launch' | 'Growth' | 'Scale';

const phaseColor: Record<Phase, string> = {
  Foundation: '#2e90fa',
  Build:      '#15b8a6',
  Launch:     '#9b8afb',
  Growth:     '#fdb022',
  Scale:      '#17b26a',
};

const PHASES = Object.keys(phaseColor) as Phase[];

const steps: { phase: Phase; title: string; text: string; icon: LucideIcon }[] = [
  { phase: 'Foundation', icon: Lightbulb,  title: 'Idea Validation',  text: 'We pressure-test your idea against the market and business model before any code is written — so you build something people actually want.' },
  { phase: 'Foundation', icon: Compass,    title: 'Product Strategy', text: 'We define the positioning, core value, and a roadmap that sequences the fastest path to a usable, fundable product.' },
  { phase: 'Build',      icon: Palette,    title: 'UI/UX Design',     text: 'We design intuitive, conversion-aware interfaces that make the product feel effortless and trustworthy from the first screen.' },
  { phase: 'Build',      icon: Code2,      title: 'Development',      text: 'We engineer scalable, secure software — frontend, backend, APIs, and billing — built to grow with your users.' },
  { phase: 'Launch',     icon: Rocket,     title: 'Launch',           text: 'We ship to market with the infrastructure, analytics, and quality checks to measure traction from day one.' },
  { phase: 'Growth',     icon: Megaphone,  title: 'Marketing',        text: 'We turn launch into momentum with SEO, content, and paid campaigns that put the product in front of the right people.' },
  { phase: 'Growth',     icon: UserPlus,   title: 'User Acquisition', text: 'We build funnels, landing pages, and lead systems that convert attention into signups and customers.' },
  { phase: 'Scale',      icon: Gauge,      title: 'Optimization',     text: 'We use real usage and conversion data to improve onboarding, retention, and revenue — compounding results over time.' },
  { phase: 'Scale',      icon: TrendingUp, title: 'Scaling',          text: 'We strengthen architecture, automation, and growth systems so the product scales users and revenue without breaking.' },
];

export default function ProductStudioFramework({
  eyebrow = '',
  title = 'Our Proven Approach to Achieve Your Objectives',
  description = 'Achieve your business goals with our successful Tekzura Methodology, renowned for its structured planning and consistent results.',
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  const [active, setActive] = useState(0);
  const activeStep = steps[active];
  const ActiveIcon = activeStep.icon;
  const nc = (idx: number) => phaseColor[steps[idx].phase];

  const renderNode = (idx: number) => {
    const step = steps[idx];
    const Icon = step.icon;
    return (
      <button
        key={`n${idx}`}
        className={`psf-node${active === idx ? ' is-active' : ''}`}
        style={{ '--nc': nc(idx) } as React.CSSProperties}
        onClick={() => setActive(idx)}
        aria-pressed={active === idx}
        aria-label={`Stage ${idx + 1}: ${step.title}`}
      >
        <span className="psf-num">{String(idx + 1).padStart(2, '0')}</span>
        <span className="psf-icon"><Icon aria-hidden="true" /></span>
        <strong>{step.title}</strong>
        <small>{step.phase}</small>
      </button>
    );
  };

  // delayMs is a negative offset so continuously-looping dots appear staggered,
  // creating the illusion of one pulse travelling through the entire path.
  const renderHConn = (fromIdx: number, reversed = false, delayMs = 0) => (
    <span
      key={`hc${fromIdx}`}
      className={`psf-hconn${reversed ? ' psf-hconn-rev' : ''}`}
      style={{ '--nc': nc(fromIdx), '--dot-delay': `${delayMs}ms` } as React.CSSProperties}
      aria-hidden="true"
    >
      <i className="psf-dot" />
      <b className="psf-arrow" />
    </span>
  );

  const renderVConn = (fromIdx: number, delayMs = 0) => (
    <span
      key={`vc${fromIdx}`}
      className="psf-vconn"
      style={{ '--nc': nc(fromIdx), '--dot-delay': `${delayMs}ms` } as React.CSSProperties}
      aria-hidden="true"
    >
      <i className="psf-dot psf-dot-v" />
    </span>
  );

  const renderMobileStep = (idx: number) => {
    const step = steps[idx];
    const Icon = step.icon;
    const isLast = idx === steps.length - 1;

    return (
      <button
        key={`mobile-${idx}`}
        type="button"
        className={`psf-mobile-step${active === idx ? ' is-active' : ''}`}
        style={{ '--nc': nc(idx) } as React.CSSProperties}
        onClick={() => setActive(idx)}
        aria-pressed={active === idx}
        aria-label={`Stage ${idx + 1}: ${step.title}`}
      >
        <span className="psf-mobile-track" aria-hidden="true">
          <span className="psf-mobile-dot">{String(idx + 1).padStart(2, '0')}</span>
          {!isLast && <span className="psf-mobile-line" />}
        </span>
        <span className="psf-mobile-body">
          <span className="psf-mobile-icon"><Icon aria-hidden="true" /></span>
          <span className="psf-mobile-copy">
            <strong>{step.title}</strong>
            <small>{step.phase}</small>
          </span>
        </span>
      </button>
    );
  };

  return (
    <section className="section product-studio-section" id="product-studio" aria-label="The Tekzura Product Studio — nine-stage framework">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
          />
          <div className="psf-legend" aria-label="Phase colour legend">
            {PHASES.map((phase) => (
              <span
                key={phase}
                className="psf-legend-chip"
                style={{ '--nc': phaseColor[phase] } as React.CSSProperties}
              >
                <i />{phase}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="psf-mobile" role="list" aria-label="Product studio stages">
            {steps.map((_, idx) => renderMobileStep(idx))}
          </div>

          {/* psf-scroll-wrap keeps the snake intact on desktop/tablet */}
          <div className="psf-scroll-wrap" role="region" aria-label="Product studio flow diagram — scroll to explore">
            <div
              className="psf-canvas"
              style={{ '--psf-node-w': '158px' } as React.CSSProperties}
            >
              {/* Row 1 ▶  01 → 02 → 03 */}
              <div className="psf-row">
                {renderNode(0)}
                {renderHConn(0, false, 0)}
                {renderNode(1)}
                {renderHConn(1, false, -300)}
                {renderNode(2)}
              </div>

              {/* Right bend: 03 ↓ 04 */}
              <div className="psf-between psf-between-right">
                {renderVConn(2, -600)}
              </div>

              {/*
               * Row 2 ◀  data flows 04 → 05 → 06
               * flex-direction: row-reverse means the first DOM element (step[3] = 04)
               * appears RIGHTMOST — directly below node 03, where the bend lands.
               * step[5] (06) appears LEFTMOST — where the left bend starts.
               */}
              <div className="psf-row psf-row-rev">
                {renderNode(3)}
                {renderHConn(3, true, -900)}
                {renderNode(4)}
                {renderHConn(4, true, -1200)}
                {renderNode(5)}
              </div>

              {/* Left bend: 06 ↓ 07 */}
              <div className="psf-between psf-between-left">
                {renderVConn(5, -1500)}
              </div>

              {/* Row 3 ▶  07 → 08 → 09 */}
              <div className="psf-row">
                {renderNode(6)}
                {renderHConn(6, false, -1800)}
                {renderNode(7)}
                {renderHConn(7, false, -2100)}
                {renderNode(8)}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Detail panel — updates on node click */}
        <div
          className="psf-detail"
          key={active}
          style={{ '--nc': nc(active) } as React.CSSProperties}
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="psf-detail-icon"><ActiveIcon aria-hidden="true" /></span>
          <div className="psf-detail-body">
            <div className="psf-detail-meta">
              <span className="psf-detail-badge">{activeStep.phase}</span>
              Stage {active + 1} of 9
            </div>
            <h3>{activeStep.title}</h3>
            <p>{activeStep.text}</p>
          </div>
          <div
            className="psf-detail-bar"
            role="progressbar"
            aria-label="Framework progress"
            aria-valuenow={active + 1}
            aria-valuemin={1}
            aria-valuemax={9}
          >
            <i style={{ width: `${((active + 1) / 9) * 100}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
