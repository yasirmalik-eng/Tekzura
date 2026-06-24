import { blogPosts, caseStudies, publicAsset, serviceImages, type CaseStudy } from './site';

export interface InsightCaseStudy extends CaseStudy {
  slug: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  highlights: string[];
  sections: { heading: string; paragraphs: string[] }[];
}

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const caseStudyImages: Record<string, { image: string; imageAlt: string }> = {
  'the-future-of-ai-in-business-automation': {
    image: publicAsset('/case-automation.jpg'),
    imageAlt: 'Automation dashboard showing connected operational workflows',
  },
  'building-scalable-web-applications': {
    image: publicAsset(serviceImages['full-stack-dev']),
    imageAlt: 'Developer workspace with code editor and web application architecture',
  },
  'mobile-first-design-why-it-matters': {
    image: publicAsset(serviceImages.shopify),
    imageAlt: 'Smartphones displaying responsive mobile interface layouts',
  },
  'maximizing-roi-with-data-driven-marketing': {
    image: publicAsset(serviceImages['digital-marketing']),
    imageAlt: 'Marketing analytics dashboard with performance charts and KPIs',
  },
  'cloud-infrastructure-a-practical-guide': {
    image: publicAsset('/service-data-operations.jpg'),
    imageAlt: 'Data specialist reviewing structured records and quality reporting',
  },
  'the-power-of-progressive-web-apps': {
    image: publicAsset(serviceImages['full-stack-dev']),
    imageAlt: 'Responsive web product under review across desktop and mobile screens',
  },
  'modern-e-commerce-experience': {
    image: publicAsset(serviceImages.shopify),
    imageAlt: 'Customer completing an online purchase on a modern e-commerce platform',
  },
  'operations-automation-program': {
    image: publicAsset(serviceImages['marketing-automation']),
    imageAlt: 'Business automation command center with connected workflow dashboards',
  },
  'digital-marketing-campaign-system': {
    image: publicAsset(serviceImages['digital-marketing']),
    imageAlt: 'Marketing team reviewing campaign performance and conversion funnel data',
  },
  'service-business-website-rebuild': {
    image: publicAsset(serviceImages['full-stack-dev']),
    imageAlt: 'Designer reviewing a modern service business website layout',
  },
};

function withCaseStudyImage<T extends { slug: string; title: string; image?: string; imageAlt?: string }>(
  study: T,
): T {
  const visual = caseStudyImages[study.slug];
  if (!visual) return study;
  return { ...study, image: visual.image, imageAlt: visual.imageAlt };
}

export const INSIGHTS_LISTING_LIMIT = 9;

const blogEnrichment: Record<
  string,
  Pick<CaseStudy, 'industry' | 'service' | 'challenge' | 'solution' | 'outcome'> & {
    highlights: string[];
    sections: InsightCaseStudy['sections'];
  }
