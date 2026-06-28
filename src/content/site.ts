import {
  Braces,
  Globe2,
  Headset,
  Megaphone,
  Palette,
  ShoppingBag,
  Workflow,
  Youtube,
  type LucideIcon,
} from 'lucide-react';

export type ServiceSlug =
  | 'full-stack-dev'
  | 'wordpress'
  | 'shopify'
  | 'digital-marketing'
  | 'youtube-automation'
  | 'marketing-automation'
  | 'graphic-design'
  | 'customer-support';

export const serviceImages: Record<ServiceSlug, string> = {
  'full-stack-dev': '/service-web-development.jpg',
  'wordpress': '/team-workshop.jpg',
  'shopify': '/shopify dev.jpg',
  'digital-marketing': '/Digital markiting.jpg',
  'youtube-automation': '/youTube automation.jpg',
  'marketing-automation': '/MarketingAutomation.jpg',
  'graphic-design': '/Graphic desiging.jpg',
  'customer-support': '/Custom Support.jpg',
};

export function publicAsset(path: string) {
  return encodeURI(path);
}

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
  url: 'https://tekzura.com',
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
    slug: 'full-stack-dev',
    title: 'Full Stack Development',
    shortTitle: 'Full Stack Dev',
    eyebrow: 'Web apps, SaaS, APIs',
    summary: 'Web apps, SaaS platforms, APIs, and dashboards built to launch fast and scale with your business.',
    problem:
      'Piecing together freelancers for frontend, backend, and infrastructure slows delivery and creates fragile products that are hard to maintain.',
    outcome:
      'One accountable team ships a cohesive product — from interface to API to deployment — with architecture built for growth.',
    icon: Braces,
    image: publicAsset(serviceImages['full-stack-dev']),
    imageAlt: 'Engineering team reviewing a full stack web application and API architecture',
    deliverables: ['Product & technical discovery', 'Frontend & backend development', 'API design & integrations', 'Database & cloud setup', 'Launch, monitoring & handover'],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Next.js', 'Cloud platforms'],
    process: ['Discover', 'Design', 'Build', 'Test', 'Launch'],
    benefits: ['Faster path from idea to live product', 'Scalable, maintainable codebase', 'Integrated frontend, backend & APIs', 'Clear milestones and transparent delivery'],
    impact: 'A production-ready platform you can launch, iterate, and grow on.',
    cta: 'Plan My Build',
    faq: sharedFaq,
  },
  {
    slug: 'wordpress',
    title: 'WordPress Development',
    shortTitle: 'WordPress Dev',
    eyebrow: 'Sites, themes, plugins',
    summary: 'Business websites, custom themes, plugins, and WooCommerce stores that are fast, secure, and easy to manage.',
    problem:
      'Template-heavy WordPress builds become slow, insecure, and frustrating for teams who need reliable publishing and updates.',
    outcome:
      'A tailored WordPress platform with disciplined plugins, strong performance, and an editing experience your team controls.',
    icon: Globe2,
    image: publicAsset(serviceImages.wordpress),
    imageAlt: 'Development team reviewing a WordPress site and content management workflow',
    deliverables: ['Site architecture & wireframes', 'Custom theme development', 'Plugin integration & custom plugins', 'WooCommerce setup', 'Performance, security & SEO hardening'],
    technologies: ['WordPress', 'WooCommerce', 'PHP', 'ACF', 'Cloudflare'],
    process: ['Structure', 'Design', 'Develop', 'Migrate', 'Train'],
    benefits: ['Editing workflows your team enjoys', 'Fast, secure, maintainable builds', 'SEO-ready content structure', 'Reliable WooCommerce when needed'],
    impact: 'A credible web presence your team can update without developer dependency.',
    cta: 'Plan My WordPress Site',
    faq: sharedFaq,
  },
  {
    slug: 'shopify',
    title: 'Shopify Development',
    shortTitle: 'Shopify Dev',
    eyebrow: 'Stores, themes, apps',
    summary: 'Shopify stores, custom themes, apps, and speed optimization built to convert browsers into buyers.',
    problem:
      'Generic themes, slow product pages, and clunky checkout flows quietly kill conversion and make campaigns more expensive.',
    outcome:
      'A polished Shopify experience with clearer merchandising, faster load times, and integrations your operations team can trust.',
    icon: ShoppingBag,
    image: publicAsset(serviceImages.shopify),
    imageAlt: 'Shopify storefront displayed across desktop and mobile screens',
    deliverables: ['Store strategy & merchandising', 'Custom theme development', 'Shopify app integrations', 'Checkout & payment optimization', 'Speed & conversion improvements'],
    technologies: ['Shopify', 'Liquid', 'React', 'Stripe', 'Analytics'],
    process: ['Audit', 'Plan', 'Design', 'Build', 'Optimize'],
    benefits: ['Smoother path from browse to checkout', 'Brand-aligned custom storefront', 'Reliable apps and integrations', 'Performance tuned for mobile shoppers'],
    impact: 'More completed purchases from the traffic you already have.',
    cta: 'Grow My Store',
    faq: sharedFaq,
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    shortTitle: 'Digital Marketing',
    eyebrow: 'SEO, ads, social',
    summary: 'SEO, Google and Meta ads, social media management, and funnel optimization tied to real business outcomes.',
    problem:
      'Scattered campaigns, weak tracking, and inconsistent content make it impossible to know what actually drives leads and revenue.',
    outcome:
      'A coordinated growth program with clear channels, conversion focus, and reporting you can act on every week.',
    icon: Megaphone,
    image: publicAsset(serviceImages['digital-marketing']),
    imageAlt: 'Marketing team reviewing campaign performance across search, social, and paid channels',
    deliverables: ['SEO strategy & execution', 'Google & Meta ad campaigns', 'Social media management', 'Landing pages & funnel optimization', 'Analytics & monthly reporting'],
    technologies: ['Google Ads', 'Meta Ads', 'GA4', 'Search Console', 'SEO tools'],
    process: ['Research', 'Plan', 'Launch', 'Measure', 'Improve'],
    benefits: ['Compounding organic and paid visibility', 'Higher conversion across the funnel', 'Clear attribution and reporting', 'Consistent brand presence on social'],
    impact: 'More qualified traffic and leads from the channels that fit your offer.',
    cta: 'Grow My Business',
    faq: sharedFaq,
  },
  {
    slug: 'youtube-automation',
    title: 'YouTube Automation',
    shortTitle: 'YouTube Automation',
    eyebrow: 'Full channel management',
    summary: 'Scripts, editing, thumbnails, scheduling, and full channel management to grow YouTube without doing everything yourself.',
    problem:
      'Consistent YouTube growth demands scripts, edits, thumbnails, uploads, and optimization — most teams cannot keep up alongside running the business.',
    outcome:
      'A repeatable content engine that publishes on schedule, improves packaging, and compounds audience growth over time.',
    icon: Youtube,
    image: publicAsset(serviceImages['youtube-automation']),
    imageAlt: 'Content team reviewing YouTube channel analytics and video production workflow',
    deliverables: ['Channel strategy & content planning', 'Scriptwriting & research', 'Video editing & post-production', 'Thumbnail & title optimization', 'Upload, scheduling & analytics'],
    technologies: ['YouTube Studio', 'Premiere Pro', 'Canva', 'Analytics', 'AI-assisted workflows'],
    process: ['Strategy', 'Produce', 'Publish', 'Analyze', 'Scale'],
    benefits: ['Consistent publishing without burnout', 'Stronger thumbnails and packaging', 'Audience growth with clear reporting', 'More time for strategy and offers'],
    impact: 'A YouTube channel that grows while you focus on the business.',
    cta: 'Scale My Channel',
    faq: sharedFaq,
  },
  {
    slug: 'marketing-automation',
    title: 'Marketing Automation',
    shortTitle: 'Marketing Automation',
    eyebrow: 'CRM, flows, funnels',
    summary: 'CRM setup, email flows, funnels, and Zapier workflows that capture, nurture, and convert leads automatically.',
    problem:
      'Leads fall through the cracks when CRM, email, ads, and forms are disconnected — costing revenue and wasting ad spend.',
    outcome:
      'Connected systems that route leads, trigger follow-ups, and report on what converts without manual busywork.',
    icon: Workflow,
    image: publicAsset(serviceImages['marketing-automation']),
    imageAlt: 'Marketing automation dashboard showing CRM flows and funnel performance',
    deliverables: ['CRM setup & pipeline design', 'Email & nurture sequences', 'Landing page & funnel wiring', 'Zapier / Make integrations', 'Tracking, tags & reporting'],
    technologies: ['HubSpot', 'Zapier', 'Make', 'Email platforms', 'GA4'],
    process: ['Map', 'Design', 'Build', 'Test', 'Optimize'],
    benefits: ['Fewer dropped leads and faster follow-up', 'Automated nurture that runs 24/7', 'Cleaner data across tools', 'Clear view of funnel performance'],
    impact: 'A predictable pipeline with less manual sales admin.',
    cta: 'Automate My Funnel',
    faq: sharedFaq,
  },
  {
    slug: 'graphic-design',
    title: 'Graphic Design',
    shortTitle: 'Graphic Design',
    eyebrow: 'Logo, brand, content',
    summary: 'Logos, brand kits, social content, and UI assets that make your business look credible across every touchpoint.',
    problem:
      'Inconsistent visuals weaken trust — mismatched logos, off-brand social posts, and generic templates make even good offers feel amateur.',
    outcome:
      'A cohesive visual identity and ready-to-use assets your team can deploy across web, social, ads, and presentations.',
    icon: Palette,
    image: publicAsset(serviceImages['graphic-design']),
    imageAlt: 'Designer presenting brand identity concepts and social content templates',
    deliverables: ['Logo & brand identity', 'Brand guidelines & color systems', 'Social media templates', 'Ad creatives & landing visuals', 'UI/UX design support'],
    technologies: ['Figma', 'Adobe Creative Suite', 'Canva systems', 'Brand libraries'],
    process: ['Discover', 'Concept', 'Refine', 'Deliver', 'Support'],
    benefits: ['Professional first impression everywhere', 'Reusable templates for faster content', 'Consistent brand across channels', 'Design assets ready for dev and marketing'],
    impact: 'A brand that looks as strong as the service you deliver.',
    cta: 'Refresh My Brand',
    faq: sharedFaq,
  },
  {
    slug: 'customer-support',
    title: 'Customer Support',
    shortTitle: 'Customer Support',
    eyebrow: 'Live chat, VA, helpdesk',
    summary: 'Live chat, virtual assistant services, helpdesk setup, and chatbot workflows that keep customers answered and happy.',
    problem:
      'Slow replies, missed messages, and overloaded inboxes damage retention — especially when growth outpaces your team’s capacity.',
    outcome:
      'Structured support operations with trained coverage, clear escalation paths, and tools that keep response times under control.',
    icon: Headset,
    image: publicAsset(serviceImages['customer-support']),
    imageAlt: 'Customer support team managing live chat and helpdesk tickets',
    deliverables: ['Live chat & inbox setup', 'VA / support team staffing', 'Helpdesk & ticket workflows', 'Chatbot & FAQ automation', 'SLA tracking & quality reviews'],
    technologies: ['Zendesk', 'Intercom', 'Crisp', 'WhatsApp Business', 'Chatbot platforms'],
    process: ['Audit', 'Setup', 'Staff', 'Monitor', 'Improve'],
    benefits: ['Faster replies across channels', 'Coverage without hiring full-time immediately', 'Documented processes and escalation', 'Happier customers and fewer refunds'],
    impact: 'Reliable support that protects revenue and reputation.',
    cta: 'Strengthen My Support',
    faq: sharedFaq,
  },
];

