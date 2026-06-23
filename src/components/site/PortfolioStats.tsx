import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { portfolioStats } from '../../content/portfolio';

const stats = [
  {
    value: portfolioStats.categories,
    suffix: '+',
    label: 'Years of Experience',
  },
  {
    value: portfolioStats.entries,
    suffix: '+',
    label: 'Projects',
    href: '/work',
  },
  
  {
    value: portfolioStats.testimonials,
    suffix: '+',
    label: 'Trusted Clients',
  },
  {
    value: portfolioStats.countries,
    suffix: '',
    label: 'Countries & Markets',
  },
];

const selectedBrands = [
  { name: 'GPLine', url: 'https://gpline.ie' },
  { name: 'My Next Step', url: 'https://mynextstep.jobs/' },
  { name: 'Lightning League', url: 'https://lightningleague.com/' },
  { name: 'SocialBu', url: 'https://socialbu.com/' },
  { name: 'PinCatch', url: 'https://www.pincatch.com/' },
  { name: 'SkillSprint30', url: 'https://www.skillsprint30.com/' },
  { name: 'Root Rituals', url: 'https://rootrituals.store/' },
  { name: 'Funded King', url: 'https://fundedking.com/' },
  { name: 'NextGen Migration', url: 'https://nextgenmigrationcs.com.au/' },
  { name: 'Engineered With AI', url: 'https://engineeredwith.ai/' },
];

function AnimatedNumber({
  value,
  isVisible,
  reduceMotion,
}: {
  value: number;
  isVisible: boolean;
  reduceMotion: boolean;
}) {
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    if (!isVisible) return;
    const duration = 900;
    const start = performance.now();
    let frame = 0;
    const update = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [isVisible, reduceMotion, value]);

  return <>{display}</>;
}

export default function PortfolioStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(media.matches);
    const update = () => setReduceMotion(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setIsVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <section className="portfolio-stats-section" id="portfolio-stats" aria-label="Tekzura portfolio statistics">
      <div className="container" ref={ref}>
        <div className="portfolio-stats-heading">
          
          <h2 className="section-title">Why Choose Tekzura?</h2>
          <p>This highlights our skills, experience, and quality of work, demonstrating our commitment to excellence.</p>
        </div>
        <div className="portfolio-stats-panel">
          {stats.map((stat) => {
            const content = (
              <>
                <strong><AnimatedNumber value={stat.value} isVisible={isVisible} reduceMotion={reduceMotion} />{stat.suffix}</strong>
                <span>{stat.label}</span>
                {stat.href && <small>Explore our work <ArrowUpRight aria-hidden="true" /></small>}
              </>
            );
            return stat.href
              ? <Link key={stat.label} className="portfolio-stat is-link" to={stat.href}>{content}</Link>
              : <div key={stat.label} className="portfolio-stat">{content}</div>;
          })}
        </div>
      </div>

      <div className="client-brand-rail" aria-label="Selected brands and companies">
        
        <div className="client-brand-marquee">
          {[false, true].map((duplicate) => (
            <div className="client-brand-track" aria-hidden={duplicate || undefined} key={String(duplicate)}>
              {selectedBrands.map((brand) => (
                <a
                  href={brand.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={duplicate ? -1 : undefined}
                  key={`${duplicate}-${brand.name}`}
                  translate="no"
                  aria-label={`Visit ${brand.name}`}
                >
                  {brand.name}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
