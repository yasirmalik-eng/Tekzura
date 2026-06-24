import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PackageBuilder from '../components/site/PackageBuilder';
import Seo from '../components/site/Seo';
import type { ServiceSlug } from '../content/site';
import { getPackageService } from '../content/packageBuilder';

function parsePreselect(value: string | null): ServiceSlug[] {
  if (!value) return [];
  return value
    .split(',')
    .map((slug) => slug.trim())
    .filter((slug): slug is ServiceSlug => Boolean(getPackageService(slug as ServiceSlug)));
}

export default function PackageBuilderPage() {
  const [params] = useSearchParams();
  const initialSelection = useMemo(
    () => parsePreselect(params.get('services')),
    [params],
  );

  return (
    <>
      <Seo
        title="Build Your Custom Package"
        description="Pick Tekzura services, get an instant estimate, and request a custom quote in minutes."
        path="/build-package"
      />
      <section className="section package-builder-page">
        <div className="container">
          <PackageBuilder initialSelection={initialSelection} />
        </div>
      </section>
    </>
  );
}
