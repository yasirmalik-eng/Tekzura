export type PortfolioCategoryId =
  | 'digital-marketing'
  | 'web-development'
  | 'saas-products'
  | 'shopify'
  | 'wordpress';

export type PortfolioPlatform =
  | 'Website'
  | 'Facebook'
  | 'Instagram'
  | 'LinkedIn'
  | 'Web App'
  | 'Shopify'
  | 'WordPress'
  | 'SaaS';

export type PortfolioLinkType = 'live' | 'social' | 'staging' | 'login';

export interface PortfolioEntry {
  title: string;
  url: string;
  category: PortfolioCategoryId;
  subcategory?: string;
  platform: PortfolioPlatform;
  linkType: PortfolioLinkType;
  isStaging: boolean;
  requiresLogin: boolean;
}

export interface PortfolioCategory {
  id: PortfolioCategoryId;
  title: string;
  description: string;
  dashboardVariant: 'marketing' | 'web' | 'saas' | 'commerce' | 'wordpress';
  accent: string;
}

export const portfolioCategories: PortfolioCategory[] = [
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Social media, community, campaign, and brand-channel work across Facebook, Instagram, and LinkedIn.',
    dashboardVariant: 'marketing',
    accent: '#f79009',
  },
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Public websites, product interfaces, and customer-facing web experiences built for credibility and conversion.',
    dashboardVariant: 'web',
    accent: '#155eef',
  },
  {
    id: 'saas-products',
    title: 'SaaS Products',
    description: 'Subscription products and software platforms designed around repeatable digital workflows.',
    dashboardVariant: 'saas',
    accent: '#7f56d9',
  },
  {
    id: 'shopify',
    title: 'Shopify',
    description: 'Commerce storefronts spanning consumer products, lifestyle brands, electronics, food, and wellness.',
    dashboardVariant: 'commerce',
    accent: '#0f9f8f',
  },
  {
    id: 'wordpress',
    title: 'WordPress',
    description: 'Content, corporate, commerce, agency, creator, healthcare, and real-estate experiences.',
    dashboardVariant: 'wordpress',
    accent: '#2e90fa',
  },
];

type RawPortfolioEntry = {
  url: string;
  subcategory?: string;
  title?: string;
};

const digitalMarketing: RawPortfolioEntry[] = [
  { url: 'https://www.instagram.com/_shanearab_' },
  { url: 'https://www.instagram.com/maxkempgroup' },
  { url: 'https://www.instagram.com/globalhillct' },
  { url: 'https://www.facebook.com/ITCentreRYK' },
  { url: 'https://www.instagram.com/itcentreryk/' },
  { url: 'https://www.facebook.com/skillsprint30/' },
  { url: 'https://www.instagram.com/skill_sprint30' },
  { url: 'https://www.facebook.com/cubiclecoworking/' },
  { url: 'https://www.instagram.com/cubicle.cowork' },
  { url: 'https://www.linkedin.com/in/cubicle-coworking-space/' },
  { url: 'https://www.facebook.com/hwtryk/' },
  { url: 'https://www.instagram.com/hwtechnologiez' },
  { url: 'https://www.facebook.com/profile.php?id=61572897291636' },
  { url: 'https://www.facebook.com/profile.php?id=100063859875449' },
  { url: 'https://www.instagram.com/consultancygateway' },
  { url: 'https://www.facebook.com/AmidECommerce/' },
  { url: 'https://www.instagram.com/amid.pk/' },
  { url: 'https://www.facebook.com/FajiraApp/' },
  { url: 'https://www.instagram.com/fajiraapp/' },
  { url: 'https://www.facebook.com/zobishbags/' },
  { url: 'https://www.instagram.com/__zobish__/' },
  { url: 'https://www.facebook.com/ccphs.ryk/' },
  { url: 'https://www.instagram.com/centralcollegeryk/' },
  { url: 'https://www.facebook.com/spite.pk/' },
  { url: 'https://www.instagram.com/spitexpo.pk/' },
  { url: 'https://www.facebook.com/GrowingRYK/' },
  { url: 'https://www.instagram.com/growingryk/' },
  { url: 'https://www.facebook.com/planhundred/' },
  { url: 'https://www.facebook.com/BinofApp/' },
  { url: 'https://www.instagram.com/binof.app/' },
  { url: 'https://www.facebook.com/Alphastp/' },
  { url: 'https://www.facebook.com/hwtitjobs/' },
  { url: 'https://www.facebook.com/womenintechryk/' },
  { url: 'https://www.facebook.com/Abkfoodspulpy/' },
  { url: 'https://www.instagram.com/abkpulpy/' },
  { url: 'https://www.facebook.com/LetsHirePro/' },
  { url: 'https://www.instagram.com/lets_hirepro/' },
  { url: 'https://www.facebook.com/profile.php?id=61558750903115' },
  { url: 'https://www.facebook.com/fitnesstogether' },
  { url: 'https://www.facebook.com/eaglekingconstructionllc' },
  { url: 'https://www.facebook.com/profile.php?id=100065196622839' },
  { url: 'https://www.facebook.com/southeastbuildingandshed' },
  { url: 'https://www.facebook.com/robsauto1' },
  { url: 'https://www.facebook.com/profile.php?id=100082302057693' },
  { url: 'https://www.facebook.com/buds1727' },
  { url: 'https://www.facebook.com/SGAttractions' },
  { url: 'https://www.facebook.com/NeverRideDirtyCT' },
  { url: 'https://www.instagram.com/therunwaylookstm' },
  { url: 'https://www.instagram.com/living_in_windsor' },
  { url: 'https://www.instagram.com/sweet_institute' },
  { url: 'https://www.facebook.com/profile.php?id=100064187943654' },
  { url: 'https://www.facebook.com/redneckingtrucker' },
  { url: 'https://www.facebook.com/chelseashousesoberliving' },
  { url: 'https://facebook.com/profile.php?id=100093486961827' },
  { url: 'https://www.facebook.com/backstagehotelsthlm' },
  { url: 'https://www.facebook.com/DrivingRich' },
];