export const caseStudies: CaseStudy[] = [
  {
    title: 'Modern E-Commerce Experience',
    industry: 'Retail',
    service: 'shopify',
    challenge: 'A growing retailer needed a clearer mobile shopping journey and a storefront that was easier to manage.',
    solution: 'We reorganized product discovery, simplified key purchase steps, and created a maintainable commerce foundation.',
    outcome: 'A faster, easier-to-navigate experience prepared for ongoing merchandising and campaign work.',
    tags: ['Commerce', 'UX', 'Performance'],
    image: publicAsset(serviceImages.shopify),
    imageAlt: 'E-commerce experience displayed across desktop and mobile devices',
  },
  {
    title: 'Operations Automation Program',
    industry: 'Professional Services',
    service: 'marketing-automation',
    challenge: 'Routine handoffs and repeated data entry were slowing customer response times.',
    solution: 'We mapped the workflow, connected the core tools, and automated repetitive status and data tasks.',
    outcome: 'A clearer operating process with fewer manual steps and better visibility for the team.',
    tags: ['Automation', 'Integrations', 'Operations'],
    image: publicAsset(serviceImages['marketing-automation']),
    imageAlt: 'Business automation command center with connected workflow dashboards',
  },
  {
    title: 'Digital Marketing Campaign System',
    industry: 'B2B Services',
    service: 'digital-marketing',
    challenge: 'The sales team needed a more focused way to attract and convert relevant prospects online.',
    solution: 'We refined the offer, built campaign landing pages, and organized paid and organic channels with clear tracking.',
    outcome: 'A repeatable acquisition process built around relevant conversations instead of volume alone.',
    tags: ['Growth', 'Campaigns', 'SEO'],
    image: publicAsset(serviceImages['digital-marketing']),
    imageAlt: 'Growth strategy session with a lead funnel and campaign analytics',
  },
  {
    title: 'Service Business Website Rebuild',
    industry: 'Technology',
    service: 'full-stack-dev',
    challenge: 'An outdated website made the company’s expertise difficult to understand and slowed content updates.',
    solution: 'We introduced a clearer information architecture, reusable page system, and performance-focused frontend.',
    outcome: 'A credible sales website that communicates services quickly and supports future content growth.',
    tags: ['Web', 'Content', 'Conversion'],
    image: publicAsset(serviceImages['full-stack-dev']),
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
    image: publicAsset('/case-automation.jpg'),
    imageAlt: 'Automation dashboard showing connected operational workflows',
  },
  {
    title: 'Building Scalable Web Applications',
    category: 'Web Development',
    date: '2025-11-08',
    readTime: '7 min',
    excerpt: 'A practical look at architecture, performance, deployment, and maintainability for growing products.',
    tags: ['Web', 'Architecture', 'Performance'],
    image: publicAsset(serviceImages['full-stack-dev']),
    imageAlt: 'Development team working across application architecture, code, and interface design',
  },
  {
    title: 'Mobile-First Design: Why It Matters',
    category: 'Design',
    date: '2024-12-05',
    readTime: '4 min',
    excerpt: 'How prioritizing small screens improves content decisions, usability, and conversion paths.',
    tags: ['Design', 'Mobile', 'UX'],
    image: publicAsset(serviceImages.shopify),
    imageAlt: 'Mobile-first commerce interface shown on desktop and smartphone screens',
  },
  {
    title: 'Maximizing ROI with Data-Driven Marketing',
    category: 'Marketing',
    date: '2024-12-03',
    readTime: '6 min',
    excerpt: 'Use measurement to focus campaign decisions, improve targeting, and invest in channels with purpose.',
    tags: ['Marketing', 'Analytics', 'Growth'],
    image: publicAsset(serviceImages['digital-marketing']),
    imageAlt: 'Marketing team reviewing campaign performance and conversion funnel data',
  },
  {
    title: 'Cloud Infrastructure: A Practical Guide',
    category: 'Infrastructure',
    date: '2024-11-30',
    readTime: '8 min',
    excerpt: 'The core scalability, reliability, security, and cost questions to answer before choosing a platform.',
    tags: ['Cloud', 'DevOps', 'Infrastructure'],
    image: publicAsset('/service-data-operations.jpg'),
  },
  {
    title: 'The Power of Progressive Web Apps',
    category: 'Technology',
    date: '2024-11-28',
    readTime: '5 min',
    excerpt: 'When an installable web experience can deliver mobile value without the overhead of separate native apps.',
    tags: ['PWA', 'Web', 'Mobile'],
    image: publicAsset(serviceImages['full-stack-dev']),
    imageAlt: 'Responsive web product under review across desktop and mobile screens',
  },
];
