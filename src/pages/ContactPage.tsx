import { CalendarDays, Clock3, Mail, MapPin, Phone } from 'lucide-react';
import LeadForm from '../components/site/LeadForm';
import { PageHero, SectionHeading } from '../components/site/PageElements';
import Seo from '../components/site/Seo';
import { siteConfig } from '../content/site';

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact"
        description="Book a strategy call or contact Tekzura about web development, e-commerce, automation, marketing, and digital operations."
        path="/contact"
      />
      

      <section className="section section-soft contact-form-section">
        <div className="container contact-form-shell">
          <div className="contact-form-copy">
            <SectionHeading
              eyebrow="Send a message"
              title="Tell us what you need help with."
              description="Use the form below for project questions, partnership ideas, support requests, or anything you want us to review before a call."
            />
            <div className="contact-form-note">
              <Mail aria-hidden="true" />
              <span>Every submission is emailed to <strong>{siteConfig.email}</strong> and stored securely for follow-up.</span>
            </div>
          </div>
          <LeadForm
            source="contact"
            ariaLabel="Contact Tekzura"
            submitLabel="Send Contact Request"
            successTitle="Thanks — your message has been sent."
            successMessage="We have received your message and will reply within one business day."
          />
        </div>
      </section>
      <section className="section">
        <div className="container contact-layout">
          <div className="booking-panel">
            <p className="eyebrow eyebrow-light">Recommended</p>
            <h2>Book a strategy call</h2>
            <p>Choose a time to discuss the goal, current situation, and fastest practical delivery path.</p>
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
            <SectionHeading eyebrow="Direct contact" title="Prefer email or phone?" description="Use the channel that works best and include the outcome you want to create." />
            <div className="contact-list">
              <a href={`mailto:${siteConfig.email}`}><Mail aria-hidden="true" /><span><strong>Email</strong>{siteConfig.email}</span></a>
              <a href={`tel:${siteConfig.phoneHref}`}><Phone aria-hidden="true" /><span><strong>Phone</strong>{siteConfig.phone}</span></a>
              <div><MapPin aria-hidden="true" /><span><strong>Office</strong>{siteConfig.address}</span></div>
              <div><Clock3 aria-hidden="true" /><span><strong>Business Hours</strong>Monday–Friday, 9:00 AM–6:00 PM PKT</span></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
