import { ArrowRight, CheckCircle2, Linkedin, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { team, type TeamMember } from '../../content/site';
import { SectionHeading } from './PageElements';
import { Reveal } from './InteractiveSections';

const teamGroups: NonNullable<TeamMember['group']>[] = [
  'Leadership',
  'Engineering & Product',
  'Growth & Creative',
  'Operations & Client Success',
];

function TeamPortrait({ member }: { member: TeamMember }) {
  if (member.image) {
    return (
      <img
        src={member.image}
        alt={`${member.name}, ${member.role} at Tekzura`}
        width={member.width}
        height={member.height}
        loading="lazy"
      />
    );
  }

  const icon = member.gender === 'female' ? '/team/profile-female.svg' : '/team/profile-male.svg';
  return (
    <div className={`team-photo-fallback is-${member.gender || 'male'}`} aria-label={`${member.name} profile placeholder`}>
      <img src={icon} alt="" width="720" height="840" loading="lazy" aria-hidden="true" />
    </div>
  );
}

interface TeamShowcaseProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'about';
}

function TeamMemberCard({ member, about }: { member: TeamMember; about?: boolean }) {
  if (about) {
    return (
      <article className="team-profile is-about">
        <div className="team-photo team-photo-md">
          <TeamPortrait member={member} />
        </div>
        <div className="team-profile-copy">
          <h3>{member.name}</h3>
          <p className="team-role">{member.role}</p>
          {member.linkedinUrl && (
            <a
              className="team-linkedin-sm"
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${member.name} on LinkedIn`}
            >
              <Linkedin aria-hidden="true" />
            </a>
          )}
        </div>
      </article>
    );
  }

  return (
    <article className="team-profile">
      <div className="team-photo">
        <TeamPortrait member={member} />
      </div>
      <div className="team-profile-copy">
        <p className="team-role">{member.role}</p>
        <h3>{member.name}</h3>
        <p>{member.bio}</p>
        {member.linkedinUrl && (
          <a
            className="team-linkedin"
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${member.name} on LinkedIn`}
          >
            <Linkedin aria-hidden="true" /> View LinkedIn
          </a>
        )}
      </div>
    </article>
  );
}

export function TeamShowcase({
  eyebrow = 'Meet the team',
  title = 'Specialists who work as one delivery team',
  description = 'Strategy, engineering, automation, growth, content, and support stay connected from the first conversation through launch.',
  variant = 'default',
}: TeamShowcaseProps) {
  const isAbout = variant === 'about';

  return (
    <section className={`section team-section${isAbout ? ' team-section-about' : ''}`}>
      <div className="container">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          align={isAbout ? 'center' : 'left'}
        />
        <div className={`team-groups${isAbout ? ' team-groups-about' : ''}`}>
          {isAbout ? (
            <div className="team-gallery team-gallery-about">
              {team.map((member, index) => (
                <Reveal key={member.name} delay={Math.min(index * 35, 210)}>
                  <TeamMemberCard member={member} about />
                </Reveal>
              ))}
            </div>
          ) : (
            teamGroups.map((group) => {
              const members = team.filter((member) => member.group === group);
              if (!members.length) return null;

              return (
                <section className="team-group" key={group} aria-labelledby={`team-group-${group.replace(/\W+/g, '-').toLowerCase()}`}>
                  <div className="team-group-heading">
                    <h3 id={`team-group-${group.replace(/\W+/g, '-').toLowerCase()}`}>{group}</h3>
                    <span>{members.length} {members.length === 1 ? 'member' : 'members'}</span>
                  </div>
                  <div className="team-gallery">
                    {members.map((member, index) => (
                      <Reveal key={member.name} delay={Math.min(index * 60, 240)}>
                        <TeamMemberCard member={member} />
                      </Reveal>
                    ))}
                  </div>
                </section>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

export function FounderSpotlight() {
  const founder = team[0];

  return (
    <section className="section founder-section" id="founder">
      <div className="container founder-layout">
        <div className="founder-portrait">
          <img
            src={founder.image}
            alt={`${founder.name}, ${founder.role} at Tekzura`}
            width={founder.width}
            height={founder.height}
            loading="lazy"
          />
          <div className="founder-caption">
            <span>{founder.role}</span>
            <strong>{founder.name}</strong>
          </div>
        </div>
        <div className="founder-copy">
          <p className="eyebrow">Founder-led delivery</p>
          <h2>Built around clear thinking, dependable execution, and lasting client relationships.</h2>
          <blockquote>
            <p>&ldquo;Tekzura exists to make ambitious digital work feel practical: understand the real problem, bring the right people together, and keep delivery transparent from start to finish.&rdquo;</p>
          </blockquote>
          <p>
            Muhammad Yasir leads Tekzura&rsquo;s strategy and client partnerships, connecting business goals with focused product, engineering, automation, and growth delivery.
          </p>
          <Link className="text-link" to="/about">
            Read Our Story <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: 'How quickly can a project start?',
    answer: 'After a focused discovery call, we confirm the scope, delivery team, milestones, and earliest practical start date.',
  },
  {
    question: 'Can Tekzura work with our existing team and systems?',
    answer: 'Yes. We can own a defined workstream or collaborate with internal product, marketing, and operations teams using your existing tools.',
  },
  {
    question: 'How do you keep delivery transparent?',
    answer: 'You receive visible priorities, reviewable milestones, regular progress updates, and clear decisions before major implementation work moves forward.',
  },
  {
    question: 'What happens after launch?',
    answer: 'We provide handover guidance and can continue through maintenance, optimization, campaign support, or the next prioritized product phase.',
  },
];

export function CommonQuestions() {
  return (
    <section className="section faq-section">
      <div className="container faq-layout">
        <div className="faq-intro">

          <SectionHeading
            eyebrow=""
            title="Clear answers before the work begins"
            description="A good engagement starts with shared expectations. These are the questions clients most often ask during early conversations."
          />
          <ul className="faq-assurances">
            <li><CheckCircle2 aria-hidden="true" /> Defined milestones</li>
            <li><CheckCircle2 aria-hidden="true" /> Direct communication</li>
            <li><CheckCircle2 aria-hidden="true" /> Practical handover</li>
          </ul>
        </div>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary><span>{item.question}</span><i aria-hidden="true" /></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
