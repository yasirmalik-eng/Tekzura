import { caseStudies, services, siteConfig, team, testimonials } from './site';
import { insightCaseStudies } from './insights';

// The 9-stage Tekzura Product Studio framework (mirrors ProductStudioFramework.tsx).
const productStudioStages = [
  'Idea Validation',
  'Product Strategy',
  'UI/UX Design',
  'Development',
  'Launch',
  'Marketing',
  'User Acquisition',
  'Optimization',
  'Scaling',
];

/**
 * Builds a compact, plain-text knowledge base from the site content so the AI
 * assistant can answer questions about the whole company. Computed once at
 * module load and sent to the /api/chat proxy as context.
 */
function build(): string {
  const sections: string[] = [];

  sections.push(
    `COMPANY: ${siteConfig.name} — ${siteConfig.tagline}.`,
    siteConfig.description,
    `CONTACT: Email ${siteConfig.email}; Phone ${siteConfig.phone}; Location ${siteConfig.address}; Book a call: ${siteConfig.calendly}.`,
    `KEY PAGES: Home (/), Services (/services), Work/portfolio (/work), About (/about), Insights/blog (/blog), Contact (/contact), Start a project (/get-started).`,
  );

  sections.push(
    `PRODUCT STUDIO FRAMEWORK (9 stages we take products through): ${productStudioStages.join(' → ')}.`,
  );

  sections.push('SERVICES:');
  for (const s of services) {
    sections.push(
      `- ${s.title} (page: /services/${s.slug}). ${s.summary} Problem it solves: ${s.problem} Outcome: ${s.outcome} Deliverables: ${s.deliverables.join(', ')}. Technologies: ${s.technologies.join(', ')}. Business impact: ${s.impact}`,
    );
  }

  sections.push('SELECTED WORK / CASE STUDIES:');
  for (const c of caseStudies) {
    sections.push(`- ${c.title} (${c.industry}). Challenge: ${c.challenge} Solution: ${c.solution} Outcome: ${c.outcome}`);
  }

  const leadership = team.filter((m) => m.group === 'Leadership').map((m) => `${m.name} (${m.role})`);
  const roleCounts = team.reduce<Record<string, number>>((acc, m) => {
    const key = m.group || 'Team';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  sections.push(
    `TEAM: ${team.length} people. Leadership: ${leadership.join(', ')}. Breakdown: ${Object.entries(roleCounts)
      .map(([group, n]) => `${group}: ${n}`)
      .join('; ')}. The team spans full-stack engineering, SaaS, AI/ML, design, digital marketing, and operations.`,
  );

  const countries = Array.from(new Set(testimonials.map((t) => t.country))).join(', ');
  sections.push(
    `CLIENTS & PROOF: ${testimonials.length}+ client testimonials from founders, CEOs, and product leaders across ${countries}. Tekzura works with international clients and startups.`,
  );

  sections.push('INSIGHTS / CASE STUDIES:');
  for (const study of insightCaseStudies) {
    sections.push(`- ${study.title} (/blog/${study.slug}). ${study.excerpt} Outcome: ${study.outcome}`);
  }

  return sections.join('\n');
}

export const knowledgeBase = build();
