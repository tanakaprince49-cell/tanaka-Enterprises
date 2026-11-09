/**
 * Build-time prerenderer.
 *
 * The app is a React SPA, so the HTML shipped to a crawler is an empty
 * <div id="root"></div> unless something puts content there. This runs after
 * `vite build` and writes a fully populated HTML file per route:
 *
 *   dist/index.html          -> /
 *   dist/ventures/index.html -> /ventures
 *   dist/journal/index.html  -> /journal
 *   ...
 *
 * Each file gets its own title, description, canonical, OpenGraph/Twitter
 * tags, a self-contained schema.org @graph and real readable content with
 * internal links. React still boots and replaces it for human visitors.
 *
 * It also regenerates sitemap.xml, sitemap-images.xml and robots.txt from the
 * same route list.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { ROUTES, SITE, PERSON, ORGANIZATION, buildPageGraph } from '../data/siteConfig.js';
import { PHOTOS, PHOTO_LICENSE } from '../data/photoGallery.js';
import { VENTURES } from '../data/ventures.js';
import { POSTS_BY_DATE } from '../data/journal.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('[prerender] dist/index.html not found — run `vite build` first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');
const today = new Date().toISOString().slice(0, 10);

const esc = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/* ── Head ─────────────────────────────────────────────────────────────── */

const stripManagedHead = (html) =>
  html
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta[^>]+name="(description|keywords|author|robots|googlebot|twitter:[^"]+)"[^>]*>/gi, '')
    .replace(/<meta[^>]+property="(og:[^"]+|profile:[^"]+)"[^>]*>/gi, '')
    .replace(/<link[^>]+rel="canonical"[^>]*>/gi, '')
    .replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '');

const buildHead = (route) => {
  const url = route.path === '/' ? `${SITE.origin}/` : `${SITE.origin}${route.path}`;
  const image = route.image || `${SITE.origin}/images/tanaka/tanaka-gaadzikwa-beanie-field-smiling.jpg`;
  const ogType = route.schema === 'home' || route.schema === 'about' ? 'profile' : 'website';

  return `
    <title>${esc(route.title)}</title>
    <meta name="description" content="${esc(route.description)}" />
    <meta name="author" content="${esc(SITE.founder)}" />
    <meta name="keywords" content="${esc(route.keywords || '')}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${url}" />

    <meta property="og:type" content="${ogType}" />
    <meta property="og:site_name" content="${esc(SITE.siteName)}" />
    <meta property="og:locale" content="${SITE.locale}" />
    <meta property="og:title" content="${esc(route.title)}" />
    <meta property="og:description" content="${esc(route.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:alt" content="${esc(`${SITE.name} — ${route.title}`)}" />
    ${ogType === 'profile' ? `<meta property="profile:first_name" content="Tanaka" />
    <meta property="profile:last_name" content="Gaadzikwa" />` : ''}

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="${SITE.twitter}" />
    <meta name="twitter:creator" content="${SITE.twitter}" />
    <meta name="twitter:title" content="${esc(route.title)}" />
    <meta name="twitter:description" content="${esc(route.description)}" />
    <meta name="twitter:image" content="${image}" />

    <script type="application/ld+json" id="page-ldjson">
${JSON.stringify(buildPageGraph(route.path), null, 2)}
    </script>`;
};

/* ── Crawlable body per route ─────────────────────────────────────────── */

const NAV = `
  <nav aria-label="Primary">
    <a href="/">Home</a> ·
    <a href="/ventures">Ventures</a> ·
    <a href="/about">About</a> ·
    <a href="/journal">Journal</a> ·
    <a href="/contact">Contact</a>
  </nav>`;

const SOCIALS = PERSON.sameAs
  .filter((url) => !url.includes('tanakagaadzikwa.com') && !url.includes('linkupbuild'))
  .map((url) => `<a href="${esc(url)}" rel="me noopener">${esc(new URL(url).hostname.replace('www.', ''))}</a>`)
  .join(' · ');

const ventureMarkup = () =>
  VENTURES.map(
    (v) => `<article>
      <h3><a href="${v.href || '/ventures'}">${esc(v.name)}</a> — ${esc(v.statusLabel)}</h3>
      <p><strong>${esc(v.tagline)}</strong></p>
      <p>${esc(v.description)}</p>
      <p><small>${esc(v.role)} · ${esc(v.year)}${v.platform ? ` · ${esc(v.platform)}` : ''}</small></p>
    </article>`
  ).join('\n');