> = {
  'The Future of AI in Business Automation': {
    industry: 'Professional Services',
    service: 'marketing-automation',
    challenge:
      'Operational teams were spending hours each week on repetitive data entry, status updates, and handoffs between tools that did not share a single source of truth.',
    solution:
      'Tekzura mapped the highest-friction workflows, connected CRM, support, and reporting tools, and introduced AI-assisted triage for repeatable classification tasks.',
    outcome:
      'Manual processing time dropped sharply, response visibility improved, and the team could reinvest capacity into client-facing work instead of admin.',
    highlights: ['Workflow mapping', 'Tool integrations', 'AI-assisted triage', 'Operational visibility'],
    sections: [
      {
        heading: 'Where AI creates real leverage',
        paragraphs: [
          'The strongest automation wins rarely start with technology. They start with a clearly defined operational bottleneck — duplicate entry, slow handoffs, or reporting that always lags reality.',
          'AI becomes useful when it supports a workflow that already has structure: defined inputs, repeatable decisions, and a human review step for exceptions.',
        ],
      },
      {
        heading: 'Implementation approach',
        paragraphs: [
          'We audited three core workflows, ranked them by time cost and error risk, and piloted automation on the highest-impact process first.',
          'Integrations were kept intentionally narrow — only the systems that mattered to daily operations — so the team could adopt changes without retraining on an entirely new stack.',
        ],
      },
      {
        heading: 'Results the business could feel',
        paragraphs: [
          'Status updates that previously required manual checks became largely automatic. Leadership gained a clearer live view of pipeline and delivery health.',
          'The project created a repeatable pattern for adding automation elsewhere without destabilizing existing operations.',
        ],
      },
    ],
  },
  'Building Scalable Web Applications': {
    industry: 'Technology',
    service: 'full-stack-dev',
    challenge:
      'A growing product needed to support more users and faster release cycles without accumulating performance debt or fragile deployment practices.',
    solution:
      'We restructured the frontend architecture, introduced clearer module boundaries, optimized critical paths, and aligned deployment with staged release checks.',
    outcome:
      'The platform became easier to extend, page performance improved on key flows, and releases became more predictable for the internal team.',
    highlights: ['Architecture review', 'Performance tuning', 'Release pipeline', 'Maintainable UI layers'],
    sections: [
      {
        heading: 'Scalability is a product decision',
        paragraphs: [
          'Scalable web applications are not only about server capacity. They require intentional information architecture, component boundaries, and observability from early growth stages.',
          'Without those foundations, every new feature increases regression risk and slows delivery.',
        ],
      },
      {
        heading: 'Technical priorities',
        paragraphs: [
          'We focused on the routes with the highest traffic and conversion impact first — authentication, dashboard load, and primary user actions.',
          'Caching, bundle splitting, and API response shaping were applied selectively rather than as blanket optimizations.',
        ],
      },
      {
        heading: 'Long-term maintainability',
        paragraphs: [
          'Developers gained clearer ownership zones within the codebase, making parallel work safer.',
          'The result was a product team that could ship faster without treating every release as a high-risk event.',
        ],
      },
    ],
  },
  'Mobile-First Design: Why It Matters': {
    industry: 'Retail',
    service: 'shopify',
    challenge:
      'Most commerce traffic arrived on mobile, but the experience still behaved like a desktop site shrunk to a small screen — hurting discovery and checkout completion.',
    solution:
      'We redesigned navigation, product discovery, and checkout around thumb reach, shorter content blocks, and progressive disclosure of detail.',
    outcome:
      'Mobile sessions became easier to complete, product browsing felt more intentional, and the brand presented more credibly on the device most customers actually use.',
    highlights: ['Mobile UX audit', 'Checkout simplification', 'Merchandising hierarchy', 'Responsive performance'],
    sections: [
      {
        heading: 'Design for the primary device',
        paragraphs: [
          'Mobile-first design forces better decisions about hierarchy. When space is limited, only the most important message, action, and proof point survive.',
          'That discipline improves desktop experiences too — not just small screens.',
        ],
      },
      {
        heading: 'Commerce-specific changes',
        paragraphs: [
          'Category entry points were simplified, filters were repositioned for one-handed use, and checkout fields were reduced to what was truly required.',
          'Visual merchandising was adapted so hero products remained clear without endless vertical scrolling.',
        ],
      },
      {
        heading: 'Business impact',
        paragraphs: [
          'Customers spent less time hunting for products and more time moving toward purchase.',
          'The rebuild created a stronger foundation for campaign landing pages and seasonal promotions.',
        ],
      },
    ],
  },
  'Maximizing ROI with Data-Driven Marketing': {
    industry: 'B2B Services',
    service: 'digital-marketing',
    challenge:
      'Marketing spend was spread across channels without a reliable way to connect campaigns to qualified conversations and revenue outcomes.',
    solution:
      'We defined funnel stages, implemented consistent tracking, rebuilt landing experiences, and aligned outreach workflows with CRM data.',
    outcome:
      'The team could see which channels produced qualified interest, reduce spend on low-intent traffic, and improve follow-up speed on high-value leads.',
    highlights: ['Funnel mapping', 'Campaign tracking', 'Landing page refinement', 'CRM alignment'],
    sections: [
      {
        heading: 'Measurement before scale',
        paragraphs: [
          'Data-driven marketing starts with agreeing on what “qualified” means — not just clicks or form fills, but conversations that match the offer and sales motion.',
          'Once that definition exists, channel decisions become much clearer.',
        ],
      },
      {
        heading: 'Execution changes',
        paragraphs: [
          'Landing pages were rewritten around one primary conversion goal per campaign. Forms and CTAs were simplified to reduce friction without sacrificing lead quality.',
          'Sales and marketing shared a common view of lead status, reducing lag between interest and response.',
        ],
      },
      {
        heading: 'ROI improvements',
        paragraphs: [
          'Budget shifted toward campaigns with verified downstream value rather than surface-level engagement.',
          'Reporting became a weekly operating tool instead of a monthly retrospective.',
        ],
      },
    ],
  },
  'Cloud Infrastructure: A Practical Guide': {
    industry: 'SaaS',
    service: 'full-stack-dev',
    challenge:
      'An early-stage platform needed reliable hosting, safer deployments, and cost visibility before user growth made infrastructure mistakes expensive.',
    solution:
      'We evaluated workload patterns, selected a cloud setup matched to actual traffic, introduced staging environments, and documented backup and monitoring standards.',
    outcome:
      'Deployments became safer, incident response improved, and the team gained confidence to scale usage without guessing at infrastructure limits.',
    highlights: ['Environment strategy', 'Monitoring setup', 'Cost controls', 'Deployment safety'],
    sections: [
      {
        heading: 'Infrastructure choices that match stage',
        paragraphs: [
          'Early products rarely need hyperscale architecture on day one. They need predictable deployments, observability, and a path to grow without re-platforming every quarter.',
          'The best cloud setup is the one your team can operate confidently.',
        ],
      },
      {
        heading: 'What we implemented',
        paragraphs: [
          'Separate staging and production environments reduced release risk. Backups and health checks were automated for core services.',
          'Cost dashboards helped the founders understand which workloads drove spend before traffic spikes arrived.',
        ],
      },
      {
        heading: 'Operational confidence',
        paragraphs: [
          'Engineering could ship fixes faster because rollback paths were clear.',
          'The infrastructure plan left room for horizontal scaling without forcing premature complexity.',
        ],
      },
    ],
  },
  'The Power of Progressive Web Apps': {
    industry: 'Technology',
    service: 'full-stack-dev',
    challenge:
      'The business wanted mobile-like engagement — fast return visits and home-screen access — without maintaining separate native apps for two platforms.',
    solution:
      'We delivered a progressive web experience with offline-ready core flows, install prompts, and performance optimizations tuned for mobile networks.',
    outcome:
      'Users gained a faster, app-like experience on the web while the team kept a single codebase and simpler release process.',
    highlights: ['PWA architecture', 'Offline core flows', 'Install experience', 'Mobile performance'],
    sections: [
      {
        heading: 'When a PWA makes sense',
        paragraphs: [
          'PWAs are strongest when repeat usage, speed, and mobile accessibility matter — but the product does not yet justify native app store overhead.',
          'They work best for content, dashboards, booking flows, and lightweight tools.',
        ],
      },
      {
        heading: 'Delivery focus',
        paragraphs: [
          'We prioritized the screens users revisit most, ensuring those routes loaded quickly and remained usable on unstable connections.',
          'Install prompts were timed to appear after value was demonstrated, improving adoption without hurting first-visit conversion.',
        ],
      },
      {
        heading: 'Product outcome',
        paragraphs: [
          'The team shipped mobile improvements faster because web releases did not depend on app store review cycles.',
          'Engagement metrics improved on return visits while engineering overhead stayed manageable.',
        ],
      },
    ],
  },
};

