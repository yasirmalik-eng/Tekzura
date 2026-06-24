import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, CalendarDays, ChevronDown, Menu, MessageSquare, PhoneCall, Send, SlidersHorizontal, X } from 'lucide-react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { PACKAGE_BUILDER_PATH } from '../../content/packageBuilder';
import { services, siteConfig } from '../../content/site';
import Chatbot, { OPEN_CHAT_EVENT } from './Chatbot';
import ContactFab from './ContactFab';
import ServicesDropdown from './ServicesDropdown';

function openChat() {
  window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT));
}

const navigation = [
  { label: 'Home', to: '/', end: true },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Process', to: '/process' },
  { label: 'Insights', to: '/blog' },
];

function ScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function Logo() {
  return (
    <Link className="brand" to="/" aria-label="Tekzura home">
      <img className="brand-mark" src="/tekzura-mark.png" alt="" width="254" height="254" />
      <span>Tekzura</span>
    </Link>
  );
}

export default function SiteShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const hasDedicatedConversion = (
    pathname === '/about' ||
    pathname === '/process' ||
    pathname === '/work' ||
    pathname === '/blog' ||
    pathname.startsWith('/blog/') ||
    pathname === '/get-started' ||
    pathname === '/contact' ||
    pathname === '/build-package' ||
    pathname.startsWith('/services')
  );

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-lock', menuOpen);
    document.body.classList.toggle('menu-lock', menuOpen);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.documentElement.classList.remove('menu-lock');
      document.body.classList.remove('menu-lock');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const nav = mobileNavRef.current;
    const focusable = nav?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    focusable?.[0]?.focus();
  }, [menuOpen]);

  function trapMobileFocus(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Tab') return;
    const focusable = mobileNavRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <>
      <ScrollManager />
      <div className="route-progress" key={pathname} aria-hidden="true" />
      <a className="skip-link" href="#main-content">Skip to Main Content</a>
      <header className="site-header">
        <div className="container header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Primary navigation">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
            <div className="services-nav" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-controls="services-mega-menu"
                onClick={() => setServicesOpen((open) => !open)}
              >
                Services <ChevronDown aria-hidden="true" />
              </button>
            </div>
            {navigation.filter((item) => item.to !== '/').map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <button type="button" className="header-chat-link" onClick={openChat}>
            <MessageSquare aria-hidden="true" />
            Ask Tekzura AI
          </button>
          <Link className="button button-primary header-cta" to="/contact">
            <PhoneCall aria-hidden="true" />
            Talk to sales
          </Link>
          <button
            className="icon-button menu-button"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        <div
          id="services-mega-menu"
          className={`mega-menu ${servicesOpen ? 'open' : ''}`}
          onMouseEnter={() => setServicesOpen(true)}
          onMouseLeave={() => setServicesOpen(false)}
        >
          <div className="container">
            <ServicesDropdown onNavigate={() => setServicesOpen(false)} />
          </div>
        </div>
      </header>
      {createPortal(
        <div
          ref={mobileNavRef}
          id="mobile-navigation"
          className={`mobile-nav ${menuOpen ? 'open' : ''}`}
          aria-hidden={!menuOpen}
          onKeyDown={trapMobileFocus}
        >
          <nav className="container" aria-label="Mobile navigation">
            <span className="mobile-nav-label">Navigate</span>
            <NavLink to="/" end>Home</NavLink>
            <Link to="/services">Services</Link>
            <Link className="mobile-nav-package" to={PACKAGE_BUILDER_PATH}>
              <SlidersHorizontal aria-hidden="true" /> Build custom package
            </Link>
            {navigation.filter((item) => item.to !== '/').map((item) => (
              <NavLink key={item.to} to={item.to}>{item.label}</NavLink>
            ))}
            <Link className="mobile-nav-cta" to="/contact">Talk to sales</Link>
            <button type="button" className="mobile-nav-chat" onClick={openChat}>
              <MessageSquare aria-hidden="true" /> Chat with us
            </button>
          </nav>
        </div>,
        document.body,
      )}

      <main id="main-content"><Outlet /></main>

      {!hasDedicatedConversion && (
        <section className="cta-band" aria-labelledby="cta-title">
          <div className="container cta-band-inner">
            <div>
              <p className="eyebrow eyebrow-light">Start with a focused conversation</p>
              <h2 id="cta-title">Have a digital project in mind?</h2>
              <p>Tell us what you are trying to improve. We will help identify a practical next step.</p>
            </div>
            <div className="button-row">
              <Link className="button button-light" to="/get-started">
                <Send aria-hidden="true" /> Start a Project
              </Link>
              <a className="button button-outline-light" href={siteConfig.calendly} target="_blank" rel="noreferrer">
                <CalendarDays aria-hidden="true" /> Book a Call
              </a>
            </div>
          </div>
        </section>
      )}

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>{siteConfig.description}</p>
          </div>
          <div>
            <h2>Company</h2>
            <Link to="/about">About</Link>
            <Link to="/work">Work</Link>
            <Link to="/blog">Insights</Link>
            <Link to="/get-started">Get Started</Link>
            <Link to="/contact">Talk to sales</Link>
          </div>
          <div>
            <h2>Services</h2>
            {services.map((service) => (
              <Link key={service.slug} to={`/services/${service.slug}`}>{service.shortTitle}</Link>
            ))}
          </div>
          <div>
            <h2>Contact</h2>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <a href={`tel:${siteConfig.phoneHref}`}>{siteConfig.phone}</a>
            <span>{siteConfig.address}</span>
            <Link className="footer-action" to="/contact">Talk to sales <ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Tekzura. All rights reserved.</span>
          <span>Digital solutions built with clarity.</span>
        </div>
      </footer>

      <ContactFab />
      <Chatbot />
    </>
  );
}
