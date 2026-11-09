import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail } from 'lucide-react';
import { SITE, PERSON } from '../data/siteConfig';

const SOCIALS = [
  { label: 'X', href: 'https://x.com/TGaadzikwa' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tanaka-gaadzikwa-linkup/' },
  { label: 'Instagram', href: 'https://instagram.com/talala2694' },
  { label: 'YouTube', href: 'https://youtube.com/@neverletbrocook0' },
  { label: 'Telegram', href: 'https://t.me/tanaka_93' },
];

export const Footer: React.FC = () => (
  <footer className="relative z-10 mt-24 px-4 pb-10 sm:px-6">
    <div className="mx-auto max-w-6xl">
      <div className="glass rounded-[32px] p-8 sm:p-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Identity */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-violet-500 text-[11px] font-bold text-ink-950">
                TE
              </span>
              <span className="text-sm font-semibold tracking-tight text-white">
                Tanaka Enterprises
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              {SITE.tagline} A software holding company founded by{' '}
              <Link to="/about" className="text-slate-200 underline decoration-white/20 underline-offset-4 hover:decoration-white/60">
                {SITE.founder}
              </Link>
              , built from {SITE.location}.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              <Mail size={15} className="text-sky-400" />
              {SITE.email}
            </a>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer">
            <p className="eyebrow mb-4">Navigate</p>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Home', to: '/' },
                { label: 'Ventures', to: '/ventures' },
                { label: 'About', to: '/about' },
                { label: 'Journal', to: '/journal' },
                { label: 'Contact', to: '/contact' },
                { label: 'Press kit', to: '/press' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Elsewhere */}
          <div>
            <p className="eyebrow mb-4">Elsewhere</p>
            <ul className="space-y-2.5 text-sm">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-slate-400 transition-colors hover:text-white"
                  >
                    {s.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 transition-opacity group-hover:opacity-60"
                    />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://linkupbuild.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-300 transition-colors hover:text-white"
                >
                  LINKUP <ArrowUpRight size={12} className="opacity-50" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.08] pt-6 text-[12px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Tanaka Enterprises. Built in {SITE.location}.
          </p>
          <p className="text-slate-600">
            {/* The canonical record of the founder lives elsewhere - keep the link */}
            Founder: <span className="text-slate-400">{PERSON.name}</span> ·{' '}
            <a
              href="https://www.tanakagaadzikwa.com/"
              className="text-slate-400 underline decoration-white/15 underline-offset-4 hover:decoration-white/50"
            >
              tanakagaadzikwa.com
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
