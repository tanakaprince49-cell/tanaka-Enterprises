import { SITE, ROUTES, buildPageGraph, absoluteUrl } from '../data/siteConfig';

/**
 * Runtime <head> management.
 *
 * The prerenderer writes the same tags into the static HTML for crawlers; this
 * keeps them correct as the visitor moves between routes without a reload.
 * Both read from data/siteConfig.js, so they can never disagree.
 */

function meta(attr: 'name' | 'property', key: string, content: string) {
  if (!content) return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function link(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function applyPageSeo(path: string) {
  const route = ROUTES.find((r) => r.path === path) || ROUTES[0];
  const url = absoluteUrl(route.path);
  const image = route.image || `${SITE.origin}/images/tanaka/tanaka-gaadzikwa-beanie-field-smiling.jpg`;

  document.title = route.title;

  meta('name', 'description', route.description);
  meta('name', 'keywords', route.keywords || '');
  meta('name', 'author', SITE.founder);
  meta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  meta('name', 'googlebot', 'index, follow, max-image-preview:large');
  link('canonical', url);

  meta('property', 'og:type', route.schema === 'home' || route.schema === 'about' ? 'profile' : 'website');
  meta('property', 'og:site_name', SITE.siteName);
  meta('property', 'og:locale', SITE.locale);
  meta('property', 'og:title', route.title);
  meta('property', 'og:description', route.description);
  meta('property', 'og:url', url);
  meta('property', 'og:image', image);
  meta('property', 'og:image:alt', `${SITE.name} — ${route.title}`);

  meta('name', 'twitter:card', 'summary_large_image');
  meta('name', 'twitter:site', SITE.twitter);
  meta('name', 'twitter:creator', SITE.twitter);
  meta('name', 'twitter:title', route.title);
  meta('name', 'twitter:description', route.description);
  meta('name', 'twitter:image', image);

  // JSON-LD
  let script = document.getElementById('page-ldjson') as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = 'page-ldjson';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(buildPageGraph(route.path));
}
