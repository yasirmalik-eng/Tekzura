import { useState } from 'react';
import { ArrowRight, Package, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  buildPackageBuilderUrl,
  featuredBundle,
  getServicesByCategory,
  packageCategories,
  PACKAGE_BUILDER_PATH,
} from '../../content/packageBuilder';
import { services, type ServiceSlug } from '../../content/site';

interface ServicesDropdownProps {
  onNavigate?: () => void;
}

export default function ServicesDropdown({ onNavigate }: ServicesDropdownProps) {
  const [activeCategory, setActiveCategory] = useState(packageCategories[0].id);
  const activeMeta = packageCategories.find((category) => category.id === activeCategory) ?? packageCategories[0];
  const categoryServices = getServicesByCategory(activeCategory);

  function getServiceMeta(slug: ServiceSlug) {
    return services.find((service) => service.slug === slug);
  }

  return (
    <div className="services-dropdown">
      <div className="services-dropdown-top">
        <div className="services-dropdown-left">
          <p className="services-dropdown-label">Categories</p>
          <div className="services-dropdown-cats" role="tablist" aria-label="Service categories">
            {packageCategories.map((category) => {
              const Icon = category.icon;
              const count = getServicesByCategory(category.id).length;
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`services-dropdown-cat ${isActive ? 'active' : ''}`}
                  onMouseEnter={() => setActiveCategory(category.id)}
                  onFocus={() => setActiveCategory(category.id)}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span className="services-dropdown-cat-icon" style={{ background: category.iconBg, color: category.iconColor }}>
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="services-dropdown-cat-name">{category.name}</span>
                  <span className="services-dropdown-cat-count">{count} services</span>
                </button>
              );
            })}
          </div>

          <div className="services-dropdown-featured">
            <p className="services-dropdown-featured-label"><Sparkles aria-hidden="true" /> Most popular</p>
            <p className="services-dropdown-featured-copy">{featuredBundle.title}</p>
            <p className="services-dropdown-featured-desc">{featuredBundle.description}</p>
            <Link className="services-dropdown-featured-link" to={buildPackageBuilderUrl(featuredBundle.slugs)} onClick={onNavigate}>
              View bundle <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="services-dropdown-right" role="tabpanel" aria-label={`${activeMeta.name} services`}>
          <p className="services-dropdown-label">{activeMeta.name}</p>
          <div className="services-dropdown-grid">
            {categoryServices.map((item) => {
              const meta = getServiceMeta(item.slug);
              const Icon = meta?.icon ?? activeMeta.icon;
              return (
                <Link
                  key={item.slug}
                  className="services-dropdown-card"
                  to={`/services/${item.slug}`}
                  onClick={onNavigate}
                >
                  <div className="services-dropdown-card-top">
                    <span className="services-dropdown-card-icon" style={{ background: activeMeta.iconBg, color: activeMeta.iconColor }}>
                      <Icon aria-hidden="true" />
                    </span>
                    <strong>{item.shortTitle}</strong>
                  </div>
                  <p>{item.description}</p>
                  <span className="services-dropdown-card-link">Learn more <ArrowRight aria-hidden="true" /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="services-dropdown-bottom">
        <div className="services-dropdown-bottom-copy">
          <Package aria-hidden="true" />
          <p>
            Not sure what you need? <strong>Build a custom package</strong> — pick and mix any services.
          </p>
        </div>
        <Link className="button button-primary services-dropdown-cta" to={PACKAGE_BUILDER_PATH} onClick={onNavigate}>
          <SlidersHorizontal aria-hidden="true" /> Build package
        </Link>
      </div>
    </div>
  );
}