const projectCaseStudyMeta: Record<string, { date: string; readTime: string; excerpt: string; highlights: string[]; sections: InsightCaseStudy['sections'] }> = {
  'Modern E-Commerce Experience': {
    date: '2024-11-20',
    readTime: '6 min',
    excerpt: 'How a retailer rebuilt mobile discovery and checkout for clearer merchandising and smoother purchases.',
    highlights: ['Mobile commerce UX', 'Catalog restructuring', 'Checkout optimization', 'Campaign-ready storefront'],
    sections: [
      {
        heading: 'Project context',
        paragraphs: [
          'The client had outgrown a storefront that worked for early sales but struggled as catalog complexity and mobile traffic increased.',
          'Campaign traffic was arriving, but too many sessions ended before checkout because product discovery felt cluttered.',
        ],
      },
      {
        heading: 'Delivery summary',
        paragraphs: [
          'Tekzura reorganized category navigation, simplified purchase steps, and created a maintainable foundation for merchandising updates.',
          'Performance work focused on product listing and cart flows where drop-off was highest.',
        ],
      },
    ],
  },
  'Operations Automation Program': {
    date: '2024-11-15',
    readTime: '5 min',
    excerpt: 'Connecting core tools and automating repetitive operational work for a professional services team.',
    highlights: ['Process mapping', 'System integrations', 'Automated status updates', 'Team visibility'],
    sections: [
      {
        heading: 'Project context',
        paragraphs: [
          'Routine handoffs between sales, delivery, and support created delays that were invisible until clients felt them.',
          'The team needed automation that reduced manual work without removing human judgment from important decisions.',
        ],
      },
      {
        heading: 'Delivery summary',
        paragraphs: [
          'We mapped workflows end-to-end, connected the highest-value systems, and automated repetitive status and data tasks.',
          'Leadership gained clearer visibility into where work stalled and where capacity could be redeployed.',
        ],
      },
    ],
  },
  'Digital Marketing Campaign System': {
    date: '2024-11-10',
    readTime: '5 min',
    excerpt: 'Building a coordinated digital marketing program focused on qualified conversations instead of volume alone.',
    highlights: ['Offer refinement', 'Campaign landing pages', 'Paid & organic channels', 'Conversion tracking'],
    sections: [
      {
        heading: 'Project context',
        paragraphs: [
          'The sales team had activity, but campaigns were scattered and tracking made it hard to see what actually drove qualified leads.',
          'Marketing and sales needed a shared system connecting channel performance to follow-up and conversion.',
        ],
      },
      {
        heading: 'Delivery summary',
        paragraphs: [
          'Tekzura refined the offer, built focused landing experiences, and organized paid and organic channels with clear attribution.',
          'The result was a repeatable acquisition process built around relevant conversations instead of volume alone.',
        ],
      },
    ],
  },
  'Service Business Website Rebuild': {
    date: '2024-11-05',
    readTime: '6 min',
    excerpt: 'Rebuilding a credible service website with clearer messaging, reusable pages, and stronger performance.',
    highlights: ['Information architecture', 'Reusable page system', 'Conversion messaging', 'Performance hardening'],
    sections: [
      {
        heading: 'Project context',
        paragraphs: [
          'An outdated website made the company’s expertise difficult to understand and slowed marketing from publishing new content or offers.',
          'Prospects often left without a clear sense of services, process, or proof.',
        ],
      },
      {
        heading: 'Delivery summary',
        paragraphs: [
          'We introduced clearer service structure, reusable page components, and a performance-focused frontend.',
          'The new site supported faster content updates and presented a more credible first impression to inbound leads.',
        ],
      },
    ],
  },
};