const webDevelopment: RawPortfolioEntry[] = [
  { url: 'https://gpline.ie' },
  { url: 'https://stg-app.floline.io' },
  { url: 'https://app.mynextstep.jobs/sign-in' },
  { url: 'https://lightning-league-five.vercel.app/sign-in' },
  { url: 'https://mynextstep.jobs/' },
  { url: 'https://neojaleague.com/' },
  { url: 'https://www.gpline.ie/' },
  { url: 'https://www.northwalesrugby.com/' },
  { url: 'https://gronsdodgeball.nl/' },
  { url: 'https://app.mynextstep.jobs' },
  { url: 'https://stg.app2.mynextstep.jobs' },
  { url: 'https://lightningleague.com/' },
  { url: 'https://davidranalli.com/' },
  { url: 'https://www.solarhex.io/' },
  { url: 'https://table-mind-sigma.vercel.app/' },
  { url: 'https://www.skillsprint30.com/' },
];

const saasProducts: RawPortfolioEntry[] = [
  { url: 'https://microsaashq.com/' },
  { url: 'https://smallsaastools.com/' },
  { url: 'https://www.saasniche.com/' },
  { url: 'https://socialbu.com/' },
  { url: 'https://www.pincatch.com/' },
];

const shopify: RawPortfolioEntry[] = [
  { url: 'https://rootrituals.store/' },
  { url: 'https://dealxstore.com' },
  { url: 'https://bsmonline.pk' },
  { url: 'https://enyttrading.store' },
  { url: 'https://manlytshirt.com/' },
  { url: 'https://kaliteas.com' },
  { url: 'https://ebdors.com/' },
  { url: 'https://www.miraad.store/' },
  { url: 'https://streamingboxes.com/' },
  { url: 'https://www.kaged.com' },
  { url: 'https://d-signe.com/' },
  { url: 'https://shavestore.cl/' },
  { url: 'https://www.smokai.com' },
  { url: 'https://pyleusa.com' },
  { url: 'https://happyandpolly.com/' },
  { url: 'https://www.masterdynamic.com/' },
  { url: 'https://neomwellbeing.com' },
  { url: 'https://triipco.com' },
  { url: 'https://jaimen.com.au/' },
  { url: 'https://www.onesixtybakes.com/' },
  { url: 'https://cjjbeauty.com/' },
  { url: 'https://lovenzicaura.store/' },
  { url: 'https://www.rootedworld.pk/' },
  { url: 'https://netstock4.com/' },
  { url: 'https://buybyauron.com/' },
  { url: 'https://trendypick.store/' },
  { url: 'https://thebritishpantry.uk/' },
  { url: 'https://rydy.no' },
  { url: 'https://teetobuddy.com/' },
  { url: 'https://ochaia.co.uk/' },
  { url: 'https://ghotkipera.com/' },
  { url: 'https://herbsbydrshafiq.com/' },
  { url: 'https://voltrax.pk/' },
  { url: 'https://techzonecollection.com/' },
  { url: 'https://www.vizioluxsa.com/' },
];

