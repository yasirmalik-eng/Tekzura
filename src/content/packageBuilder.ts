import { Code2, Megaphone, Palette, type LucideIcon } from 'lucide-react';
import type { ServiceSlug } from './site';

export const PACKAGE_BUILDER_PATH = '/build-package';

export interface PackageCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export interface PackageServiceItem {
  slug: ServiceSlug;
  shortTitle: string;
  description: string;
  price: number;
  priceLabel: string;
  monthly: boolean;
  popular?: boolean;
  categoryId: string;
}

export const packageCategories: PackageCategory[] = [
  { id: 'development', name: 'Development', icon: Code2, iconBg: '#eef4ff', iconColor: '#155eef' },
  { id: 'marketing', name: 'Marketing', icon: Megaphone, iconBg: '#ecfdf3', iconColor: '#067647' },
  { id: 'design-support', name: 'Design & Support', icon: Palette, iconBg: '#fff6ed', iconColor: '#b54708' },
];

export const packageServices: PackageServiceItem[] = [
  {
    slug: 'full-stack-dev',
    shortTitle: 'Full Stack Dev',
    description: 'Web apps, SaaS, APIs',
    price: 799,
    priceLabel: 'From $799',
    monthly: false,
    categoryId: 'development',
  },
  {
    slug: 'wordpress',
    shortTitle: 'WordPress Dev',
    description: 'Sites, themes, plugins',
    price: 399,
    priceLabel: 'From $399',
    monthly: false,
    popular: true,
    categoryId: 'development',
  },
  {
    slug: 'shopify',
    shortTitle: 'Shopify Dev',
    description: 'Stores, themes, apps',
    price: 499,
    priceLabel: 'From $499',
    monthly: false,
    popular: true,
    categoryId: 'development',
  },
  {
    slug: 'digital-marketing',
    shortTitle: 'Digital Marketing',
    description: 'SEO, ads, social',
    price: 199,
    priceLabel: 'From $199/mo',
    monthly: true,
    popular: true,
    categoryId: 'marketing',
  },
  {
    slug: 'youtube-automation',
    shortTitle: 'YouTube Automation',
    description: 'Full channel management',
    price: 299,
    priceLabel: 'From $299/mo',
    monthly: true,
    categoryId: 'marketing',
  },
  {
    slug: 'marketing-automation',
    shortTitle: 'Marketing Automation',
    description: 'CRM, flows, funnels',
    price: 249,
    priceLabel: 'From $249/mo',
    monthly: true,
    categoryId: 'marketing',
  },
  {
    slug: 'graphic-design',
    shortTitle: 'Graphic Design',
    description: 'Logo, brand, content',
    price: 149,
    priceLabel: 'From $149',
    monthly: false,
    popular: true,
    categoryId: 'design-support',
  },
  {
    slug: 'customer-support',
    shortTitle: 'Customer Support',
    description: 'Live chat, VA, helpdesk',
    price: 199,
    priceLabel: 'From $199/mo',
    monthly: true,
    categoryId: 'design-support',
  },
];

export const featuredBundle = {
  title: 'Shopify + Marketing bundle',
  description: 'Launch a store with SEO and paid growth from day one.',
  slugs: ['shopify', 'digital-marketing'] as ServiceSlug[],
};

export const BUNDLE_DISCOUNT_RATE = 0.15;
export const BUNDLE_MIN_SERVICES = 3;

export function getPackageService(slug: ServiceSlug) {
  return packageServices.find((item) => item.slug === slug);
}

export function getServicesByCategory(categoryId: string) {
  return packageServices.filter((item) => item.categoryId === categoryId);
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}

export interface PackageQuoteSummary {
  items: PackageServiceItem[];
  oneTimeSubtotal: number;
  monthlySubtotal: number;
  discountAmount: number;
  estimatedOneTimeTotal: number;
  hasBundleDiscount: boolean;
}

export function calculatePackageQuote(selectedSlugs: ServiceSlug[]): PackageQuoteSummary {
  const items = selectedSlugs
    .map((slug) => getPackageService(slug))
    .filter((item): item is PackageServiceItem => Boolean(item));

  const oneTimeSubtotal = items.filter((item) => !item.monthly).reduce((sum, item) => sum + item.price, 0);
  const monthlySubtotal = items.filter((item) => item.monthly).reduce((sum, item) => sum + item.price, 0);
  const hasBundleDiscount = items.length >= BUNDLE_MIN_SERVICES;
  const discountAmount = hasBundleDiscount ? Math.round(oneTimeSubtotal * BUNDLE_DISCOUNT_RATE) : 0;
  const estimatedOneTimeTotal = oneTimeSubtotal - discountAmount;

  return { items, oneTimeSubtotal, monthlySubtotal, discountAmount, estimatedOneTimeTotal, hasBundleDiscount };
}

export function buildPackageBuilderUrl(preselect?: ServiceSlug | ServiceSlug[]) {
  if (!preselect) return PACKAGE_BUILDER_PATH;
  const slugs = Array.isArray(preselect) ? preselect : [preselect];
  return `${PACKAGE_BUILDER_PATH}?services=${slugs.join(',')}`;
}
