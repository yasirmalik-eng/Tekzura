import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CalendarDays, ChevronDown, Mail, Menu, X } from 'lucide-react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { services, siteConfig } from '../../content/site';

const navigation = [
  { label: 'About', to: '/about' },
  { label: 'Work', to: '/work' },
  { label: 'Insights', to: '/blog' },
  { label: 'Contact', to: '/contact' },
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

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle('menu-lock', menuOpen);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
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
            {navigation.slice(0, 1).map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>{item.label}</NavLink>)}
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
            {navigation.slice(1).map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <a className="button button-primary header-cta" href={siteConfig.calendly} target="_blank" rel="noreferrer">
            <CalendarDays aria-hidden="true" />
            Book a Strategy Call
          </a>
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
          <div className="container mega-menu-grid">
            <div className="mega-menu-intro">
              <p className="eyebrow">Capabilities</p>
              <h2>Build, automate, and grow with one connected team.</h2>
              <Link className="text-link" to="/services">Explore All Services <ArrowRight aria-hidden="true" /></Link>
            </div>
            <div className="mega-service-list">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Link key={service.slug} to={`/services/${service.slug}`}>
                    <Icon aria-hidden="true" />
                    <span><strong>{service.shortTitle}</strong><small>{service.eyebrow}</small></span>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
            <div className="mega-feature">
              <img src="/case-automation.jpg" alt="" width="900" height="600" />
              <div><span>Featured capability</span><strong>Automation systems that give teams time back.</strong></div>
            </div>
          </div>
        </div>
      </header>
      <div
        ref={mobileNavRef}
        id="mobile-navigation"
        className={`mobile-nav ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
        onKeyDown={trapMobileFocus}
      >
        <nav className="container" aria-label="Mobile navigation">
          <span className="mobile-nav-label">Navigate</span>
          {navigation.slice(0, 1).map((item) => <NavLink key={item.to} to={item.to}>{item.label}</NavLink>)}
          <Link to="/services">Services</Link>
          <div className="mobile-service-links">
            {services.slice(0, 4).map((service) => <Link key={service.slug} to={`/services/${service.slug}`}>{service.shortTitle}</Link>)}
          </div>
          {navigation.slice(1).map((item) => <NavLink key={item.to} to={item.to}>{item.label}</NavLink>)}
          <a href={siteConfig.calendly} target="_blank" rel="noreferrer">Book a Strategy Call</a>
        </nav>
      </div>

      <main id="main-content"><Outlet /></main>

      <section className="cta-band" aria-labelledby="cta-title">
        <div className="container cta-band-inner">
          <div>
            <p className="eyebrow eyebrow-light">Start with a focused conversation</p>
            <h2 id="cta-title">Have a digital project in mind?</h2>
            <p>Tell us what you are trying to improve. We will help identify a practical next step.</p>
          </div>
          <div className="button-row">
            <a className="button button-light" href={siteConfig.calendly} target="_blank" rel="noreferrer">
              <CalendarDays aria-hidden="true" /> Book a Call
            </a>
            <a className="button button-outline-light" href={`mailto:${siteConfig.email}`}>
              <Mail aria-hidden="true" /> Email Tekzura
            </a>
          </div>
        </div>
      </section>

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
            <Link to="/contact">Contact</Link>
          </div>
          <div>
            <h2>Services</h2>
            {services.slice(0, 5).map((service) => (
              <Link key={service.slug} to={`/services/${service.slug}`}>{service.shortTitle}</Link>
            ))}
          </div>
          <div>
            <h2>Contact</h2>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <a href={`tel:${siteConfig.phoneHref}`}>{siteConfig.phone}</a>
            <span>{siteConfig.address}</span>
            <Link className="footer-action" to="/contact">Contact Details <ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Tekzura. All rights reserved.</span>
          <span>Digital solutions built with clarity.</span>
        </div>
      </footer>
    </>
  );
}
