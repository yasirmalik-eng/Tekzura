import {
  Bot,
  Braces,
  ChartNoAxesCombined,
  Globe2,
  Megaphone,
  Rocket,
  ShoppingBag,
  type LucideIcon,
} from 'lucide-react';

export type ServiceSlug =
  | 'web-development'
  | 'saas'
  | 'ecommerce'
  | 'digital-marketing'
  | 'wordpress'
  | 'automation-ai'
  | 'lead-generation';

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
  benefits: string[];
  impact: string;
  cta: string;
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
  image?: string;
  width?: number;
  height?: number;
  bio: string;
  linkedinUrl?: string;
  group?: 'Leadership' | 'Engineering & Product' | 'Growth & Creative' | 'Operations & Client Success';
  gender?: 'male' | 'female';
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  country: string;
  image?: string;
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
  tagline: 'Product Development & Growth Studio',
  email: 'info@tekzura.com',
  phone: '+92 326 9379244',
  phoneHref: '+923269379244',
  address: 'Bahawalpur, Pakistan',
  calendly: 'https://calendly.com/tekzura-info/30min',
  description:
    'Tekzura is a product development and growth studio helping teams launch digital products, automate operations, and build repeatable growth systems.',
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
    title: 'Revenue-Generating Web Platforms',
    shortTitle: 'Web Platforms',
    eyebrow: 'Web platforms built to convert',
    summary:
      'High-performing marketing sites and web apps engineered to turn visitors into customers, leads, and revenue.',
    problem:
      'A slow, generic website erodes trust, weakens search visibility, and quietly loses revenue on every campaign you run.',
    outcome:
      'A fast, conversion-focused platform with clear messaging, strong UX, and a technical foundation built to grow with you.',
    icon: Braces,
    image: '/service-web-development.jpg',
    imageAlt: 'Product engineering team reviewing a responsive web application across desktop and mobile screens',
    deliverables: ['Conversion-focused UX & design', 'Frontend & backend development', 'CMS & content tooling', 'Analytics & tracking setup', 'Performance & SEO hardening'],
    technologies: ['React', 'TypeScript', 'Node.js', 'Next.js', 'Cloud platforms'],
    process: ['Discover', 'Design', 'Build', 'Validate', 'Launch'],
    benefits: ['Higher conversion from the traffic you already have', 'Faster load times and stronger SEO', 'A codebase your team can extend', 'Analytics and tracking wired in from day one'],
    impact: 'More qualified leads and sales from the same marketing spend.',
    cta: 'Plan My Web Platform',
    faq: sharedFaq,
  },
  {
    slug: 'saas',
    title: 'Scalable SaaS Products',
    shortTitle: 'SaaS Products',
    eyebrow: 'From validated MVP to scalable platform',
    summary:
      'Investor-ready SaaS products — validated, designed, and engineered to onboard users, bill reliably, and scale.',
    problem:
      'Founders lose months and budget building the wrong thing, or shipping an MVP that cannot scale once users and investors arrive.',
    outcome:
      'A market-validated product with scalable architecture, subscription billing, and the growth metrics that prove traction.',
    icon: Rocket,
    image: '/tech-studio-hero.jpg',
    imageAlt: 'Product team reviewing a SaaS dashboard with subscription metrics and user analytics',
    deliverables: ['Idea & market validation', 'Product & UX strategy', 'MVP architecture & build', 'Subscription & billing systems', 'Analytics & growth instrumentation'],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe', 'Cloud platforms'],
    process: ['Validate', 'Design', 'Build', 'Launch', 'Scale'],
    benefits: ['Validated scope before you over-build', 'Subscription billing and user management', 'Scalable, investor-ready architecture', 'A clear roadmap from MVP to growth'],
    impact: 'A credible, scalable product you can launch, monetize, and grow.',
    cta: 'Start My Product Journey',
    faq: sharedFaq,
  },
  {
    slug: 'ecommerce',
    title: 'High-Converting Commerce Experiences',
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
    deliverables: ['Store strategy & merchandising', 'Catalog & navigation design', 'Storefront development', 'Payments & integrations', 'Conversion analytics setup'],
    technologies: ['Shopify', 'WooCommerce', 'Stripe', 'React', 'Analytics'],
    process: ['Audit', 'Plan', 'Design', 'Integrate', 'Optimize'],
    benefits: ['A smoother path from browse to checkout', 'Higher average order value', 'Reliable payments and integrations', 'Merchandising your team controls'],
    impact: 'More completed purchases and more repeat customers.',
    cta: 'Grow My Store',
    faq: sharedFaq,
  },
  {
    slug: 'digital-marketing',
    title: 'Product Growth & Marketing',
    shortTitle: 'Growth & Marketing',
    eyebrow: 'We don\u2019t stop after launch',
    summary:
      'Full-funnel growth — SEO, paid ads, content, and conversion optimization that turn a launched product into a growing one.',
    problem:
      'A great product still fails if no one discovers it — and scattered marketing makes it impossible to know what actually works.',
    outcome:
      'A coordinated growth engine with clear channels, conversion optimization, and reporting tied directly to revenue.',
    icon: Megaphone,
    image: '/service-growth.jpg',
    imageAlt: 'Growth strategists reviewing a campaign funnel and performance dashboard',
    deliverables: ['SEO strategy & execution', 'Paid ads (Google & Meta)', 'Content marketing', 'Social growth', 'Conversion & funnel optimization', 'Analytics & reporting'],
    technologies: ['Google Ads', 'Meta Ads', 'GA4', 'Search Console', 'SEO tools'],
    process: ['Research', 'Position', 'Launch', 'Measure', 'Improve'],
    benefits: ['Compounding organic and paid traffic', 'Higher conversion across the funnel', 'Clear analytics and attribution', 'Channel strategy tied to revenue'],
    impact: 'Sustained growth in users, signups, and revenue after launch.',
    cta: 'Grow My Product',
    faq: sharedFaq,
  },
  {
    slug: 'wordpress',
    title: 'Managed WordPress & Content Platforms',
    shortTitle: 'WordPress',
    eyebrow: 'Flexible publishing, without the bloat',
    summary:
      'Custom WordPress platforms that give teams practical editing tools without compromising performance or security.',
    problem:
      'Template-heavy WordPress builds often become slow, insecure, and frustrating for content teams to manage.',
    outcome:
      'A tailored, maintainable platform with a clear editing experience, disciplined plugins, and SEO-ready structure.',
    icon: Globe2,
    image: '/team-workshop.jpg',
    imageAlt: 'Development team reviewing a maintainable publishing interface and responsive website',
    deliverables: ['Content architecture', 'Custom theme development', 'Block editor setup', 'Plugin integration', 'Performance & security hardening'],
    technologies: ['WordPress', 'WooCommerce', 'PHP', 'ACF', 'Cloudflare'],
    process: ['Structure', 'Prototype', 'Develop', 'Migrate', 'Train'],
    benefits: ['Editing your team actually enjoys', 'A fast, secure, well-structured site', 'Disciplined, maintainable plugins', 'SEO-ready content architecture'],
    impact: 'A content platform your team can grow without developers.',
    cta: 'Plan My WordPress Site',
    faq: sharedFaq,
  },
  {
    slug: 'automation-ai',
    title: 'AI, Automation & Data Operations',
    shortTitle: 'Automation & AI',
    eyebrow: 'Remove repetitive work, scale capacity',
    summary:
      'Practical AI and automation that connect your tools, clean your data, and remove the manual work slowing your team down.',
    problem:
      'Repeated data entry and fragmented tools consume time that should be spent serving customers and growing the business.',
    outcome:
      'Reliable workflows and clean data that reduce handoffs, cut errors, and give your team more time for revenue work.',
    icon: Bot,
    image: '/service-data-operations.jpg',
    imageAlt: 'Automation operations dashboard showing connected workflows and business systems',
    deliverables: ['Workflow audit', 'Automation & AI-assisted tools', 'System integrations', 'Data operations & cleanup', 'Catalog & CRM management', 'Monitoring & handover'],
    technologies: ['Python', 'OpenAI APIs', 'Zapier', 'Make', 'CRM platforms'],
    process: ['Map', 'Prioritize', 'Prototype', 'Integrate', 'Monitor'],
    benefits: ['Hours of manual work removed every week', 'Connected tools and clean, reliable data', 'Fewer errors and fewer handoffs', 'More team capacity for revenue work'],
    impact: 'Lower operating cost and faster customer response.',
    cta: 'Automate My Operations',
    faq: sharedFaq,
  },
  {
    slug: 'lead-generation',
    title: 'Automated Lead Generation Systems',
    shortTitle: 'Lead Generation',
    eyebrow: 'A predictable pipeline of qualified leads',
    summary:
      'End-to-end lead engines — funnels, landing pages, CRM, and nurture automation that fill your pipeline on autopilot.',
    problem:
      'Inconsistent outreach and leaky funnels create unpredictable revenue and waste your sales team\u2019s time.',
    outcome:
      'A repeatable system that captures, qualifies, and nurtures the right leads automatically — and reports on what it costs.',
    icon: ChartNoAxesCombined,
    image: '/service-growth.jpg',
    imageAlt: 'B2B growth team reviewing lead generation performance and CRM pipeline data',
    deliverables: ['Funnel design', 'High-converting landing pages', 'CRM integration', 'Email & nurture automation', 'Lead qualification & scoring', 'Conversion optimization'],
    technologies: ['HubSpot', 'CRM tools', 'Email platforms', 'Zapier', 'Analytics'],
    process: ['Define', 'Research', 'Build', 'Engage', 'Refine'],
    benefits: ['Funnels and landing pages that convert', 'CRM and email automation wired together', 'Lead scoring and qualification built in', 'Reporting on cost per qualified lead'],
    impact: 'A steady, predictable flow of qualified leads.',
    cta: 'Build My Lead Engine',
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
    bio: 'Leads strategy, client partnerships, and Tekzuraâ€™s focus on practical digital outcomes.',
    group: 'Leadership',
    gender: 'male',
  },
  {
    name: 'Swera Tariq',
    role: 'Co-Founder',
    image: '/sawera.jpg',
    width: 720,
    height: 840,
    bio: 'Shapes Tekzura’s vision, partnerships, and growth direction alongside the leadership team.',
    group: 'Leadership',
    gender: 'female',
  },
  {
    name: 'Mohammad Sajjad',
    role: 'CTO',
    image: '/team/mohammad-sajjad.webp',
    width: 720,
    height: 840,
    bio: 'Leads technical direction, architecture decisions, and engineering delivery across Tekzura’s product and platform work.',
  },
  {
    name: 'Muhammad Abdullah Awais',
    role: 'MEAN Stack Developer',
    image: '/team/muhammad-abdullah-awais.webp',
    width: 720,
    height: 840,
    bio: 'Builds scalable, secure web applications across frontend, backend APIs, databases, cloud deployment, and SaaS subscription systems.',
    group: 'Engineering & Product',
    gender: 'male',
  },

  {
    name: 'Muhammad Danial Malik',
    role: 'Full-Stack Web Developer',
    image: '/team/muhammad-danial-malik.webp',
    width: 720,
    height: 840,
    bio: 'Converts Figma designs into dynamic, responsive web applications and delivers MERN projects from concept through deployment.',
    group: 'Engineering & Product',
    gender: 'male',
  },
  {
    name: 'Waleed Amin',
    role: 'Frontend Engineer',
    image: '/team/waleed-amin.webp',
    width: 720,
    height: 840,
    bio: 'Builds scalable, responsive web applications with React, JavaScript, Django integrations, Supabase, Firebase, payment gateways, and API-driven workflows.',

    group: 'Engineering & Product',
    gender: 'male',
  },
  {
    name: 'Zohaib Zulfiqar',
    role: 'Web & Frontend Developer',
    image: '/team/zohaib-zulfiqar.webp',
    width: 720,
    height: 840,
    bio: 'Builds responsive, performance-optimized frontend interfaces with a focus on usability, accessibility, SEO-aware structure, and maintainable code.',
    group: 'Engineering & Product',
    gender: 'male',
  },
  {
    name: 'Muhammad Umer',
    role: 'Full Stack Developer',
    image: '/team/muhammad-umer.webp',
    width: 720,
    height: 840,
    bio: 'Develops full-stack web and app products with experience across frontend development, responsive interfaces, and eCommerce projects.',
    group: 'Engineering & Product',
    gender: 'male',
  },
  {
    name: 'Abdul Rehman',
    role: 'Full Stack MERN & PERN Developer',
    image: '/team/abdul-rehman.webp',
    width: 720,
    height: 840,
    bio: 'Builds SaaS products, AI-powered applications, and modern web experiences using MERN, Next.js, TypeScript, Supabase, and AI APIs.',
    group: 'Engineering & Product',
    gender: 'male',
  },
  
  {
    name: 'Maria Asghar',
    role: 'Software Developer',
    bio: 'Develops full-stack web applications with MERN, Next.js, PostgreSQL, SQL, React, and modern developer workflows.',
    group: 'Engineering & Product',
    gender: 'female',
  },
  {
    name: 'Faizan Haider',
    role: 'Machine Learning Engineer ',
    bio: 'Builds applied AI and machine learning systems, from preprocessing and model evaluation to FastAPI deployment and LLM-powered workflows.',
    group: 'Engineering & Product',
    gender: 'male',
  },
  {
    name: 'Humaira Malik',
    role: 'Digital Marketer',
    bio: 'Works across digital marketing, SEO, and digital media, with experience managing marketing work at Hello World Technologies.',
    group: 'Growth & Creative',
    gender: 'female',
  },
  {
    name: 'Lubaba Muaaz',
    role: 'Digital Marketing',
    image: '/team/lubaba-muaaz.webp',
    width: 720,
    height: 840,
    bio: 'Plans and optimizes digital marketing work across Meta ads, content strategy, SEO, local search, and social media growth.',
    group: 'Growth & Creative',
    gender: 'female',
  },
  {
    name: 'Nimrah Ashiq Hussain',
    role: 'Content Writer',
    bio: 'Supports content writing and social media management, with experience across financial administration, social media work, and education.',
    group: 'Growth & Creative',
    gender: 'female',
  },
  {
    name: 'Sana Nawaz',
    role: 'Graphic Designer',
    bio: 'Creates brand visuals, posts, magazine covers, and marketing graphics using Adobe Photoshop, Adobe Illustrator, and Figma.',
    group: 'Growth & Creative',
    gender: 'female',
  },
  {
    name: 'Muhammad Rashid',
    role: 'Research Assistant',
    image: '/team/muhammad-rashid.webp',
    width: 720,
    height: 840,
    bio: 'Supports research, data analysis, business analysis, and administrative workflows with a background in information technology.',
    group: 'Operations & Client Success',
    gender: 'male',
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Khalid Almubarak',
    role: 'CEO',
    country: 'Bahrain',
    image: '/testimonials/khalid-almubarak.jpg',
    quote: 'Great job completing a second iteration and upgrade of our initial project. The process was smooth, efficient, and professionally managed throughout.',
  },
  {
    name: 'Fernando Escaffi',
    role: 'Owner & CEO',
    country: 'USA',
    image: '/testimonials/fernando-escaffi.jpg',
    quote: 'They did an excellent job setting up our automation workflows and continue to help us improve and expand them. Their expertise, attention to detail, and commitment to delivering results have been impressive. Highly recommended.',
  },
  {
    name: 'Ruth Marshall',
    role: 'Owner',
    country: 'USA',
    image: '/testimonials/ruth-marshall.jpg',
    quote: 'Excellent collaboration throughout the project. Demonstrated strong expertise, clear communication, and a commitment to achieving the best possible outcome.',
  },
  {
    name: 'David Ranalli',
    role: 'Founder',
    country: 'USA',
    image: '/testimonials/david-ranalli.jpg',
    quote: 'An exceptional experience from start to finish. A critical website issue was identified and resolved efficiently, minimizing downtime and ensuring business continuity. Professional, responsive, and highly reliable.',
  },
  {
    name: 'Kevin Duncan',
    role: 'CTO',
    country: 'USA',
    image: '/testimonials/kevin-duncan.jpg',
    quote: 'Exceptional development skills combined with clear communication and professionalism. High-quality work was delivered on time, with a strong focus on scalability and security.',
  },
  {
    name: 'Chris Berry',
    role: 'CEO',
    country: 'USA',
    quote: 'Outstanding work on our SaaS MVP project. The team quickly understood the requirements and delivered a scalable, production-ready solution with excellent attention to detail.',
  },
  {
    name: 'Jamie El Kaleh',
    role: 'Founder',
    country: 'United Kingdom',
    quote: 'A seamless and stress-free experience. The team took the time to understand our vision and delivered a website that perfectly reflected our brand while providing an exceptional user experience.',
  },
  {
    name: 'Ama Elizabeth',
    role: 'Product Owner',
    country: 'Canada',
    quote: 'Delivered outstanding work and exceeded expectations. The frontend was modern, fully responsive, and built with exceptional attention to detail and performance.',
  },
  {
    name: 'Charles',
    role: 'Business Owner',
    country: 'USA',
    quote: 'Resolved critical issues quickly and efficiently. Communication was clear throughout the project, and the technical quality of the work was outstanding.',
  },
  {
    name: 'Pedro Marcelino',
    role: 'Owner & Pastry Chef',
    country: 'New Zealand',
    image: '/testimonials/pedro-marcelino.jpg',
    quote: 'Reliable, proactive, and highly skilled. Consistently delivered quality work while maintaining excellent communication and a solutions-focused approach.',
  },
  {
    name: 'Rick Bowal',
    role: 'Real Estate Agent',
    country: 'Canada',
    image: '/testimonials/rick-bowal.jpg',
    quote: 'Over the course of four months, the team consistently delivered exceptional results on a complex API integration and data scraping project. Their technical expertise, problem-solving abilities, and attention to detail were evident throughout the engagement. They successfully handled evolving requirements, optimized data collection processes, and ensured the accuracy and reliability of the extracted data. Communication was always prompt and professional, and every milestone was delivered on schedule. Their ability to tackle technical challenges and provide scalable solutions made them a valuable partner.',
  },
  {
    name: 'Martin Tuks',
    role: 'Owner',
    country: 'USA',
    quote: 'We needed reliable data extraction from multiple sources, and the results exceeded our expectations. The scraping infrastructure was efficient, accurate, and scalable. Communication was excellent, and every deliverable was completed on schedule.',
  },
  {
    name: 'Jennifer Arteta',
    role: 'Founder & CEO',
    country: 'USA',
    image: '/testimonials/jennifer-arteta.jpg',
    quote: 'Over several months of collaboration, the team consistently demonstrated professionalism, technical excellence, and strong problem-solving skills. They handled complex data challenges with ease and became a trusted extension of our internal team.',
  },
  {
    name: 'Jennifer Roberts',
    role: 'Managing Director',
    country: 'Canada',
    image: '/testimonials/jennifer-roberts.jpg',
    quote: 'The data scraping and automation solutions exceeded our expectations. Complex workflows were streamlined into efficient systems that saved significant time and resources. Professional, knowledgeable, and results-oriented throughout the engagement.',
  },
  {
    name: 'David Thompson',
    role: 'Founder',
    country: 'USA',
    image: '/testimonials/david-thompson.jpg',
    quote: 'An outstanding experience from start to finish. Every milestone was delivered on time, and the quality of execution was exceptional. Their technical expertise and commitment to excellence made them a valuable extension of our team.',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Product Manager',
    country: 'USA',
    image: '/testimonials/sarah-mitchell.jpg',
    quote: 'The team demonstrated deep technical knowledge and a remarkable ability to solve complex challenges. Their proactive communication and attention to detail ensured the project ran smoothly from beginning to end.',
  },
  {
    name: 'Robert Williams',
    role: 'VP of Engineering',
    country: 'USA',
    image: '/testimonials/robert-williams.jpg',
    quote: "One of the most professional development teams we've worked with. They handled sophisticated API integrations, optimized system performance, and consistently delivered solutions that exceeded expectations.",
  },
  {
    name: 'Shenika Pinckney',
    role: 'Founder',
    country: 'USA',
    image: '/testimonials/shenika-pinckney.jpg',
    quote: 'The collaboration was smooth and professional from start to finish. Communication was clear, requirements were well understood, and the final delivery aligned perfectly with expectations. The work was completed on time with strong attention to detail and quality. Highly recommended for anyone looking for reliable and skilled execution.',
  },
  {
    name: 'Thomas Swanson',
    role: 'Vice President of Commerce',
    country: 'USA',
    image: '/testimonials/thomas-swanson.jpg',
    quote: 'The team delivered a highly professional and well-executed solution. Their communication was clear throughout the project, and they demonstrated strong technical understanding and attention to detail. The final results aligned perfectly with our expectations, and the overall collaboration was smooth and efficient.',
  },
  {
    name: 'Lucas Van Haaften',
    role: 'Founder',
    country: 'Netherlands',
    image: '/testimonials/lucas-van-haaften.jpg',
    quote: 'It was amazing.',
  },
  {
    name: 'Gisela Pleite',
    role: 'Owner',
    country: 'Netherlands',
    quote: 'Did an excellent job redesigning our Shopify store and improving our overall brand presentation. Professional, responsive, and detail-oriented throughout the project. Communication was smooth, and every deliverable was completed on time. I would definitely recommend working with them again.',
  },
  {
    name: 'Warren Kiru',
    role: 'E-commerce Owner',
    country: 'USA',
    quote: 'Delivered highly effective Google Ads optimization, combining strong strategic insight with precise execution. Their work significantly improved our campaign performance and overall business results. Highly recommended.',
  },
];

export const blogPosts: BlogPost[] = [
  {
    title: 'The Future of AI in Business Automation',
    category: 'AI & Automation',
    date: '2025-12-10',
    readTime: '5 min',
    excerpt: 'Where AI-assisted workflows create useful leverage, and how to start with the right operational problem.',
    tags: ['AI', 'Automation', 'Operations'],
    image: '/case-automation.jpg',
    imageAlt: 'Automation dashboard showing connected operational workflows',
  },
  {
    title: 'Building Scalable Web Applications',
    category: 'Web Development',
    date: '2025-11-08',
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
