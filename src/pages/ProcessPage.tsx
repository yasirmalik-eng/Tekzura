import { CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import ConversionCTA from '../components/site/ConversionCTA';
import ProcessJourney from '../components/site/ProcessJourney';
import { PageHero } from '../components/site/PageElements';
import Seo from '../components/site/Seo';
import { siteConfig } from '../content/site';

const standards = [
  { title: 'Clear scope', text: 'Every milestone maps to a business outcome.' },
  { title: 'Visible progress', text: 'Regular reviews and staging access throughout.' },
  { title: 'One team', text: 'Strategy, design, and engineering stay connected.' },
  { title: 'Launch-ready', text: 'Documentation and handover built into delivery.' },
];

export default function ProcessPage() {
  return (
    <>
      <Seo
        title="Process"
        description="See how Tekzura delivers digital products — a clear five-stage process from discovery through launch."
        path="/process"
      />

      <PageHero
        eyebrow=""
        title="Structured delivery, from first conversation to launch."
        description="A focused five-stage approach that keeps strategy, execution, and accountability in one place."
      
        visualAlt="Tekzura team collaborating on a delivery plan"
        theme="dark"
      >
        
      </PageHero>

      <ProcessJourney />

      <section className="section section-soft process-standards-section">
        <div className="container">
          <div className="process-standards-grid">
            {standards.map((item) => (
              <article key={item.title} className="process-standard-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ConversionCTA
        eyebrow="Next step"
        title="Ready to start with clarity?"
        description="Tell us what you want to build or improve. We will map the first practical milestone."
        bullets={['Focused discovery', 'Clear milestones', 'One accountable team']}
      />
    </>
  );
}