const wordpress: RawPortfolioEntry[] = [
  { title: 'Funded King', url: 'https://fundedking.com/', subcategory: 'WordPress Projects' },
  { title: 'Aliman Home', url: 'https://alimanhome.com/', subcategory: 'WordPress Projects' },
  { title: 'Koiyo Media', url: 'https://koiyomedia.com/', subcategory: 'WordPress Projects' },
  { title: 'NextGen Migration', url: 'https://nextgenmigrationcs.com.au/', subcategory: 'WordPress Projects' },
  { title: 'Ameteck MEP Services', url: 'https://ametechmepservices.com/', subcategory: 'WordPress Projects' },
  { title: 'Fixit Abraj', url: 'https://fixitabraj.com/', subcategory: 'WordPress Projects' },
  { title: 'Aroma Scent', url: 'https://www.aromascent.pk/', subcategory: 'WordPress Projects' },
  { title: 'Engineered With AI', url: 'https://engineeredwith.ai/', subcategory: 'WordPress Projects' },
  { title: 'Cardiff Pest Control', url: 'https://cardiffpest.co.uk/', subcategory: 'WordPress Projects' },
  { title: 'Glamlook', url: 'https://glamlook.it/', subcategory: 'WordPress Projects' },
  { title: 'Gul Attire', url: 'https://gulattire.com/', subcategory: 'WordPress Projects' },
  { title: 'Allbirds', url: 'https://www.allbirds.com/', subcategory: 'WordPress Projects' },
  { title: 'Craftier', url: 'https://craftier.ae/', subcategory: 'WordPress Projects' },
  { title: 'ShapeWow', url: 'https://shapewow.com/', subcategory: 'WordPress Projects' },
  { title: 'Shop360', url: 'https://www.shop360.us/', subcategory: 'WordPress Projects' },
  { url: 'https://www.cloudways.com', subcategory: 'SaaS & Technology' },
  { url: 'https://ko-fi.com', subcategory: 'SaaS & Technology' },
  { url: 'https://runonflux.com', subcategory: 'SaaS & Technology' },
  { url: 'https://www.fountain.com', subcategory: 'SaaS & Technology' },
  { url: 'https://trustditto.com', subcategory: 'SaaS & Technology' },
  { url: 'https://10up.com', subcategory: 'Agencies & Development' },
  { url: 'https://humanmade.com', subcategory: 'Agencies & Development' },
  { url: 'https://rtcamp.com', subcategory: 'Agencies & Development' },
  { url: 'https://moderntribe.com', subcategory: 'Agencies & Development' },
  { url: 'https://wpsitecare.com', subcategory: 'Agencies & Development' },
  { url: 'https://aliabdaal.com', subcategory: 'Personal Brands & Creators' },
  { url: 'https://tim.blog', subcategory: 'Personal Brands & Creators' },
  { url: 'https://mikemcalister.com', subcategory: 'Personal Brands & Creators' },
  { url: 'https://chrislema.com', subcategory: 'Personal Brands & Creators' },
  { url: 'https://adamenfroy.com', subcategory: 'Personal Brands & Creators' },
  { url: 'https://www.transfergo.com', subcategory: 'Business & Corporate' },
  { url: 'https://www.iccwbo.org', subcategory: 'Business & Corporate' },
  { url: 'https://www.aspeninstitute.org', subcategory: 'Business & Corporate' },
  { url: 'https://www.wonde.com', subcategory: 'Business & Corporate' },
  { url: 'https://www.ecenglish.com', subcategory: 'Business & Corporate' },
  { url: 'https://www.nata.co.nz', subcategory: 'E-commerce' },
  { url: 'https://porterandyork.com', subcategory: 'E-commerce' },
  { url: 'https://woocommerce.com', subcategory: 'E-commerce' },
  { url: 'https://wpastra.com', subcategory: 'E-commerce' },
  { url: 'https://flatsome3.uxthemes.com', subcategory: 'E-commerce' },
  { url: 'https://juanfalibene.com', subcategory: 'Portfolio & Creative' },
  { url: 'https://morningtrain.dk', subcategory: 'Portfolio & Creative' },
  { url: 'https://anchour.com', subcategory: 'Portfolio & Creative' },
  { url: 'https://blocklayouts.com', subcategory: 'Portfolio & Creative' },
  { url: 'https://twentig.com', subcategory: 'Portfolio & Creative' },
  { url: 'https://hangrywoman.com', subcategory: 'Healthcare & Wellness' },
  { url: 'https://plantpoweredwithkristina.com', subcategory: 'Healthcare & Wellness' },
  { url: 'https://thymeandjoy.com', subcategory: 'Healthcare & Wellness' },
  { url: 'https://www.straycurls.com', subcategory: 'Healthcare & Wellness' },
  { url: 'https://www.forkintheroad.co', subcategory: 'Healthcare & Wellness' },
  { url: 'https://www.jillszeder.com', subcategory: 'Real Estate' },
  { url: 'https://www.homesbymarco.com', subcategory: 'Real Estate' },
  { url: 'https://www.gregoryrealestategroup.com', subcategory: 'Real Estate' },
  { url: 'https://www.urbanprovident.com', subcategory: 'Real Estate' },
  { url: 'https://www.luxuryhomesrealty.com', subcategory: 'Real Estate' },
];

