import {
  Bot,
  Braces,
  ChartNoAxesCombined,
  Database,
  Globe2,
  Megaphone,
  ShoppingBag,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type ServiceSlug =
  | 'web-development'
  | 'ecommerce'
  | 'digital-marketing'
  | 'wordpress'
  | 'automation-ai'
  | 'lead-generation'
  | 'data-entry';

export interface Service {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  eyebrow: string;
  summary: string;
  problem: string;
  outcome: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  deliverables: string[];
  technologies: string[];
  process: string[];
  faq: { question: string; answer: string }[];
}

export interface CaseStudy {
  title: string;
  industry: string;
  service: ServiceSlug;
  challenge: string;
  solution: string;
  outcome: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  width: number;
  height: number;
  bio: string;
}

export interface Testimonial {
  quote: string;
  attribution: string;
}

export interface BlogPost {
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
}

export const siteConfig = {
  name: 'Tekzura',
  email: 'info@tekzura.com',
  phone: '+92 326 9379244',
  phoneHref: '+923269379244',
  address: 'Bahawalpur, Pakistan',
  calendly: 'https://calendly.com/yasirmalik2182/new-meeting',
  description:
    'Tekzura builds high-performing websites, e-commerce experiences, automation systems, and growth programs for ambitious businesses.',
};

const sharedFaq = [
  {
    question: 'How does a project begin?',
    answer:
      'We start with a focused discovery call, confirm goals and constraints, then provide a practical scope with milestones.',
  },
  {
    question: 'Can you work with an existing product or team?',
    answer:
      'Yes. We can improve an existing platform, deliver a defined workstream, or collaborate with your internal team.',
  },
  {
    question: 'How do you keep delivery transparent?',
    answer:
      'Projects use clear milestones, regular progress updates, shared priorities, and review points before major releases.',
  },
];

export const services: Service[] = [
  {
    slug: 'web-development',
    title: 'Web Development',
    shortTitle: 'Web Development',
    eyebrow: 'Fast, scalable digital products',
    summary:
      'Responsive websites and web applications designed around usability, performance, and measurable business goals.',
    problem:
      'Slow, difficult-to-maintain websites lose trust, weaken search visibility, and make every campaign less effective.',
    outcome:
      'A dependable web experience that is easy to use, straightforward to maintain, and ready to grow with your business.',
    icon: Braces,
    image: '/service-web-development.jpg',
    imageAlt: 'Product engineering team reviewing a responsive web application across desktop and mobile screens',
    deliverables: ['Product discovery', 'UX and interface design', 'Frontend and backend development', 'Quality assurance', 'Deployment support'],
    technologies: ['React', 'TypeScript', 'Node.js', 'WordPress', 'Cloud platforms'],
    process: ['Discover', 'Design', 'Build', 'Validate', 'Launch'],
    faq: sharedFaq,
  },
  {
    slug: 'ecommerce',
    title: 'E-Commerce Solutions',
    shortTitle: 'E-Commerce',
    eyebrow: 'Turn product interest into revenue',
    summary:
      'Conversion-minded storefronts with clear merchandising, smooth checkout flows, and reliable integrations.',
    problem:
      'Complex navigation, slow product pages, and checkout friction cause customers to abandon purchases.',
    outcome:
      'A faster shopping experience that makes products easier to discover and purchasing easier to complete.',
    icon: ShoppingBag,
    image: '/case-ecommerce.jpg',
    imageAlt: 'Modern e-commerce storefront displayed across laptop and mobile screens',
    deliverables: ['Store strategy', 'Catalog and navigation design', 'Storefront development', 'Payments and integrations', 'Analytics setup'],
    technologies: ['Shopify', 'WooCommerce', 'Stripe', 'React', 'Analytics'],
    process: ['Audit', 'Plan', 'Design', 'Integrate', 'Optimize'],
    faq: sharedFaq,
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    shortTitle: 'Digital Marketing',
    eyebrow: 'Focused campaigns, clearer decisions',
    summary:
      'Search, content, and paid campaigns built around relevant audiences and useful performance reporting.',
    problem:
      'Disconnected campaigns and unclear reporting make it difficult to know what is working or where to invest.',
    outcome:
      'A coordinated growth program with clear priorities, consistent execution, and practical reporting.',
    icon: Megaphone,
    image: '/service-growth.jpg',
    imageAlt: 'Growth strategists reviewing a campaign funnel and performance dashboard',
    deliverables: ['Channel strategy', 'Campaign planning', 'Content direction', 'SEO and paid media', 'Performance reporting'],
    technologies: ['Google Ads', 'Meta Ads', 'GA4', 'Search Console', 'CRM tools'],
    process: ['Research', 'Position', 'Launch', 'Measure', 'Improve'],
    faq: sharedFaq,
  },
  {
    slug: 'wordpress',
    title: 'WordPress Development',
    shortTitle: 'WordPress',
    eyebrow: 'Flexible publishing without the clutter',
    summary:
      'Custom WordPress websites that give teams practical editing tools without compromising performance.',
    problem:
      'Template-heavy WordPress builds often become slow, insecure, and frustrating for content teams.',
    outcome:
      'A tailored, maintainable website with a clear editing experience and disciplined plugin use.',
    icon: Globe2,
    image: '/service-web-development.jpg',
    imageAlt: 'Development team reviewing a maintainable publishing interface and responsive website',
    deliverables: ['Content architecture', 'Custom theme development', 'Block editor setup', 'Plugin integration', 'Performance hardening'],
    technologies: ['WordPress', 'WooCommerce', 'PHP', 'ACF', 'Cloudflare'],
    process: ['Structure', 'Prototype', 'Develop', 'Migrate', 'Train'],
    faq: sharedFaq,
  },
  {
    slug: 'automation-ai',
    title: 'Automation & AI',
    shortTitle: 'Automation & AI',
    eyebrow: 'Remove repetitive work',
    summary:
      'Practical automation and AI workflows that reduce manual tasks, connect systems, and support faster decisions.',
    problem:
      'Repeated data entry and fragmented tools consume time that should be spent serving customers and growing the business.',
    outcome:
      'Reliable workflows that reduce handoffs, improve consistency, and give teams more time for valuable work.',
    icon: Bot,
    image: '/case-automation.jpg',
    imageAlt: 'Automation operations dashboard showing connected workflows and business systems',
    deliverables: ['Workflow audit', 'Automation design', 'AI-assisted tools', 'System integrations', 'Monitoring and handover'],
    technologies: ['Python', 'OpenAI APIs', 'Zapier', 'Make', 'CRM platforms'],
    process: ['Map', 'Prioritize', 'Prototype', 'Integrate', 'Monitor'],
    faq: sharedFaq,
  },
  {
    slug: 'lead-generation',
    title: 'Lead Generation',
    shortTitle: 'Lead Generation',
    eyebrow: 'Build a healthier sales pipeline',
    summary:
      'Targeted outreach systems and landing experiences designed to start relevant business conversations.',
    problem:
      'Broad outreach and generic messaging create low-quality conversations and waste sales capacity.',
    outcome:
      'A more focused acquisition system with clearer targeting, better messaging, and organized follow-up.',
    icon: ChartNoAxesCombined,
    image: '/service-growth.jpg',
    imageAlt: 'B2B growth team reviewing lead generation performance and CRM pipeline data',
    deliverables: ['Audience research', 'Offer positioning', 'Landing pages', 'Outreach workflows', 'Pipeline reporting'],
    technologies: ['CRM tools', 'Email platforms', 'LinkedIn', 'Analytics', 'Automation'],
    process: ['Define', 'Research', 'Build', 'Engage', 'Refine'],
    faq: sharedFaq,
  },
  {
    slug: 'data-entry',
    title: 'Data Entry Services',
    shortTitle: 'Data Operations',
    eyebrow: 'Accurate data, dependable operations',
    summary:
      'Structured data support for teams that need reliable records, organized catalogs, and consistent back-office execution.',
    problem:
      'Incomplete or inconsistent records create errors across reporting, customer service, and daily operations.',
    outcome:
      'Clean, organized information delivered through a documented process with quality checks.',
    icon: Database,
    image: '/service-data-operations.jpg',
    imageAlt: 'Data operations specialist validating organized product and CRM records',
    deliverables: ['Data collection', 'Data cleanup', 'Catalog management', 'CRM updates', 'Quality assurance'],
    technologies: ['Spreadsheets', 'CRM platforms', 'CMS tools', 'Data validation', 'Reporting'],
    process: ['Define', 'Prepare', 'Process', 'Review', 'Deliver'],
    faq: sharedFaq,
  },
];

export const caseStudies: CaseStudy[] = [
  {
    title: 'Modern E-Commerce Experience',
    industry: 'Retail',
    service: 'ecommerce',
    challenge: 'A growing retailer needed a clearer mobile shopping journey and a storefront that was easier to manage.',
    solution: 'We reorganized product discovery, simplified key purchase steps, and created a maintainable commerce foundation.',
    outcome: 'A faster, easier-to-navigate experience prepared for ongoing merchandising and campaign work.',
    tags: ['Commerce', 'UX', 'Performance'],
    image: '/case-ecommerce.jpg',
    imageAlt: 'E-commerce experience displayed across desktop and mobile devices',
  },
  {
    title: 'Operations Automation Program',
    industry: 'Professional Services',
    service: 'automation-ai',
    challenge: 'Routine handoffs and repeated data entry were slowing customer response times.',
    solution: 'We mapped the workflow, connected the core tools, and automated repetitive status and data tasks.',
    outcome: 'A clearer operating process with fewer manual steps and better visibility for the team.',
    tags: ['Automation', 'Integrations', 'Operations'],
    image: '/case-automation.jpg',
    imageAlt: 'Business automation command center with connected workflow dashboards',
  },
  {
    title: 'Lead Generation Foundation',
    industry: 'B2B Services',
    service: 'lead-generation',
    challenge: 'The sales team needed a more focused way to identify and engage relevant prospects.',
    solution: 'We refined the offer, created campaign landing content, and organized outreach and follow-up workflows.',
    outcome: 'A repeatable acquisition process built around relevant conversations instead of volume alone.',
    tags: ['Growth', 'Campaigns', 'CRM'],
    image: '/service-growth.jpg',
    imageAlt: 'Growth strategy session with a lead funnel and campaign analytics',
  },
  {
    title: 'Service Business Website Rebuild',
    industry: 'Technology',
    service: 'web-development',
    challenge: 'An outdated website made the company’s expertise difficult to understand and slowed content updates.',
    solution: 'We introduced a clearer information architecture, reusable page system, and performance-focused frontend.',
    outcome: 'A credible sales website that communicates services quickly and supports future content growth.',
    tags: ['Web', 'Content', 'Conversion'],
    image: '/service-web-development.jpg',
    imageAlt: 'Product engineering team reviewing a modern responsive web platform',
  },
];

export const team: TeamMember[] = [
  {
    name: 'Muhammad Yasir',
    role: 'Founder & CEO',
    image: '/yasir.jpg',
    width: 793,
    height: 1024,
    bio: 'Leads strategy, client partnerships, and Tekzura’s focus on practical digital outcomes.',
  },
  {
    name: 'Sawera Malik',
    role: 'Full Stack Web Developer',
    image: '/sawera.jpg',
    width: 240,
    height: 240,
    bio: 'Builds responsive web products and dependable interfaces across modern frontend and backend systems.',
  },
  {
    name: 'Fakhar Malik',
    role: 'AI & Python Developer',
    image: '/fakharbhai.jpg',
    width: 240,
    height: 240,
    bio: 'Develops automation workflows and intelligent tools that reduce repetitive operational work.',
  },
  {
    name: 'Muhammad Sajjad',
    role: 'Marketing & Automation',
    image: '/sajjadbhai.jpg',
    width: 240,
    height: 240,
    bio: 'Connects campaign strategy, lead generation, and automation into practical growth programs.',
  },
  {
    name: 'Muhammad Mujahid',
    role: 'Social Media Manager',
    image: '/mujahidbhai.jpg',
    width: 240,
    height: 240,
    bio: 'Plans brand communication and consistent social content for growing businesses.',
  },
  {
    name: 'Muhammad Hassan',
    role: 'Content Creator',
    image: '/hassanbhai.jpg',
    width: 240,
    height: 240,
    bio: 'Shapes useful content and clear brand stories across digital channels.',
  },
  {
    name: 'Tahir Iqbal',
    role: 'Customer Support Specialist',
    image: '/tahirbhai.jpg',
    width: 240,
    height: 240,
    bio: 'Supports client communication, issue resolution, and dependable project follow-through.',
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: 'Tekzura approached our requirements with care, explained tradeoffs clearly, and kept delivery practical.',
    attribution: 'Client feedback, digital product engagement',
  },
  {
    quote: 'The team was responsive throughout the work and made complex technical decisions easier to understand.',
    attribution: 'Client feedback, web development engagement',
  },
  {
    quote: 'We valued the structured communication and the focus on solving the underlying business problem.',
    attribution: 'Client feedback, automation engagement',
  },
];

export const blogPosts: BlogPost[] = [
  {
    title: 'The Future of AI in Business Automation',
    category: 'AI & Automation',
    date: '2024-12-10',
    readTime: '5 min',
    excerpt: 'Where AI-assisted workflows create useful leverage, and how to start with the right operational problem.',
    tags: ['AI', 'Automation', 'Operations'],
    image: '/case-automation.jpg',
    imageAlt: 'Automation dashboard showing connected operational workflows',
  },
  {
    title: 'Building Scalable Web Applications',
    category: 'Web Development',
    date: '2024-12-08',
    readTime: '7 min',
    excerpt: 'A practical look at architecture, performance, deployment, and maintainability for growing products.',
    tags: ['Web', 'Architecture', 'Performance'],
    image: '/service-web-development.jpg',
    imageAlt: 'Development team working across application architecture, code, and interface design',
  },
  {
    title: 'Mobile-First Design: Why It Matters',
    category: 'Design',
    date: '2024-12-05',
    readTime: '4 min',
    excerpt: 'How prioritizing small screens improves content decisions, usability, and conversion paths.',
    tags: ['Design', 'Mobile', 'UX'],
    image: '/case-ecommerce.jpg',
    imageAlt: 'Mobile-first commerce interface shown on desktop and smartphone screens',
  },
  {
    title: 'Maximizing ROI with Data-Driven Marketing',
    category: 'Marketing',
    date: '2024-12-03',
    readTime: '6 min',
    excerpt: 'Use measurement to focus campaign decisions, improve targeting, and invest in channels with purpose.',
    tags: ['Marketing', 'Analytics', 'Growth'],
    image: '/service-growth.jpg',
    imageAlt: 'Marketing team reviewing campaign performance and conversion funnel data',
  },
  {
    title: 'Cloud Infrastructure: A Practical Guide',
    category: 'Infrastructure',
    date: '2024-11-30',
    readTime: '8 min',
    excerpt: 'The core scalability, reliability, security, and cost questions to answer before choosing a platform.',
    tags: ['Cloud', 'DevOps', 'Infrastructure'],
    image: '/service-data-operations.jpg',
    imageAlt: 'Data specialist reviewing structured records and quality reporting',
  },
  {
    title: 'The Power of Progressive Web Apps',
    category: 'Technology',
    date: '2024-11-28',
    readTime: '5 min',
    excerpt: 'When an installable web experience can deliver mobile value without the overhead of separate native apps.',
    tags: ['PWA', 'Web', 'Mobile'],
    image: '/service-web-development.jpg',
    imageAlt: 'Responsive web product under review across desktop and mobile screens',
  },
];