const journalMarkup = () =>
  POSTS_BY_DATE.map(
    (post) => `<article id="${post.slug}">
      <h3>${esc(post.title)}</h3>
      <p><small>${esc(post.category)} · ${esc(post.displayDate)} · ${esc(post.readTime)}</small></p>
      <p><em>${esc(post.excerpt)}</em></p>
      ${post.body.map((p) => `<p>${esc(p)}</p>`).join('\n')}
    </article>`
  ).join('\n');

const pressMarkup = () =>
  PHOTOS.map(
    (photo, index) => `<figure id="${photo.id}">
      <img src="${photo.src}" alt="${esc(photo.alt)}" width="${photo.width}" height="${photo.height}" loading="${index < 3 ? 'eager' : 'lazy'}" decoding="async" />
      <figcaption>
        <h3>${esc(photo.title)}</h3>
        <p>${esc(photo.caption)}</p>
        <p>${esc(photo.description)}</p>
        <p><small>${esc(photo.category)} · ${photo.width}×${photo.height} · Credit: ${esc(photo.creditText)}</small></p>
      </figcaption>
    </figure>`
  ).join('\n');

const BODY = {
  home: `
    <header>
      <figure>
        <img src="/images/tanaka/tanaka-gaadzikwa-beanie-field-smiling.jpg" alt="Tanaka Gaadzikwa, founder of Tanaka Enterprises and CEO of LINKUP, smiling in a black beanie in a maize field in Zimbabwe" width="960" height="1280" fetchpriority="high" decoding="async" />
        <figcaption>Tanaka Gaadzikwa — founder, Tanaka Enterprises. Harare, Zimbabwe.</figcaption>
      </figure>
      <h1>Tanaka Enterprises — software built with intent</h1>
      <p>Tanaka Enterprises is the software holding company founded by <strong>Tanaka Gaadzikwa</strong>, the Zimbabwean entrepreneur, software builder and founder &amp; CEO of LINKUP known as the <em>Startup Cupid</em> and <em>The Minister of AI</em>. We build calm, private, time-respecting products from Harare, Zimbabwe.</p>
    </header>
    <section>
      <h2>Operating principles</h2>
      <ul>
        <li><strong>Respect the clock</strong> — every product has to justify the slice of someone's life it asks for. No streaks, no engagement bait, no dark patterns.</li>
        <li><strong>Default to private</strong> — collect the least possible, never sell it. Privacy is the first architectural decision, not a settings page.</li>
        <li><strong>Ship, then refine</strong> — the unglamorous work between prototype and product is the actual work.</li>
      </ul>
    </section>
    <section>
      <h2>Ventures</h2>
      ${ventureMarkup()}
      <p><a href="/ventures">See the full portfolio</a></p>
    </section>
    <section>
      <h2>Right now</h2>
      <ul>
        <li>Building the LINKUP cohort beta, refining the AI matchmaking engine.</li>
        <li>LINKUP selected for LvlUp Ventures Power of the Pitch Week, 7–11 December 2026.</li>
        <li>Running weekend builder sessions in Harare for students and independent developers.</li>
      </ul>
    </section>
    <section>
      <h2>From the journal</h2>
      <ul>
        ${POSTS_BY_DATE.slice(0, 3)
          .map((p) => `<li><a href="/journal#${p.slug}">${esc(p.title)}</a> — ${esc(p.excerpt)}</li>`)
          .join('\n        ')}
      </ul>
    </section>
    <footer><p>Profiles: ${SOCIALS}</p></footer>`,

  ventures: `
    <header>
      <h1>Ventures of Tanaka Enterprises</h1>
      <p>A short portfolio, kept honest. Products that are not live say so rather than linking to a dead page.</p>
    </header>
    <section>${ventureMarkup()}</section>
    <section>
      <h2>How something earns a place here</h2>
      <ol>
        <li>It solves a real friction, not a feature looking for a problem.</li>
        <li>It can be explained in one line. Sounding complicated is not sophistication.</li>
        <li>It survives the attention test: the business model can be explained to a user without hedging.</li>
      </ol>
    </section>
    <p><a href="/contact">Start a conversation</a> · <a href="/about">The thesis</a></p>`,

  about: `
    <header>
      <h1>About Tanaka Enterprises — the thesis</h1>
      <p>Almost every product optimises for how long it can keep you. Tanaka Enterprises exists to build the opposite kind of software: the kind that finishes its job and gets out of the way.</p>
    </header>
    <figure>
      <img src="/images/tanaka/tanaka-gaadzikwa-hoodie-front-portrait.jpg" alt="Portrait of Tanaka Gaadzikwa, Zimbabwean entrepreneur and founder of Tanaka Enterprises" width="576" height="1280" loading="lazy" decoding="async" />
      <figcaption>Tanaka Gaadzikwa, founder of Tanaka Enterprises and CEO of LINKUP.</figcaption>
    </figure>
    <section>
      <h2>A holding company for software that behaves</h2>
      <p>I am <strong>Tanaka Gaadzikwa</strong> (full name Tanaka Prince Gaadzikwa), a software builder from Harare, Zimbabwe. I started Tanaka Enterprises after noticing the pattern that the products making the most money were usually the ones respecting people the least.</p>
      <p>My main work is <strong>LINKUP</strong>, an AI platform that matches founders with the collaborators who complete them — the reason the community calls me the <em>Startup Cupid</em>, and, for the focus on applied AI, <em>The Minister of AI</em>.</p>
      <p>Tanaka Enterprises is the roof over that and whatever comes next. It is deliberately small: one product people trust beats five that people tolerate.</p>
      <p>Being based in Zimbabwe is part of the story, not a limitation on it. The distance from the usual tech corridors removes the noise, and what is left is the work.</p>
    </section>
    <section>
      <h2>The record</h2>
      <ul>
        <li><strong>Full name:</strong> Tanaka Prince Gaadzikwa</li>
        <li><strong>Role:</strong> Founder, Tanaka Enterprises; Founder &amp; CEO, LINKUP</li>
        <li><strong>Based in:</strong> Harare, Zimbabwe (CAT, UTC+2)</li>
        <li><strong>Known as:</strong> Startup Cupid, The Minister of AI</li>
        <li><strong>Languages:</strong> English, Shona</li>
      </ul>
    </section>
    <section>
      <h2>What I will and will not build</h2>
      <ul>
        <li><strong>No dark patterns.</strong> Nothing that makes it hard to leave, cancel, delete or understand.</li>
        <li><strong>AI that reduces work.</strong> Applied AI should remove steps, not add a chat box to everything.</li>
        <li><strong>Boring infrastructure.</strong> Excitement belongs in the product, not the stack.</li>
      </ul>
    </section>
    <footer>
      <p>More: <a href="https://www.tanakagaadzikwa.com/">full biography at tanakagaadzikwa.com</a> · <a href="https://linkupbuild.com/">LINKUP</a> · <a href="/journal">journal</a></p>
      <p>Profiles: ${SOCIALS}</p>
    </footer>`,

  journal: `
    <header>
      <h1>The Tanaka Enterprises Journal</h1>
      <p>Notes on building software with intent: engineering decisions, product arguments and the parts that did not work.</p>
    </header>
    <section>${journalMarkup()}</section>
    <p><a href="/ventures">The ventures</a> · <a href="/about">About the founder</a> · <a href="/contact">Get in touch</a></p>`,

  contact: `
    <header>
      <h1>Contact Tanaka Enterprises</h1>
      <p>Partnerships, investment, press, speaking or a genuinely good argument about product design.</p>
    </header>
    <ul>
      <li><strong>Email:</strong> <a href="mailto:${SITE.email}">${SITE.email}</a></li>
      <li><strong>WhatsApp:</strong> <a href="${SITE.whatsapp}" rel="noopener">+263 78 001 1810</a></li>
      <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/tanaka-gaadzikwa-linkup/" rel="me noopener">tanaka-gaadzikwa-linkup</a></li>
      <li><strong>X:</strong> <a href="https://x.com/TGaadzikwa" rel="me noopener">@TGaadzikwa</a></li>
      <li><strong>Based in:</strong> Harare, Zimbabwe (CAT, UTC+2)</li>
    </ul>
    <p>For the full biography, press kit and photography see <a href="https://www.tanakagaadzikwa.com/">tanakagaadzikwa.com</a> or the <a href="/press">press library</a>.</p>`,

  press: `
    <header>
      <h1>Tanaka Gaadzikwa photos &amp; press kit</h1>
      <p>The official photo library of <strong>Tanaka Gaadzikwa</strong>, founder of Tanaka Enterprises and CEO of LINKUP. ${PHOTOS.length} high-resolution photographs, free to publish with a credit.</p>
    </header>
    <section>
      <h2>Every official photo of Tanaka Gaadzikwa</h2>
      ${pressMarkup()}
    </section>
    <section>
      <h2>Using these photographs</h2>
      <p>Credit “Tanaka Gaadzikwa” and, where the frame is watermarked, “Photography by TAKEPHOTOS”. Images may not be used to advertise a product or imply an endorsement.</p>
      <p>Licence: <a href="${PHOTO_LICENSE.url}">${esc(PHOTO_LICENSE.name)}</a>. For originals, email <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
    </section>
    <footer><p><a href="/about">Biography</a> · <a href="/ventures">Ventures</a> · <a href="/contact">Press enquiries</a></p></footer>`,
};