function titleCase(value: string) {
  return value
    .replace(/^_+|_+$/g, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[._-]+/g, ' ')
    .replace(/\b(app|ai|saas|seo|crm|it|ryk|pk|uk|usa|llc)\b/gi, (match) => match.toUpperCase())
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function titleFromUrl(url: string) {
  const parsed = new URL(url);
  const hostname = parsed.hostname.replace(/^www\./, '');
  if (/facebook\.com$/i.test(hostname)) {
    const path = parsed.pathname.split('/').filter(Boolean)[0];
    return path === 'profile.php'
      ? `Business Page ${parsed.searchParams.get('id')?.slice(-4) || ''}`.trim()
      : titleCase(path || 'Business Page');
  }
  if (/instagram\.com$/i.test(hostname)) {
    return titleCase(parsed.pathname.split('/').filter(Boolean)[0] || 'Instagram');
  }
  if (/linkedin\.com$/i.test(hostname)) {
    return titleCase(parsed.pathname.split('/').filter(Boolean).at(-1) || 'LinkedIn');
  }
  const domain = hostname.split('.')[0];
  return titleCase(domain);
}

function portfolioKey(url: string) {
  const parsed = new URL(url);
  const hostname = parsed.hostname.replace(/^www\./, '').toLowerCase();
  const path = parsed.pathname.replace(/\/+$/, '').toLowerCase();
  return `${hostname}${path === '/' ? '' : path}`;
}

function platformFromUrl(url: string, category: PortfolioCategoryId): PortfolioPlatform {
  const hostname = new URL(url).hostname;
  if (hostname.includes('facebook.com')) return 'Facebook';
  if (hostname.includes('instagram.com')) return 'Instagram';
  if (hostname.includes('linkedin.com')) return 'LinkedIn';
  if (category === 'shopify') return 'Shopify';
  if (category === 'wordpress') return 'WordPress';
  if (category === 'saas-products') return 'SaaS';
  if (hostname.startsWith('app.') || hostname.startsWith('stg.') || hostname.startsWith('stg-')) return 'Web App';
  return 'Website';
}

function buildEntry(raw: RawPortfolioEntry, category: PortfolioCategoryId): PortfolioEntry {
  const normalizedUrl = raw.url.replace(/^http:\/\//, 'https://');
  const parsed = new URL(normalizedUrl);
  const isStaging = /(^|\.)stg[.-]|vercel\.app$/i.test(parsed.hostname);
  const requiresLogin = /sign-in|login/i.test(parsed.pathname) || parsed.hostname.startsWith('app.');
  const platform = platformFromUrl(normalizedUrl, category);
  const linkType: PortfolioLinkType =
    platform === 'Facebook' || platform === 'Instagram' || platform === 'LinkedIn'
      ? 'social'
      : isStaging
        ? 'staging'
        : requiresLogin
          ? 'login'
          : 'live';

  return {
    title: raw.title || titleFromUrl(normalizedUrl),
    url: normalizedUrl,
    category,
    subcategory: raw.subcategory,
    platform,
    linkType,
    isStaging,
    requiresLogin,
  };
}

export const portfolioEntries: PortfolioEntry[] = [
  ...digitalMarketing.map((entry) => buildEntry(entry, 'digital-marketing')),
  ...webDevelopment.map((entry) => buildEntry(entry, 'web-development')),
  ...saasProducts.map((entry) => buildEntry(entry, 'saas-products')),
  ...shopify.map((entry) => buildEntry(entry, 'shopify')),
  ...wordpress.map((entry) => buildEntry(entry, 'wordpress')),
]
  .filter((entry) => !entry.isStaging && !entry.requiresLogin)
  .filter((entry, index, entries) => entries.findIndex((item) => portfolioKey(item.url) === portfolioKey(entry.url)) === index);

export const portfolioStats = {
  entries: 230,
  categories: 10,
  testimonials: 160,
  countries: 6,
};
