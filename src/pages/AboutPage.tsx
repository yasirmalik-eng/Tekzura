import { Compass, Handshake, Layers3, ShieldCheck } from 'lucide-react';
import { PageHero, SectionHeading } from '../components/site/PageElements';
import Seo from '../components/site/Seo';
import { siteConfig } from '../content/site';
import { CommonQuestions, TeamShowcase } from '../components/site/TeamSections';

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        description="Meet Tekzura and the cross-functional team behind our web, automation, marketing, and digital operations work."
        path="/about"
      />
      <PageHero
        eyebrow="About Tekzura"
        title="A practical technology partner for growing businesses."
        description="Tekzura brings product, engineering, automation, marketing, and support skills together to help clients move from scattered digital activity to focused execution."
        visual="/team-workshop.jpg"
        visualAlt="Tekzura team collaborating around product wireframes and a delivery roadmap"
        theme="dark"
      />

      <section className="section">
        <div className="container split-layout">
          <div>
            <SectionHeading eyebrow="Our perspective" title="Technology should make the business clearer, faster, and easier to operate." />
          </div>
          <div className="prose-large">
            <p>
              We work best with businesses that value direct communication, thoughtful decisions, and steady progress. Our role is to understand the real constraint, shape the right level of solution, and deliver work your team can continue using.
            </p>
            <p>
              From a sales website to an internal automation workflow, we apply the same principles: reduce unnecessary complexity, protect performance, and keep the user’s next step obvious.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading eyebrow="What guides us" title="Principles that shape every engagement" align="center" />
          <div className="value-grid">
            {[
              { icon: Compass, title: 'Clarity First', text: 'We define the problem and intended outcome before adding tools or features.' },
              { icon: Handshake, title: 'Shared Ownership', text: 'Clients stay close to decisions through visible priorities and regular reviews.' },
              { icon: Layers3, title: 'Built to Continue', text: 'We favor maintainable systems, reusable patterns, and useful documentation.' },
              { icon: ShieldCheck, title: 'Quality in the Details', text: 'Performance, accessibility, content, and responsive behavior are part of delivery.' },
            ].map((value) => {
              const Icon = value.icon;
              return <article className="value-card" key={value.title}><Icon aria-hidden="true" /><h3>{value.title}</h3><p>{value.text}</p></article>;
            })}
          </div>
        </div>
      </section>

      <TeamShowcase />

      <section className="section section-soft">
        <div className="container delivery-band">
          <div>
            <p className="eyebrow">Working together</p>
            <h2>Designed for remote, international collaboration</h2>
          </div>
          <p>
            Tekzura operates from {siteConfig.address} and works through scheduled communication, documented decisions, and reviewable milestones that keep distributed projects moving.
          </p>
        </div>
      </section>
      <CommonQuestions />
    </>
  );
}
