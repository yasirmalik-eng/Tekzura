import type { PortfolioCategoryId, PortfolioEntry } from './portfolio';
import {
  portfolioEntries,
  portfolioStats,
} from './portfolio';
import {
  workProjects,
  workProjectStats,
  type WorkProject,
  type WorkProjectType,
} from './workProjects';

export type WorkSectionCategoryId =
  | 'digital-marketing'
  | 'web-development'
  | 'saas-products'
  | 'shopify'
  | 'wordpress'
  | 'websites';

export interface ShowcaseProject {
  id: string;
  projectName: string;
  type: string;
  websiteUrl: string;
  industry: string;
  serviceCategory: string;
}

export interface ShowcaseCategoryView {
  title: string;
  description: string;
  accent: string;
  source: 'client' | 'product' | 'merged';
}

export interface WorkSectionCategory {
  id: WorkSectionCategoryId;
  title: string;
  description: string;
  accent: string;
  clientIds: PortfolioCategoryId[];
  productTypes: WorkProjectType[];
}

export const workSectionCategories: WorkSectionCategory[] = [
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Social media, community, campaign, and brand-channel work across Facebook, Instagram, and LinkedIn.',
    accent: '#f79009',
    clientIds: ['digital-marketing'],
    productTypes: [],
  },
  {
    id: 'web-development',
    title: 'Web Development & Apps',
    description: 'Public websites, product interfaces, and web apps — client delivery plus live utility apps with real traffic.',
    accent: '#155eef',
    clientIds: ['web-development'],
    productTypes: ['Web App'],
  },
  {
    id: 'saas-products',
    title: 'SaaS Products',
    description: 'Subscription products and software platforms — delivered client SaaS plus public SaaS examples with growing traffic.',
    accent: '#7f56d9',
    clientIds: ['saas-products'],
    productTypes: ['SaaS'],
  },
  {
    id: 'shopify',
    title: 'Shopify',
    description: 'Commerce storefronts spanning consumer products, lifestyle brands, electronics, food, and wellness.',
    accent: '#0f9f8f',
    clientIds: ['shopify'],
    productTypes: [],
  },
  {
    id: 'wordpress',
    title: 'WordPress',
    description: 'Content, corporate, commerce, agency, creator, healthcare, and real-estate WordPress experiences.',
    accent: '#2e90fa',
    clientIds: ['wordpress'],
    productTypes: [],
  },
  {
    id: 'websites',
    title: 'Websites',
    description: 'Niche web platforms, directories, and tools — public-facing website examples optimized for discovery and conversion.',
    accent: '#0f9f8f',
    clientIds: [],
    productTypes: ['Website'],
  },
];

const legacyCategoryMap: Record<string, WorkSectionCategoryId> = {
  'product-web-app': 'web-development',
  'product-saas': 'saas-products',
  'product-website': 'websites',
};

export const workSectionStats = {
  total: portfolioStats.entries + workProjectStats.total,
  clientProjects: portfolioStats.entries,
  productExamples: workProjectStats.total,
  serviceAreas: workSectionCategories.length,
  industries: workProjectStats.industries,
};

function workProjectToShowcase(project: WorkProject, serviceCategory: string): ShowcaseProject {
  return {
    id: project.id,
    projectName: project.projectName,
    type: project.type,
    websiteUrl: project.websiteUrl,
    industry: project.industry,
    serviceCategory,
  };
}

function portfolioEntryToShowcase(entry: PortfolioEntry, serviceCategory: string): ShowcaseProject {
  return {
    id: entry.url,
    projectName: entry.title,
    type: entry.platform,
    websiteUrl: entry.url,
    industry: entry.subcategory || entry.platform,
    serviceCategory,
  };
}

export function resolveWorkSectionCategoryId(value: string | null): WorkSectionCategoryId {
  if (value && workSectionCategories.some((category) => category.id === value)) {
    return value as WorkSectionCategoryId;
  }
  if (value && legacyCategoryMap[value]) {
    return legacyCategoryMap[value];
  }
  return workSectionCategories[0].id;
}

export function isWorkSectionCategoryId(value: string | null): value is WorkSectionCategoryId {
  return workSectionCategories.some((category) => category.id === value);
}

export function getShowcaseCategoryView(categoryId: WorkSectionCategoryId): ShowcaseCategoryView {
  const category = workSectionCategories.find((item) => item.id === categoryId)!;
  const hasClient = category.clientIds.length > 0;
  const hasProduct = category.productTypes.length > 0;
  return {
    title: category.title,
    description: category.description,
    accent: category.accent,
    source: hasClient && hasProduct ? 'merged' : hasClient ? 'client' : 'product',
  };
}

export function getShowcaseProjects(categoryId: WorkSectionCategoryId): ShowcaseProject[] {
  const category = workSectionCategories.find((item) => item.id === categoryId)!;
  const clientProjects = category.clientIds.flatMap((clientId) =>
    portfolioEntries
      .filter((entry) => entry.category === clientId)
      .map((entry) => portfolioEntryToShowcase(entry, category.title)),
  );
  const productProjects = category.productTypes.flatMap((type) =>
    workProjects
      .filter((project) => project.type === type)
      .map((project) => workProjectToShowcase(project, category.title)),
  );

  const seen = new Set<string>();
  return [...clientProjects, ...productProjects].filter((project) => {
    const key = project.websiteUrl.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function countWorkSectionCategory(categoryId: WorkSectionCategoryId) {
  return getShowcaseProjects(categoryId).length;
}

export function getShowcaseFilters(projects: ShowcaseProject[]) {
  return ['All', ...[...new Set(projects.map((project) => project.industry))].sort()];
}

export function filterShowcaseProjects(projects: ShowcaseProject[], filter: string) {
  if (filter === 'All') return projects;
  return projects.filter((project) => project.industry === filter);
}
