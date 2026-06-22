# Tekzura Website — Full Documentation

Complete reference for the Tekzura main marketing website: architecture, content, pages, components, styling, deployment, and maintenance.

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Architecture](#architecture)
6. [Routing & Navigation](#routing--navigation)
7. [Pages](#pages)
8. [Shared Layout (SiteShell)](#shared-layout-siteshell)
9. [Components](#components)
10. [Content Layer](#content-layer)
11. [Services](#services)
12. [Portfolio & Case Studies](#portfolio--case-studies)
13. [Team](#team)
14. [Testimonials](#testimonials)
15. [Blog / Insights](#blog--insights)
16. [SEO](#seo)
17. [Design System](#design-system)
18. [Accessibility](#accessibility)
19. [Performance](#performance)
20. [Deployment](#deployment)
21. [Maintenance Guide](#maintenance-guide)
22. [Static Assets](#static-assets)

---

## Overview

**Tekzura** is a premium digital agency marketing website built as a single-page-application (SPA) with client-side routing. It presents the company’s services, portfolio, team, client testimonials, and contact options to prospective clients.

| Property | Value |
|----------|-------|
| **Project name** | `tekzura-main-website` |
| **Version** | 1.0.0 |
| **Design origin** | [Figma — Premium Digital Agency Website](https://www.figma.com/design/3GxfAXC5YzWZwh46HTXzn1/Premium-Digital-Agency-Website) |
| **Primary CTA** | Book a strategy call via Calendly |
| **Contact email** | info@tekzura.com |
| **Phone** | +92 326 9379244 |
| **Location** | Bahawalpur, Pakistan |

### What the site does

- Markets seven core service offerings with dedicated detail pages
- Showcases 170+ portfolio projects across five categories (digital marketing, web development, SaaS, Shopify, WordPress)
- Displays team profiles grouped by department
- Features an auto-advancing testimonials carousel (22 client quotes)
- Provides blog/insights listing with client-side search (6 articles; no individual post pages yet)
- Integrates Calendly for scheduling and `mailto:` links for direct contact
- Implements SEO meta tags and JSON-LD structured data on key pages

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React 18 |
| **Language** | TypeScript 5.9 |
| **Bundler / Dev server** | Vite 7 |
| **Compiler** | `@vitejs/plugin-react-swc` (SWC) |
| **Routing** | React Router DOM 7 |
| **Icons** | Lucide React |
| **Styling** | Plain CSS (`src/styles/site.css`) — no CSS framework |
| **Fonts** | Inter (body), Plus Jakarta Sans (headings) via Google Fonts |
| **Hosting** | Vercel (SPA rewrites configured) |
| **Node requirement** | Node.js ≥ 22 |

### NPM Scripts

```bash
npm run dev      # Start dev server on port 3000
npm run build    # Production build → build/
npm run preview  # Preview production build locally
```

---

## Project Structure

```
Tekzura/
├── index.html                 # HTML shell, font preconnects, default meta
├── package.json
├── vite.config.ts             # Vite config (port 3000, outDir: build)
├── vercel.json                # SPA rewrite rules for Vercel
├── public/                    # Static assets served at /
│   ├── favicon.png
│   ├── tekzura-mark.png
│   ├── team/                  # Team photos (.webp) + profile SVG fallbacks
│   ├── testimonials/          # Client portrait images
│   └── *.jpg                  # Hero, service, and case study images
├── src/
│   ├── main.tsx               # React entry point
│   ├── App.tsx                # Router, lazy-loaded pages, page loader
│   ├── content/
│   │   ├── site.ts            # Services, team, testimonials, blog, site config
│   │   └── portfolio.ts       # Portfolio categories, URLs, stats
│   ├── pages/                 # Route-level page components
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ServicesPage.tsx
│   │   ├── ServiceDetailPage.tsx
│   │   ├── WorkPage.tsx
│   │   ├── BlogPage.tsx
│   │   ├── ContactPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── components/site/       # Reusable UI building blocks
│   │   ├── SiteShell.tsx      # Header, footer, nav, CTA band
│   │   ├── PageElements.tsx   # Hero, headings, cards, checklists
│   │   ├── InteractiveSections.tsx
│   │   ├── TeamSections.tsx
│   │   ├── TestimonialsCarousel.tsx
│   │   ├── PortfolioDashboard.tsx
│   │   ├── PortfolioStats.tsx
│   │   └── Seo.tsx
│   └── styles/
│       └── site.css           # All styles (~1,270 lines)
└── build/                     # Production output (gitignored in practice)
```

---

## Getting Started

### Prerequisites

- Node.js 22 or later
- npm 8 or later

### Installation & development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm run preview
```

Output is written to `build/` (not the default Vite `dist/`).

---

## Architecture

### Application flow

```
index.html
    └── main.tsx (StrictMode)
            └── App.tsx (BrowserRouter)
                    └── Suspense (PageLoader fallback)
                            └── Routes
                                    └── SiteShell (layout)
                                            └── Outlet → lazy page component
```

### Code-splitting

All page components are **lazy-loaded** via `React.lazy()` in `App.tsx`. While a page chunk loads, a branded `PageLoader` is shown with the Tekzura mark and progress animation.

### Data model

The site is **content-driven**: almost all copy, services, team, portfolio URLs, and blog posts live in TypeScript files under `src/content/`. There is no CMS or backend API. Updates are made by editing source files and redeploying.

### State management

No global state library. Each page/component uses local React state (`useState`, `useEffect`, `useMemo`, `useRef`) and URL search params (`useSearchParams`) for filters.

---

## Routing & Navigation

### Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | HomePage | Main landing page |
| `/about` | AboutPage | Company story and team |
| `/services` | ServicesPage | Service directory |
| `/services/:serviceSlug` | ServiceDetailPage | Individual service detail |
| `/work` | WorkPage | Portfolio explorer |
| `/blog` | BlogPage | Insights listing + search |
| `/contact` | ContactPage | Contact and booking |
| `/home` | — | Redirects to `/` |
| `*` | NotFoundPage | 404 page |

### Service slugs

| Slug | Service |
|------|---------|
| `web-development` | Web Development |
| `ecommerce` | E-Commerce Solutions |
| `digital-marketing` | Digital Marketing |
| `wordpress` | WordPress Development |
| `automation-ai` | Automation & AI |
| `lead-generation` | Lead Generation |
| `data-entry` | Data Entry Services |

Invalid service slugs render the 404 page.

### URL query parameters

| Page | Parameter | Purpose |
|------|-----------|---------|
| `/work` | `category` | Active portfolio category (`digital-marketing`, `web-development`, `saas-products`, `shopify`, `wordpress`) |
| `/work` | `filter` | Subcategory or platform filter within a category |
| `/blog` | `q` | Search query for filtering articles |

### Header navigation

- **About** — `/about`
- **Services** — Mega-menu dropdown with all 7 services + link to `/services`
- **Work** — `/work`
- **Insights** — `/blog`
- **Contact** — `/contact`
- **Book a Strategy Call** — External Calendly link

Mobile navigation shows a hamburger menu with focus trapping and Escape-to-close.

---

## Pages

### Home (`/`)

The primary conversion page. Sections in order:

1. **Immersive hero** — Full-bleed image, headline, Calendly CTA, link to work, delivery model panel
2. **Capability rail** — Four pillars: Product & Web, Automation & AI, Commerce, Growth Systems
3. **Portfolio stats** — Animated counters + brand marquee
4. **Capability explorer** — Interactive tabbed dashboard (`variant="dashboard"`) for all services
5. **Process story** — Four-stage delivery process with tab selector
6. **Selected work** — First 2 case studies
7. **Testimonials** — Carousel with 22 client quotes
8. **Founder spotlight** — Muhammad Yasir profile and quote
9. **Common questions** — FAQ accordion
10. **Service matcher** — Goal-based service recommendation widget

**SEO:** Organization JSON-LD schema.

### About (`/about`)

- Page hero with team workshop image
- Perspective / philosophy split layout
- Four value cards: Clarity First, Shared Ownership, Built to Continue, Quality in the Details
- **Team showcase** — All team members grouped by department
- Remote collaboration band
- Common questions FAQ

### Services (`/services`)

- Page hero with CTA to Calendly
- **Capability explorer** — Directory variant (image + hoverable service list)
- Three **service path cards**: Build → Web, Operate → Automation, Grow → Lead Gen

### Service Detail (`/services/:serviceSlug`)

Dynamic page per service. Sections:

1. Hero with service image and CTAs
2. Problem / outcome grid
3. Deliverables checklist + technologies tag row
4. **Service delivery process** — Tabbed 5-stage process (mapped to service-specific labels)
5. Related case study (if one exists for that service)
6. FAQ (shared questions across services)

**SEO:** Service JSON-LD schema.

### Work (`/work`)

Portfolio hub with two major areas:

1. **Portfolio explorer**
   - Category tabs (keyboard-navigable: arrows, Home, End)
   - Category-specific **dashboard visual** (marketing, web, SaaS, commerce, WordPress)
   - Filter bar by subcategory/platform
   - Grid of **portfolio link cards** with live external links

2. **Featured delivery stories** — All 4 case studies

### Blog / Insights (`/blog`)

- Article grid with search (`?q=`)
- Filters by title, category, excerpt, and tags
- **Note:** Articles are display-only; there are no individual blog post routes or full article content pages.

### Contact (`/contact`)

- Booking panel (Calendly — recommended path)
- Direct contact: email, phone, address, business hours (Mon–Fri, 9 AM–6 PM PKT)
- Service inquiry grid — `mailto:` links with pre-filled subject and body per service

### 404 (`NotFoundPage`)

Shown for unknown routes and invalid service slugs. Link back to home.

---

## Shared Layout (SiteShell)

`SiteShell.tsx` wraps every page and provides:

| Feature | Behavior |
|---------|----------|
| **Scroll manager** | Scrolls to top on route change |
| **Route progress bar** | Animated gradient bar at top on navigation |
| **Skip link** | "Skip to Main Content" for keyboard users |
| **Sticky header** | Logo, nav, mega-menu, mobile menu, Calendly CTA |
| **Main outlet** | Page content |
| **CTA band** | Pre-footer call-to-action (Calendly + email) |
| **Footer** | Company links, service links, contact info, copyright |

Body class `menu-lock` is applied when mobile menu is open to prevent background scroll.

---

## Components

### `PageElements.tsx`

| Export | Purpose |
|--------|---------|
| `PageHero` | Standard page header with eyebrow, title, lead, optional visual and children |
| `SectionHeading` | Reusable section title block (left or center aligned) |
| `ServiceCard` | Service summary card with link |
| `CaseStudyCard` | Case study with image, tags, optional expand/collapse |
| `CheckList` | Bulleted list with check icons |

### `InteractiveSections.tsx`

| Export | Purpose |
|--------|---------|
| `Reveal` | Intersection-observer scroll reveal animation |
| `CapabilityExplorer` | Service browser — `dashboard` (home) or `directory` (services) variant |
| `ServiceDashboardVisual` | Per-service mock dashboard UI (internal) |
| `ProcessStory` | Home page 4-stage delivery process |
| `ServiceDeliveryProcess` | Service detail 5-stage tabbed process |
| `ServiceMatcher` | Goal picker → recommended service |

### `TeamSections.tsx`

| Export | Purpose |
|--------|---------|
| `TeamShowcase` | Grouped team gallery on About page |
| `FounderSpotlight` | Founder section on home page |
| `CommonQuestions` | FAQ accordion (used on Home and About) |

### `TestimonialsCarousel.tsx`

- Stack-style carousel showing 5 cards (active + adjacent)
- Auto-advances every 4 seconds
- Pauses on hover, focus, reduced motion, or hidden tab
- Keyboard: Arrow keys, Home, End
- Touch swipe support

### `PortfolioDashboard.tsx`

| Export | Purpose |
|--------|---------|
| `PortfolioDashboard` | Category-specific illustrated dashboard |
| `PortfolioLinkCard` | Individual project card with external link |

Dashboard variants: `marketing`, `web`, `saas`, `commerce`, `wordpress`.

### `PortfolioStats.tsx`

Animated stat counters and infinite brand marquee on the home page.

### `Seo.tsx`

Client-side meta tag management (title, description, Open Graph, canonical URL, JSON-LD).

---

## Content Layer

### `site.ts` — Core site data

**Exports:**

- `siteConfig` — Name, email, phone, address, Calendly URL, description
- `services` — Array of 7 `Service` objects
- `caseStudies` — Array of 4 `CaseStudy` objects
- `team` — Array of 15 `TeamMember` objects
- `testimonials` — Array of 22 `Testimonial` objects
- `blogPosts` — Array of 6 `BlogPost` objects
- TypeScript interfaces for all content types

### `portfolio.ts` — Portfolio data

**Exports:**

- `portfolioCategories` — 5 categories with accent colors and dashboard variants
- `portfolioEntries` — Auto-built from raw URL arrays (~170 entries)
- `portfolioStats` — Computed stats for the home page counters

**Portfolio entry pipeline:**

1. Raw URLs are defined per category in arrays (`digitalMarketing`, `webDevelopment`, etc.)
2. `buildEntry()` normalizes each URL:
   - Forces HTTPS
   - Detects staging (`stg.`, `vercel.app`)
   - Detects login-required (`sign-in`, `login`, `app.` subdomain)
   - Infers platform (Facebook, Instagram, LinkedIn, Shopify, etc.)
   - Auto-generates title from URL if not provided
3. Entries are tagged with `linkType`: `live`, `social`, `staging`, or `login`

---

## Services

Each service includes:

| Field | Description |
|-------|-------------|
| `slug` | URL identifier |
| `title` / `shortTitle` | Display names |
| `eyebrow` | Short tagline |
| `summary` | One-line description |
| `problem` | Pain point addressed |
| `outcome` | Desired result |
| `icon` | Lucide icon component |
| `image` / `imageAlt` | Hero/visual image |
| `deliverables` | Scope items (5 per service) |
| `technologies` | Tool/platform tags |
| `process` | 5 delivery stage labels (service-specific names) |
| `faq` | Shared FAQ array |

### Service process labels by service

| Service | Process stages |
|---------|----------------|
| Web Development | Discover → Design → Build → Validate → Launch |
| E-Commerce | Audit → Plan → Design → Integrate → Optimize |
| Digital Marketing | Research → Position → Launch → Measure → Improve |
| WordPress | Structure → Prototype → Develop → Migrate → Train |
| Automation & AI | Map → Prioritize → Prototype → Integrate → Monitor |
| Lead Generation | Define → Research → Build → Engage → Refine |
| Data Entry | Define → Prepare → Process → Review → Deliver |

---

## Portfolio & Case Studies

### Portfolio categories

| ID | Title | Projects (approx.) | Accent |
|----|-------|-------------------|--------|
| `digital-marketing` | Digital Marketing | ~56 | `#f79009` |
| `web-development` | Web Development | ~15 | `#155eef` |
| `saas-products` | SaaS Products | 5 | `#7f56d9` |
| `shopify` | Shopify | ~36 | `#0f9f8f` |
| `wordpress` | WordPress | ~58 | `#2e90fa` |

### Case studies (narrative)

| Title | Industry | Service |
|-------|----------|---------|
| Modern E-Commerce Experience | Retail | E-Commerce |
| Operations Automation Program | Professional Services | Automation & AI |
| Lead Generation Foundation | B2B Services | Lead Generation |
| Service Business Website Rebuild | Technology | Web Development |

Each case study has: challenge, solution, outcome, tags, and image.

### Home page stats

| Stat | Source |
|------|--------|
| Projects & Channels | `portfolioEntries.length` |
| Core Capabilities | Hardcoded `8` |
| Satisfied Clients | Hardcoded `160` |
| Countries & Markets | Hardcoded `6` |

---

## Team

15 members across four groups:

| Group | Members |
|-------|---------|
| **Leadership** | Muhammad Yasir (Founder & CEO) |
| **Engineering & Product** | Muhammad Abdullah Awais, Muhammad Danial Malik, Waleed Amin, Zohaib Zulfiqar, Muhammad Umer, Abdul Rehman, Maria Asghar, Faizan Haider |
| **Growth & Creative** | Mohammad Sajjad, Humaira Malik, Lubaba Muaaz, Nimrah Ashiq Hussain, Sana Nawaz |
| **Operations & Client Success** | Muhammad Rashid |

Members without a photo use gender-based SVG placeholders (`/team/profile-male.svg` or `/team/profile-female.svg`).

---

## Testimonials

22 client testimonials from USA, Canada, UK, Bahrain, Netherlands, and New Zealand. Each includes name, role, country, quote, and optional portrait image.

The carousel is used on the home page only.

---

## Blog / Insights

6 placeholder articles (no full content or detail pages):

| Title | Category | Date |
|-------|----------|------|
| The Future of AI in Business Automation | AI & Automation | 2024-12-10 |
| Building Scalable Web Applications | Web Development | 2024-12-08 |
| Mobile-First Design: Why It Matters | Design | 2024-12-05 |
| Maximizing ROI with Data-Driven Marketing | Marketing | 2024-12-03 |
| Cloud Infrastructure: A Practical Guide | Infrastructure | 2024-11-30 |
| The Power of Progressive Web Apps | Technology | 2024-11-28 |

---

## SEO

### Per-page SEO via `Seo` component

Each page sets:

- `<title>` — `{Page Title} | Tekzura` (home uses just `Tekzura`)
- `meta description`
- Open Graph: `og:title`, `og:description`, `og:type`, `og:url`
- `<link rel="canonical">`

### Structured data (JSON-LD)

| Page | Schema type |
|------|-------------|
| Home | `Organization` |
| Service detail | `Service` |

### Default meta in `index.html`

Base description, OG tags, favicon, apple-touch-icon, and Google Fonts are set in the HTML shell before React hydrates.

---

## Design System

All styles live in `src/styles/site.css`. Key design tokens:

```css
--ink: #0b1220        /* Primary dark / footer backgrounds */
--blue: #155eef       /* Primary brand / links / CTAs */
--blue-dark: #0f46b8
--teal: #0f9f8f       /* Secondary accent */
--soft: #f5f7fa       /* Section backgrounds */
--border: #d9e0ea
--text: #475467       /* Body text */
--muted: #667085      /* Secondary text */
--white: #ffffff
--success: #067647
--lime: #b6f36b       /* Accent highlights on dark sections */
--shadow: 0 12px 32px rgba(11, 18, 32, 0.08)
--container: 1180px   /* Max content width */
```

### Typography

- **Body:** Inter, 16px, line-height 1.6
- **Headings:** Plus Jakarta Sans, responsive `clamp()` sizes
- **h1:** up to 4.25rem, weight 800
- **h2:** up to 2.75rem, weight 700

### Layout

- Container: `min(calc(100% - 40px), 1180px)`
- Section padding: `104px 0`
- Section variants: `.section-soft` (light gray), `.section-ink` (dark)

### Buttons

| Class | Use |
|-------|-----|
| `.button-primary` | Blue filled CTA |
| `.button-secondary` | Outlined |
| `.button-light` | White on dark backgrounds |
| `.button-outline-light` | Outlined white on dark |

### Responsive behavior

- Desktop nav hidden below breakpoint; mobile hamburger menu shown
- Grids collapse to single column on smaller viewports
- Touch-friendly tap targets (`min-height: 44px` on nav buttons)
- `clamp()` typography scales fluidly

---

## Accessibility

Built-in accessibility features:

- Skip-to-content link
- Semantic landmarks (`header`, `main`, `footer`, `nav`)
- ARIA on tabs, carousels, mega-menu, and mobile nav (`aria-expanded`, `aria-selected`, `aria-controls`)
- Focus-visible outlines
- Keyboard navigation on tab lists (arrows, Home, End)
- Mobile menu focus trap
- `prefers-reduced-motion` respected in carousel and stat animations
- Screen-reader-only text (`.sr-only`)
- `aria-live` regions for dynamic result counts
- Meaningful `alt` text on content images; decorative images use `alt=""`

---

## Performance

- **Lazy-loaded routes** — Code-split per page
- **SWC compilation** — Fast builds via `@vitejs/plugin-react-swc`
- **Image hints** — `fetchPriority="high"` on hero images; `loading="lazy"` elsewhere
- **No source maps** in production build
- **ESBuild minification**
- **Build target:** ES2020
- **Intersection Observer** — Reveal animations only trigger once when visible

---

## Deployment

### Vercel

`vercel.json` configures:

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

The rewrite rule ensures client-side routes work on direct URL access.

### Deploy steps

1. Push to connected Git repository
2. Vercel runs `npm run build`
3. Serves static files from `build/`

For other hosts, serve `build/` as static files with a fallback to `index.html` for all routes.

---

## Maintenance Guide

### Add a new service

1. Add slug to `ServiceSlug` type in `src/content/site.ts`
2. Add full `Service` object to `services` array
3. Add service image to `public/`
4. Optionally add a related `CaseStudy` with matching `service` slug
5. Add mock dashboard UI in `ServiceDashboardVisual` inside `InteractiveSections.tsx` (optional but consistent with existing services)

### Add a portfolio project

Edit the appropriate raw URL array in `src/content/portfolio.ts`:

```typescript
const webDevelopment: RawPortfolioEntry[] = [
  // ...
  { url: 'https://example.com' },
  // Optional: { title: 'Custom Name', url: '...', subcategory: 'WordPress Projects' },
];
```

Entries are auto-processed by `buildEntry()`.

### Add a team member

Add to `team` array in `src/content/site.ts`:

```typescript
{
  name: 'Full Name',
  role: 'Job Title',
  image: '/team/filename.webp',  // optional
  width: 720,                    // if image provided
  height: 840,
  bio: 'Short bio.',
  linkedinUrl: 'https://linkedin.com/in/...',  // optional
  group: 'Engineering & Product',
  gender: 'male',  // or 'female' — used for placeholder if no image
}
```

### Add a testimonial

Add to `testimonials` array in `src/content/site.ts`. Place portrait at `public/testimonials/name.jpg` if available.

### Add a blog article

Add to `blogPosts` in `src/content/site.ts`. To support full articles, you would need to create a `BlogPostPage` route and add a `content` or `slug` field.

### Update contact info

Edit `siteConfig` in `src/content/site.ts`:

```typescript
export const siteConfig = {
  name: 'Tekzura',
  email: 'info@tekzura.com',
  phone: '+92 326 9379244',
  phoneHref: '+923269379244',
  address: 'Bahawalpur, Pakistan',
  calendly: 'https://calendly.com/yasirmalik2182/new-meeting',
  description: '...',
};
```

### Change site-wide styles

Edit CSS variables at the top of `src/styles/site.css` for global theme changes.

---

## Static Assets

Assets are served from `public/` at the site root (`/filename`).

### Required images (referenced in code)

| Path | Used for |
|------|----------|
| `/favicon.png` | Browser tab icon |
| `/tekzura-mark.png` | Logo, loader, apple-touch-icon |
| `/tech-studio-hero.jpg` | Home hero background |
| `/team-workshop.jpg` | About page hero |
| `/service-web-development.jpg` | Services, case studies, blog |
| `/service-growth.jpg` | Marketing service, case studies |
| `/service-data-operations.jpg` | Data entry service, blog |
| `/case-ecommerce.jpg` | E-commerce visuals |
| `/case-automation.jpg` | Automation visuals, contact hero |
| `/yasir.jpg` | Founder photo |
| `/team/*.webp` | Team member portraits |
| `/testimonials/*.jpg` | Client portraits |
| `/team/profile-male.svg` | Male placeholder avatar |
| `/team/profile-female.svg` | Female placeholder avatar |

> **Note:** `*.png` files are gitignored except `public/tekzura-mark.png`, `public/favicon.png`, and `design-assets/logo-original.png`. Ensure image assets exist locally and are deployed even if not tracked in git.

---

## Known Limitations

1. **No blog post detail pages** — Articles are cards only; clicking does not navigate to full content.
2. **No contact form** — Contact is via Calendly, email, and phone only.
3. **No CMS** — All content requires code changes and redeployment.
4. **No internationalization** — English only.
5. **No analytics integration** — Add Google Analytics or similar separately in `index.html` if needed.
6. **No automated tests** — No test suite is configured.

---

## Quick Reference — File to Feature Map

| To change… | Edit… |
|------------|-------|
| Company name, email, phone, Calendly | `src/content/site.ts` → `siteConfig` |
| Services copy and details | `src/content/site.ts` → `services` |
| Portfolio projects | `src/content/portfolio.ts` |
| Team members | `src/content/site.ts` → `team` |
| Testimonials | `src/content/site.ts` → `testimonials` |
| Blog articles | `src/content/site.ts` → `blogPosts` |
| Navigation / footer | `src/components/site/SiteShell.tsx` |
| Page content/layout | `src/pages/*.tsx` |
| Colors / typography | `src/styles/site.css` |
| Routes | `src/App.tsx` |
| SEO defaults | `index.html` + per-page `Seo` component |
| Deploy config | `vercel.json`, `vite.config.ts` |

---

*Last updated: June 2026 — Tekzura main website v1.0.0*
