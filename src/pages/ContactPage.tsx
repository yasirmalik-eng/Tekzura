import { CalendarDays, Clock3, Mail, MapPin, Phone } from 'lucide-react';
import { PageHero, SectionHeading } from '../components/site/PageElements';
import Seo from '../components/site/Seo';
import { services, siteConfig } from '../content/site';

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact"
        description="Book a strategy call or contact Tekzura about web development, e-commerce, automation, marketing, and digital operations."
        path="/contact"
      />
      <PageHero
        eyebrow="Contact"
        title="Let’s identify the right next step."
        description="Share the goal, bottleneck, or opportunity you are working through. A short strategy call is the fastest way to see whether Tekzura is a fit."
        visual="/case-automation.jpg"
        visualAlt="Connected business automation workflows displayed on an operations dashboard"
        theme="dark"
      />
      <section className="section">
        <div className="container contact-layout">
          <div className="booking-panel">
            <p className="eyebrow eyebrow-light">Recommended</p>
            <h2>Book a strategy call</h2>
            <p>Choose a convenient time to discuss your business goal, current situation, and possible delivery path.</p>
            <a className="button button-light" href={siteConfig.calendly} target="_blank" rel="noreferrer">
              <CalendarDays aria-hidden="true" /> Open Calendly
            </a>
            <ul>
              <li>No-obligation introductory conversation</li>
              <li>Focused on the business problem, not a sales script</li>
              <li>Clear next steps when there is a fit</li>
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Direct contact" title="Prefer email or phone?" description="Use the channel that works best for you. Include a short summary of the service or outcome you need." />
            <div className="contact-list">
              <a href={`mailto:${siteConfig.email}`}><Mail aria-hidden="true" /><span><strong>Email</strong>{siteConfig.email}</span></a>
              <a href={`tel:${siteConfig.phoneHref}`}><Phone aria-hidden="true" /><span><strong>Phone</strong>{siteConfig.phone}</span></a>
              <div><MapPin aria-hidden="true" /><span><strong>Office</strong>{siteConfig.address}</span></div>
              <div><Clock3 aria-hidden="true" /><span><strong>Business Hours</strong>Monday–Friday, 9:00 AM–6:00 PM PKT</span></div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container">
          <SectionHeading eyebrow="Service inquiries" title="Start an email with the right context" align="center" />
          <div className="inquiry-grid">
            {services.map((service) => (
              <a
                key={service.slug}
                href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(`${service.title} inquiry`)}&body=${encodeURIComponent(`Hello Tekzura,\n\nI would like to discuss ${service.title.toLowerCase()}.\n\nMy goal:\n\nCurrent situation:\n\nPreferred timeline:\n`)}`}
              >
                <service.icon aria-hidden="true" /><span>{service.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
