/**
 * Single source of truth for Tanaka Enterprises: identity, routes and the
 * schema.org entity graph.
 *
 * Imported by:
 *   - src/lib/seo.ts        (runtime <head> / JSON-LD)
 *   - scripts/prerender.mjs (static HTML per route + sitemaps)
 *
 * Facts here are taken from the canonical record on tanakagaadzikwa.com so the
 * two properties describe the same person and the same ventures. Any divergence
 * between them weakens both.
 */

import { PHOTOS, PHOTO_LICENSE } from './photoGallery.js';

export const SITE = {
  /*
   * ⚠️ CHANGE THIS WHEN YOU BUY A DOMAIN.
   * tanakaenterprises.com is NOT yours — it currently resolves to a US real
   * estate software company. The only working host is the Vercel deployment.
   * Update `origin` below, and everything (canonical, OG, sitemaps, JSON-LD)
   * follows automatically.
   */
  origin: 'https://tanaka-enterprises.vercel.app',
  name: 'Tanaka Enterprises',
  legalName: 'Tanaka Enterprises',
  siteName: 'Tanaka Enterprises',
  title: 'Tanaka Enterprises — Software built with intent',
  shortTitle: 'Tanaka Enterprises',
  description:
    'Tanaka Enterprises is the software holding company founded by Tanaka Gaadzikwa, the Zimbabwean entrepreneur and CEO of LINKUP. We build calm, private, time-respecting products — starting with LINKUP.',
  tagline: 'Software built with intent.',
  founder: 'Tanaka Gaadzikwa',
  location: 'Harare, Zimbabwe',
  country: 'ZW',
  email: 'tanakaprince49@gmail.com',
  phone: '+263780011810',
  whatsapp: 'https://wa.me/263780011810',
  twitter: '@TGaadzikwa',
  logo: '/favicon.svg',
  locale: 'en_US',
  language: 'en',
  founded: '2024-01-01',
};

export const IDS = {
  org: `${SITE.origin}/#organization`,
  person: `${SITE.origin}/#person`,
  website: `${SITE.origin}/#website`,
  linkup: `${SITE.origin}/#linkup`,
};

/* ── The founder. Mirrors the Person node on tanakagaadzikwa.com ───────── */

export const PERSON = {
  '@type': 'Person',
  '@id': IDS.person,
  name: 'Tanaka Gaadzikwa',
  givenName: 'Tanaka',
  additionalName: 'Prince',
  familyName: 'Gaadzikwa',
  alternateName: [
    'Tanaka Prince Gaadzikwa',
    'Prince Gaadzikwa',
    'Startup Cupid',
    'The Minister of AI',
    'Tanaka Gahadzikwa',
  ],
  jobTitle: 'Founder & CEO of LINKUP',
  description:
    "Tanaka Gaadzikwa is a Zimbabwean entrepreneur, software builder and the founder and CEO of LINKUP, an AI-powered co-founder matchmaking platform built in Harare. He is known in the startup community as the 'Startup Cupid' and 'The Minister of AI'.",
  birthDate: '2010-11-20',
  nationality: { '@type': 'Country', name: 'Zimbabwe' },
  homeLocation: { '@type': 'Place', name: 'Harare, Zimbabwe' },
  address: { '@type': 'PostalAddress', addressLocality: 'Harare', addressCountry: 'ZW' },
  url: 'https://www.tanakagaadzikwa.com/',
  image: PHOTOS.slice(0, 8).map((p) => `${SITE.origin}${p.src}`),
  email: `mailto:${SITE.email}`,
  worksFor: { '@id': IDS.org },
  founderOf: [{ '@id': IDS.org }, { '@id': IDS.linkup }],
  knowsAbout: [
    'Entrepreneurship',
    'Artificial Intelligence',
    'Software Engineering',
    'Product Design',
    'Startup Matchmaking',
    'African Startups',
  ],
  knowsLanguage: ['en', 'sn'],
  sameAs: [
    'https://www.tanakagaadzikwa.com/',
    'https://linkupbuild.com/',
    'https://x.com/TGaadzikwa',
    'https://instagram.com/talala2694',
    'https://youtube.com/@neverletbrocook0',
    'https://www.linkedin.com/in/tanaka-gaadzikwa-linkup/',
    'https://t.me/tanaka_93',
    'https://play.google.com/store/apps/details?id=com.tana.linkup',
  ],
};

/* ── The holding company ──────────────────────────────────────────────── */

export const ORGANIZATION = {
  '@type': 'Organization',
  '@id': IDS.org,
  name: 'Tanaka Enterprises',
  alternateName: ['Tanaka Enterprises Software Holdings'],
  url: `${SITE.origin}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE.origin}${SITE.logo}`,
    width: 512,
    height: 512,
  },
  description: SITE.description,
  founder: { '@id': IDS.person },
  foundingDate: SITE.founded,
  foundingLocation: { '@type': 'Place', name: 'Harare, Zimbabwe' },
  slogan: SITE.tagline,
  email: SITE.email,
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 1 },
  knowsAbout: ['Software engineering', 'Artificial intelligence', 'Product design', 'Privacy-first architecture'],
  sameAs: ['https://www.tanakagaadzikwa.com/', 'https://linkupbuild.com/'],
  contactPoint: {
    '@type': 'ContactPoint',
    email: SITE.email,
    contactType: 'business enquiries',
    availableLanguage: ['English', 'Shona'],
  },
};

