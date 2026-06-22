import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SiteShell from './components/site/SiteShell';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const GetStartedPage = lazy(() => import('./pages/GetStartedPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite" aria-label="Loading Tekzura">
      <div className="loader-simple">
        <div className="loader-mark" aria-hidden="true">
          <i /><i />
          <img src="/tekzura-mark.png" alt="" width="52" height="52" />
        </div>
        <div className="loader-copy">
          <strong>Tekzura</strong>
          <span>Preparing your experience</span>
        </div>
        <div className="loader-progress" aria-hidden="true"><i /></div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<SiteShell />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/:serviceSlug" element={<ServiceDetailPage />} />
            <Route path="work" element={<WorkPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<CaseStudyDetailPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="get-started" element={<GetStartedPage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
