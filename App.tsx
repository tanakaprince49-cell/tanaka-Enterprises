import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Atmosphere } from './components/Atmosphere';
import { applyPageSeo } from './lib/seo';

const Home = lazy(() => import('./pages/Home'));
const Ventures = lazy(() => import('./pages/Ventures'));
const About = lazy(() => import('./pages/About'));
const Journal = lazy(() => import('./pages/Journal'));
const Contact = lazy(() => import('./pages/Contact'));
const Press = lazy(() => import('./pages/Press'));

/** Keeps SEO tags and scroll position correct on every client navigation. */
const RouteEffects: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    applyPageSeo(pathname);
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        requestAnimationFrame(() =>
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        );
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
};

const Loading: React.FC = () => (
  <div className="flex min-h-[70vh] items-center justify-center">
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/15 border-t-white/80" />
  </div>
);

const NotFound: React.FC = () => (
  <>
    <Atmosphere />
    <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="display text-4xl text-white sm:text-5xl">Nothing built here yet.</h1>
      <p className="mt-5 text-[16px] leading-relaxed text-slate-400">
        This page does not exist. It may have been one of the links we removed when the site
        was rebuilt.
      </p>
      <Link
        to="/"
        className="btn btn--primary mt-8"
      >
        Back to the home page
      </Link>
    </div>
  </>
);

export default function App() {
  return (
    <BrowserRouter>
      <RouteEffects />
      <div className="flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ventures" element={<Ventures />} />
              <Route path="/about" element={<About />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/press" element={<Press />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
