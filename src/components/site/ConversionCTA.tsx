import { ArrowRight, CalendarDays, CheckCircle2, MessageSquare, Send } from 'lucide-react';
import { useId } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../content/site';
import { OPEN_CHAT_EVENT } from './Chatbot';

interface ConversionCTAProps {
  eyebrow?: string;
  title: string;
  description: string;
  bullets?: string[];
  tone?: 'dark';
}

function openChat() {
  window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT));
}

export default function ConversionCTA({
  eyebrow = 'Next step',
  title,
  description,
  bullets = ['Focused strategy', 'Clear scope', 'Practical roadmap'],
  tone = 'dark',
}: ConversionCTAProps) {
  const titleId = useId();

  return (
    <section className={`section conversion-cta-section conversion-cta-${tone}`} aria-labelledby={titleId}>
      <div className="container">
        <div className="conversion-cta-card">
          <div className="conversion-cta-copy">
            <p className="eyebrow">{eyebrow}</p>
            <h2 id={titleId}>{title}</h2>
            <p>{description}</p>
            <ul className="conversion-cta-points" aria-label="What you get">
              {bullets.map((item) => (
                <li key={item}>
                  <CheckCircle2 aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="conversion-cta-actions" aria-label="Project inquiry actions">
            <Link className="button button-primary" to="/get-started">
              <Send aria-hidden="true" /> Start a Project
            </Link>
            <a className="button button-secondary" href={siteConfig.calendly} target="_blank" rel="noreferrer">
              <CalendarDays aria-hidden="true" /> Book a Call
            </a>
            <button type="button" className="conversion-chat-button" onClick={openChat}>
              <MessageSquare aria-hidden="true" />
              Ask the Assistant
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
