import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/site/Seo';

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page Not Found" description="The requested Tekzura page could not be found." path={window.location.pathname} />
      <section className="not-found">
        <div className="container">
          <p className="eyebrow">404</p>
          <h1>This page does not exist.</h1>
          <p>The link may be outdated, or the page may have moved.</p>
          <Link className="button button-primary" to="/"><ArrowLeft aria-hidden="true" /> Return Home</Link>
        </div>
      </section>
    </>
  );
}