/* ── Write the pages ──────────────────────────────────────────────────── */

const PRERENDER_CSS = `
  [data-prerender]{max-width:56rem;margin:0 auto;padding:2rem 1.5rem;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;color:#e2e8f0;background:#05070c;line-height:1.75}
  [data-prerender] h1{font-size:2rem;line-height:1.15;margin:0 0 .85rem;font-weight:650;letter-spacing:-.03em}
  [data-prerender] h2{font-size:1.3rem;margin:2rem 0 .6rem;font-weight:600;letter-spacing:-.02em}
  [data-prerender] h3{font-size:1.05rem;margin:1.4rem 0 .4rem;font-weight:600}
  [data-prerender] p{margin:0 0 .9rem}
  [data-prerender] ul,[data-prerender] ol{margin:0 0 1rem 1.25rem}
  [data-prerender] li{margin:.3rem 0}
  [data-prerender] a{color:#38bdf8;text-decoration:underline}
  [data-prerender] nav{display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:1.5rem;font-size:.9rem}
  [data-prerender] figure{margin:0 0 2rem}
  [data-prerender] img{max-width:100%;height:auto;border-radius:.9rem}`;

const buildBody = (route) => {
  const content = BODY[route.schema] || BODY.home;
  return `
  <div id="root">
    <div data-prerender>
      <style>${PRERENDER_CSS}</style>
      ${NAV}
      ${content}
    </div>
  </div>`;
};

