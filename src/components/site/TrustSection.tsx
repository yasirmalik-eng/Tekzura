import { Boxes, Handshake, Rocket, Target } from 'lucide-react';
import { SectionHeading } from './PageElements';
import { Reveal } from './InteractiveSections';

const reasons = [
  {
    icon: Boxes,
    title: 'Product-first mindset',
    text: 'We shape the roadmap around the business outcome, not a disconnected feature list.',
  },
  {
    icon: Rocket,
    title: 'Growth-driven execution',
    text: 'Every build is shaped for faster launches, measurable conversion, and a clear path to revenue.',
  },
  {
    icon: Handshake,
    title: 'Long-term partnership',
    text: 'We stay after launch to iterate, market, and scale instead of handing over and disappearing.',
  },
  {
    icon: Target,
    title: 'Business impact focus',
    text: 'Success is measured in customers, revenue, retention, and operating leverage.',
  },
];

const ownershipStages = ['Strategy', 'Design', 'Development', 'Marketing', 'Growth'];

export default function TrustSection() {
  return (
    <section className="section section-soft why-tekzura-section" aria-labelledby="why-tekzura-title">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow=""
            title="One partner for product, launch, and growth."
            description="Tekzura connects strategy, design, engineering, marketing, and iteration so every decision moves the product closer to traction."
            align="center"
          />
        </Reveal>
        <div className="value-grid">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Reveal key={reason.title} delay={Math.min(index * 70, 240)}>
                <article className="value-card">
                  <Icon aria-hidden="true" />
                  <h3>{reason.title}</h3>
                  <p>{reason.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="ownership-band">
            <div className="ownership-copy">
              <p className="eyebrow">End-to-end ownership</p>
              <h3>One team owns the handoff from idea to revenue.</h3>
              <p>Strategy, design, engineering, marketing, and growth stay connected, so momentum does not get lost between vendors.</p>
            </div>
            {/* <ol className="ownership-chain" aria-label="What Tekzura handles end to end">
              {ownershipStages.map((stage) => (
                <li key={stage}>{stage}</li>
              ))}
            </ol> */}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
