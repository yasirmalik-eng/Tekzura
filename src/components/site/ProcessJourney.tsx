import { useState } from 'react';
import {
  Compass,
  Hammer,
  Rocket,
  Search,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { SectionHeading } from './PageElements';

type Stage = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  outputs: string[];
  icon: LucideIcon;
};

const stages: Stage[] = [
  {
    id: 'discover',
    title: 'Discover',
    summary: 'Align on the goal before anything is built.',
    detail: 'We clarify the business case, audience, constraints, and what success looks like — so scope stays tied to outcomes.',
    outputs: ['Discovery brief', 'Success metrics', 'Delivery roadmap'],
    icon: Search,
  },
  {
    id: 'design',
    title: 'Design',
    summary: 'Shape the experience and delivery plan.',
    detail: 'We define structure, UX direction, and technical approach — sequenced into milestones you can review and approve.',
    outputs: ['UX direction', 'Technical plan', 'Milestone schedule'],
    icon: Compass,
  },
  {
    id: 'build',
    title: 'Build',
    summary: 'Ship visible progress at every milestone.',
    detail: 'We develop in focused sprints, share staging builds, and resolve decisions while feedback is still useful.',
    outputs: ['Sprint deliveries', 'Staging access', 'Progress reviews'],
    icon: Hammer,
  },
  {
    id: 'validate',
    title: 'Validate',
    summary: 'Confirm quality before launch.',
    detail: 'We test usability, performance, integrations, and readiness against the goals set at the start.',
    outputs: ['QA sign-off', 'Performance check', 'Launch checklist'],
    icon: ShieldCheck,
  },
  {
    id: 'launch',
    title: 'Launch',
    summary: 'Go live with a clear handover.',
    detail: 'We deploy, document the system, and outline the next practical improvement based on real usage.',
    outputs: ['Production release', 'Documentation', 'Post-launch plan'],
    icon: Rocket,
  },
];

export default function ProcessJourney() {
  const [active, setActive] = useState(0);
  const stage = stages[active];
  const StageIcon = stage.icon;

  function selectStage(index: number) {
    setActive(index);
  }

  function onStepKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      selectStage((index + 1) % stages.length);
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      selectStage((index - 1 + stages.length) % stages.length);
    }
    if (event.key === 'Home') {
      event.preventDefault();
      selectStage(0);
    }
    if (event.key === 'End') {
      event.preventDefault();
      selectStage(stages.length - 1);
    }
  }

  return (
    <section className="section process-journey-section" aria-labelledby="process-journey-title">
      <div className="container">
        <SectionHeading
          eyebrow="How we work"
          title="Five stages from brief to launch"
          description="Select a stage to see what happens and what you receive."
          align="center"
        />

        <div className="process-journey">
          <div
            className="process-journey-steps"
            role="tablist"
            aria-label="Delivery stages"
            aria-orientation="vertical"
          >
            {stages.map((item, index) => {
              const Icon = item.icon;
              const isActive = active === index;
              const isComplete = index < active;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`process-step-${item.id}`}
                  aria-selected={isActive}
                  aria-controls="process-journey-panel"
                  tabIndex={isActive ? 0 : -1}
                  className={`process-journey-step${isActive ? ' is-active' : ''}${isComplete ? ' is-complete' : ''}`}
                  onClick={() => selectStage(index)}
                  onKeyDown={(e) => onStepKeyDown(e, index)}
                >
                  <span className="process-journey-marker" aria-hidden="true">
                    <i className="process-journey-line" />
                    <span className="process-journey-dot">{String(index + 1).padStart(2, '0')}</span>
                  </span>
                  <span className="process-journey-step-body">
                    <span className="process-journey-step-icon"><Icon aria-hidden="true" /></span>
                    <span className="process-journey-step-copy">
                      <strong>{item.title}</strong>
                      <small>{item.summary}</small>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="process-journey-panel"
            className="process-journey-panel"
            role="tabpanel"
            aria-labelledby={`process-step-${stage.id}`}
            key={stage.id}
          >
            <div className="process-journey-panel-head">
              <span className="process-journey-panel-icon"><StageIcon aria-hidden="true" /></span>
              <div>
                <p className="process-journey-phase">Stage {active + 1} of {stages.length}</p>
                <h3 id="process-journey-title">{stage.title}</h3>
              </div>
            </div>
            <p className="process-journey-detail">{stage.detail}</p>
            <div className="process-journey-outputs">
              <span>Key outputs</span>
              <ul>
                {stage.outputs.map((output) => <li key={output}>{output}</li>)}
              </ul>
            </div>
            <div
              className="process-journey-progress"
              role="progressbar"
              aria-label="Delivery progress"
              aria-valuenow={active + 1}
              aria-valuemin={1}
              aria-valuemax={stages.length}
            >
              <i style={{ width: `${((active + 1) / stages.length) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