const blogDerived: InsightCaseStudy[] = blogPosts.map((post) => {
  const enriched = blogEnrichment[post.title];
  return withCaseStudyImage({
    slug: slugify(post.title),
    title: post.title,
    category: post.category,
    date: post.date,
    readTime: post.readTime,
    excerpt: post.excerpt,
    industry: enriched.industry,
    service: enriched.service,
    challenge: enriched.challenge,
    solution: enriched.solution,
    outcome: enriched.outcome,
    tags: post.tags,
    image: post.image,
    imageAlt: post.imageAlt,
    highlights: enriched.highlights,
    sections: enriched.sections,
  });
});

const projectDerived: InsightCaseStudy[] = caseStudies.map((study) => {
  const meta = projectCaseStudyMeta[study.title];
  if (!meta) {
    throw new Error(`Missing projectCaseStudyMeta for "${study.title}"`);
  }
  return withCaseStudyImage({
    ...study,
    slug: slugify(study.title),
    category: 'Client Project',
    date: meta.date,
    readTime: meta.readTime,
    excerpt: meta.excerpt,
    highlights: meta.highlights,
    sections: meta.sections,
  });
});

export const insightCaseStudies: InsightCaseStudy[] = [...blogDerived, ...projectDerived].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export function getInsightBySlug(slug: string) {
  return insightCaseStudies.find((study) => study.slug === slug);
}