let written = 0;
for (const route of ROUTES) {
  const head = buildHead(route);
  const headless = stripManagedHead(template);
  const html = headless
    .replace('</head>', `${head}\n  </head>`)
    .replace(/<body([^>]*)>[\s\S]*<\/body>/i, (_m, attrs) => `<body${attrs}>\n${buildBody(route)}\n  </body>`);

  const outPath =
    route.path === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, route.path.slice(1), 'index.html');

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, 'utf8');
  written += 1;
  console.log(`[prerender] ${route.path.padEnd(12)} -> ${path.relative(rootDir, outPath)}`);
}

/* ── Sitemaps ─────────────────────────────────────────────────────────── */

const imageEntry = (loc, title, caption) =>
  `    <image:image>
      <image:loc>${esc(loc)}</image:loc>
      <image:title>${esc(title)}</image:title>
      <image:caption>${esc(caption)}</image:caption>
    </image:image>`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${ROUTES.map((route) => {
  const loc = route.path === '/' ? `${SITE.origin}/` : `${SITE.origin}${route.path}`;
  const images =
    route.path === '/press'
      ? PHOTOS.map((p) => imageEntry(`${SITE.origin}${p.src}`, p.title, p.caption)).join('\n')
      : route.image
        ? imageEntry(route.image, `${SITE.founder} — ${route.nav || route.title}`, route.description)
        : '';
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
${images}
  </url>`;
}).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8');
console.log('[prerender] sitemap.xml written');

const imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE.origin}/press</loc>
    <lastmod>${today}</lastmod>
${PHOTOS.map((photo) => imageEntry(`${SITE.origin}${photo.src}`, photo.title, photo.caption)).join('\n')}
  </url>
</urlset>
`;
fs.writeFileSync(path.join(distDir, 'sitemap-images.xml'), imageSitemap, 'utf8');
console.log(`[prerender] sitemap-images.xml written (${PHOTOS.length} photos)`);

/* ── robots.txt ───────────────────────────────────────────────────────── */

const robots = `# Tanaka Enterprises — ${SITE.origin}
User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: ${SITE.origin}/sitemap.xml
Sitemap: ${SITE.origin}/sitemap-images.xml
`;
fs.writeFileSync(path.join(distDir, 'robots.txt'), robots, 'utf8');
console.log('[prerender] robots.txt written');

console.log(`[prerender] done — ${written} routes prerendered`);
