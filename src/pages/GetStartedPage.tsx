import { CalendarDays, Clock4, MessageSquare, ShieldCheck } from 'lucide-react';
import { PageHero, SectionHeading } from '../components/site/PageElements';
import Seo from '../components/site/Seo';
import LeadForm from '../components/site/LeadForm';
import { Reveal } from '../components/site/InteractiveSections';
import { siteConfig } from '../content/site';

const nextSteps = [
  { icon: MessageSquare, title: 'We review your request', text: 'A real person reads your details and maps them to the right approach — no generic auto-reply.' },
  { icon: CalendarDays, title: 'We schedule a strategy call', text: 'A focused conversation about your goal, current situation, and the fastest path to results.' },
  { icon: ShieldCheck, title: 'You get a clear proposal', text: 'Scope, timeline, and pricing laid out plainly so you can decide with confidence.' },
];

export default function GetStartedPage() {
  return (
    <>
      <Seo
        title="Get Started"
        description="Start your project with Tekzura. Tell us what you are building and we will map the fastest path from idea to launch and growth."
        path="/get-started"
      />
      <PageHero
        eyebrow="Get started"
        title="Start with a clear next step."
        description="Tell us what you want to launch, fix, or grow. We will respond with a practical direction within one business day."
        theme="dark"
      />

      <section className="section">
        <div className="container get-started-layout">
          <div className="get-started-form-wrap">
            <Reveal>
              <SectionHeading
                eyebrow="Project request"
                title="Tell us the goal"
                description="A few useful details help us recommend the right first move."
              />
            </Reveal>
            <Reveal>
              <LeadForm />
            </Reveal>
          </div>

          <aside className="get-started-aside" aria-label="What happens next">
            <Reveal>
              <div className="get-started-steps">
                <p className="eyebrow">What happens next</p>
                <ol>
                  {nextSteps.map((step) => {
                    const Icon = step.icon;
                    return (
                      <li key={step.title}>
                        <span className="get-started-step-icon" aria-hidden="true"><Icon /></span>
                        <div>
                          <strong>{step.title}</strong>
                          <p>{step.text}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </Reveal>

            <Reveal>
              <div className="get-started-callout">
                <Clock4 aria-hidden="true" />
                <div>
                  <strong>Prefer to talk first?</strong>
                  <p>Book a no-obligation strategy call and we will jump straight into your goal.</p>
                  <a className="text-link" href={siteConfig.calendly} target="_blank" rel="noreferrer">
                    Book a Strategy Call
                  </a>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
