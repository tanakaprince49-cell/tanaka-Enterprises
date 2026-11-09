import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ROUTES } from '../data/siteConfig';

const NAV_ITEMS = ROUTES.filter((r) => r.nav && r.path !== '/press');

export const Nav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile sheet on navigation
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock scroll while the sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        aria-label="Primary"
        className={`glass glass--strong mx-auto flex max-w-5xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-700 sm:px-5 ${
          scrolled ? 'shadow-2xl' : ''
        }`}
        style={{ borderRadius: 999 }}
      >
        {/* Wordmark */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 rounded-full pl-2 pr-3 py-1"
          aria-label="Tanaka Enterprises — home"
        >
          <span className="relative grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-violet-500">
            <span className="text-[11px] font-bold text-ink-950">TE</span>
            <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/40" />
          </span>
          <span className="text-[13px] font-semibold tracking-tight text-white sm:text-sm">
            Tanaka <span className="text-slate-400 transition-colors group-hover:text-slate-200">Enterprises</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-0.5 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative rounded-full px-3.5 py-2 text-[12px] font-medium tracking-tight transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.nav}
                  {isActive && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[12px] font-semibold tracking-tight text-ink-950 transition-transform duration-500 hover:-translate-y-0.5"
          >
            Get in touch
            <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="grid h-9 w-9 place-items-center rounded-full text-slate-300 transition-colors hover:bg-white/10 hover:text-white md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Scrim: dims the page and signals the sheet is modal */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-30 bg-ink-950/70 transition-opacity duration-500 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/*
        Mobile sheet.

        Two things matter here:
        1. `fixed`, so it overlays the page instead of pushing hero content down.
        2. It must NOT be nested inside the <nav> element — the nav has its own
           backdrop-filter, and a backdrop-filter cannot blur content that is
           inside the same stacking context. Nesting made the sheet transparent.
        3. `glass--solid` instead of relying on blur alone: on low-end Android
           (most of this traffic) backdrop-filter is often unsupported, and a
           purely blurred menu becomes unreadable.
      */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-x-4 top-[84px] z-40 mx-auto max-w-lg overflow-hidden transition-all duration-500 md:hidden ${
          open ? 'max-h-[calc(100vh-120px)] opacity-100' : 'pointer-events-none max-h-0 opacity-0'
        }`}
      >
        <div className="glass--solid rounded-[28px] p-5">
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.path} style={{ transitionDelay: `${i * 40}ms` }}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between border-b border-white/[0.06] py-3.5 text-lg font-medium tracking-tight transition-colors last:border-0 ${
                      isActive ? 'text-white' : 'text-slate-400'
                    }`
                  }
                >
                  {item.nav}
                  <ArrowUpRight size={16} className="opacity-40" />
                </NavLink>
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-semibold text-ink-950"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Nav;
