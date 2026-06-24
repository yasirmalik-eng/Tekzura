import { SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buildPackageBuilderUrl, PACKAGE_BUILDER_PATH } from '../../content/packageBuilder';
import type { ServiceSlug } from '../../content/site';

interface PackageBuilderButtonProps {
  preselect?: ServiceSlug | ServiceSlug[];
  className?: string;
  label?: string;
  variant?: 'primary' | 'secondary' | 'text';
}

export default function PackageBuilderButton({
  preselect,
  className = '',
  label = 'Build custom package',
  variant = 'secondary',
}: PackageBuilderButtonProps) {
  const to = preselect ? buildPackageBuilderUrl(preselect) : PACKAGE_BUILDER_PATH;
  const classes = ['package-builder-button', `package-builder-button-${variant}`, className].filter(Boolean).join(' ');

  return (
    <Link className={classes} to={to}>
      <SlidersHorizontal aria-hidden="true" />
      {label}
    </Link>
  );
}