/* ── LINKUP, the live product ─────────────────────────────────────────── */

export const LINKUP = {
  '@type': ['SoftwareApplication', 'Organization'],
  '@id': IDS.linkup,
  name: 'LINKUP',
  alternateName: ['Linky AI', 'linkupbuild'],
  url: 'https://linkupbuild.com/',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Android, Web',
  description:
    'LINKUP is an AI-powered networking and co-founder matchmaking platform built by Tanaka Gaadzikwa that helps founders, developers and designers find collaborators, with the Linky AI assistant.',
  founder: { '@id': IDS.person },
  parentOrganization: { '@id': IDS.org },
  sameAs: [
    'https://linkupbuild.com/',
    'https://play.google.com/store/apps/details?id=com.tana.linkup',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export const WEBSITE = {
  '@type': 'WebSite',
  '@id': IDS.website,
  url: `${SITE.origin}/`,
  name: SITE.siteName,
  publisher: { '@id': IDS.org },
  inLanguage: 'en',
};

/* ── Routes ───────────────────────────────────────────────────────────── */

export const ROUTES = [
  {
    path: '/',
    priority: 1.0,
    changefreq: 'monthly',
    title: 'Tanaka Enterprises — Software built with intent',
    description:
      'Tanaka Enterprises is the software holding company founded by Tanaka Gaadzikwa, the Zimbabwean entrepreneur behind LINKUP. Calm, private, time-respecting software built from Harare.',
    keywords:
      'Tanaka Enterprises, Tanaka Gaadzikwa, LINKUP, Zimbabwe software company, Harare startup, Startup Cupid, Minister of AI, calm software, intentional technology',
    schema: 'home',
    nav: 'Home',
  },
  {
    path: '/ventures',
    priority: 0.9,
    changefreq: 'monthly',
    title: 'Ventures — LINKUP and the Tanaka Enterprises portfolio',
    description:
      'The ventures of Tanaka Enterprises: LINKUP, the AI co-founder matchmaking platform live on Android and web, and the products in development behind it.',
    keywords:
      'Tanaka Enterprises ventures, LINKUP app, AI co-founder matching, Linky AI, Zimbabwe tech products',
    schema: 'ventures',
    nav: 'Ventures',
  },
  {
    path: '/about',
    priority: 0.8,
    changefreq: 'monthly',
    title: 'About — the Tanaka Enterprises thesis',
    description:
      'Why Tanaka Enterprises exists: software that respects attention and treats user time as the most valuable resource in the world. Founded by Tanaka Gaadzikwa in Harare, Zimbabwe.',
    keywords:
      'Tanaka Enterprises about, Tanaka Gaadzikwa biography, calm software philosophy, Zimbabwe entrepreneur',
    schema: 'about',
    nav: 'About',
  },
  {
    path: '/journal',
    priority: 0.8,
    changefreq: 'weekly',
    title: 'The Journal — building software with intent',
    description:
      'Notes on building LINKUP, designing calm interfaces, privacy-first architecture and what it takes to ship software from Harare, Zimbabwe.',
    keywords:
      'Tanaka Enterprises journal, build in public, Zimbabwe tech blog, AI startup journal',
    schema: 'journal',
    nav: 'Journal',
  },
  {
    path: '/contact',
    priority: 0.7,
    changefreq: 'yearly',
    title: 'Contact Tanaka Enterprises — partnerships and press',
    description:
      'Get in touch with Tanaka Gaadzikwa and Tanaka Enterprises for partnerships, investment, press or speaking. Email, WhatsApp and LinkedIn.',
    keywords:
      'contact Tanaka Enterprises, Tanaka Gaadzikwa contact, LINKUP press, Zimbabwe startup contact',
    schema: 'contact',
    nav: 'Contact',
  },
  {
    path: '/press',
    priority: 0.4,
    changefreq: 'yearly',
    title: 'Tanaka Gaadzikwa photos and press kit',
    description:
      'The official photo library of Tanaka Gaadzikwa, founder of Tanaka Enterprises and CEO of LINKUP. Free to use for editorial coverage with credit.',
    keywords:
      'Tanaka Gaadzikwa photos, Tanaka Gaadzikwa press kit, LINKUP founder photo, Zimbabwe entrepreneur photos',
    schema: 'press',
    image: `${SITE.origin}/images/tanaka/tanaka-gaadzikwa-beanie-field-smiling.jpg`,
  },
];

/* ── Graph builders ───────────────────────────────────────────────────── */

export const absoluteUrl = (path) => `${SITE.origin}${path === '/' ? '/' : path}`;

export function breadcrumbList(path, label) {
  const items = [{ name: 'Home', url: `${SITE.origin}/` }];
  if (path !== '/') items.push({ name: label, url: absoluteUrl(path) });
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildPageGraph(path) {
  const route = ROUTES.find((r) => r.path === path) || ROUTES[0];
  const primaryImage = route.image || `${SITE.origin}${PHOTOS[1].src}`;

  const graph = [
    {
      '@type': 'WebPage',
      '@id': `${absoluteUrl(path)}#webpage`,
      url: absoluteUrl(path),
      name: route.title,
      description: route.description,
      isPartOf: { '@id': IDS.website },
      about: { '@id': IDS.org },
      primaryImageOfPage: { '@id': `${absoluteUrl(path)}#primaryimage` },
      breadcrumb: { '@id': `${absoluteUrl(path)}#breadcrumb` },
      inLanguage: 'en',
    },
    {
      '@type': 'ImageObject',
      '@id': `${absoluteUrl(path)}#primaryimage`,
      url: primaryImage,
      contentUrl: primaryImage,
      caption: `${SITE.name} — ${route.title}`,
      creator: { '@id': IDS.person },
      representativeOfPage: true,
    },
    breadcrumbList(path, route.nav || route.title.split('|')[0].trim()),
    WEBSITE,
    ORGANIZATION,
    PERSON,
    LINKUP,
  ];

  if (route.schema === 'home' || route.schema === 'about') {
    graph.push({
      '@type': 'AboutPage',
      '@id': `${absoluteUrl(path)}#aboutpage`,
      url: absoluteUrl(path),
      name: route.title,
      mainEntity: { '@id': IDS.person },
      about: { '@id': IDS.org },
    });
  }

  if (route.schema === 'ventures') {
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${absoluteUrl('/ventures')}#collection`,
      url: absoluteUrl('/ventures'),
      name: 'Ventures of Tanaka Enterprises',
      about: { '@id': IDS.org },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: 3,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@type': 'SoftwareApplication',
              name: 'LINKUP',
              url: 'https://linkupbuild.com/',
              description:
                'AI-powered co-founder and collaborator matchmaking platform with the Linky AI assistant, live on Android and web.',
              author: { '@id': IDS.person },
              publisher: { '@id': IDS.org },
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Android, Web',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            },
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@type': 'WebSite',
              name: 'tanakagaadzikwa.com',
              url: 'https://www.tanakagaadzikwa.com/',
              description:
                'The personal site, biography and journal of Tanaka Gaadzikwa.',
              author: { '@id': IDS.person },
            },
          },
        ],
      },
    });
  }

  if (route.schema === 'journal') {
    graph.push({
      '@type': 'Blog',
      '@id': `${absoluteUrl('/journal')}#blog`,
      url: absoluteUrl('/journal'),
      name: 'The Tanaka Enterprises Journal',
      description: route.description,
      publisher: { '@id': IDS.org },
      author: { '@id': IDS.person },
      inLanguage: 'en',
    });
  }

  if (route.schema === 'contact') {
    graph.push({
      '@type': 'ContactPage',
      '@id': `${absoluteUrl('/contact')}#contactpage`,
      url: absoluteUrl('/contact'),
      name: route.title,
      mainEntity: {
        '@type': 'Organization',
        '@id': IDS.org,
        name: SITE.name,
        email: SITE.email,
        founder: { '@id': IDS.person },
      },
    });
  }

  if (route.schema === 'press') {
    graph.push({
      '@type': ['CollectionPage', 'ImageGallery'],
      '@id': `${absoluteUrl('/press')}#gallery`,
      url: absoluteUrl('/press'),
      name: `${SITE.founder} — official photo library`,
      description: route.description,
      about: { '@id': IDS.person },
      license: PHOTO_LICENSE.url,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: PHOTOS.length,
        itemListElement: PHOTOS.map((photo, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'ImageObject',
            '@id': `${SITE.origin}${photo.src}#image`,
            contentUrl: `${SITE.origin}${photo.src}`,
            url: `${SITE.origin}${photo.src}`,
            name: photo.title,
            caption: photo.caption,
            description: photo.description,
            width: { '@type': 'QuantitativeValue', value: photo.width, unitCode: 'E37' },
            height: { '@type': 'QuantitativeValue', value: photo.height, unitCode: 'E37' },
            encodingFormat: 'image/jpeg',
            datePublished: photo.datePublished,
            creditText: photo.creditText,
            copyrightNotice: photo.copyrightNotice,
            license: PHOTO_LICENSE.url,
            creator: { '@id': IDS.person },
            about: { '@id': IDS.person },
            keywords: photo.keywords.join(', '),
          },
        })),
      },
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

export default { SITE, IDS, PERSON, ORGANIZATION, LINKUP, WEBSITE, ROUTES, buildPageGraph };
