import { createPortal } from 'react-dom';
import { PhoneCall } from 'lucide-react';
import { siteConfig } from '../../content/site';

export default function ContactFab() {
  return createPortal(
    <a
      href={siteConfig.calendly}
      className="talk-fab"
      target="_blank"
      rel="noreferrer"
      aria-label="Let's Talk — book a meeting"
    >
      <PhoneCall aria-hidden="true" />
    </a>,
    document.body,
  );
}
