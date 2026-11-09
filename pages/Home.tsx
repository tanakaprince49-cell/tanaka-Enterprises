import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Lock,
  Compass,
  Sparkles,
  MapPin,
  Radio,
} from 'lucide-react';
import { Atmosphere } from '../components/Atmosphere';
import { Button, GlassCard, Reveal, Pill, SectionHead, Hairline } from '../components/ui';
import { SITE } from '../data/siteConfig';
import { VENTURES } from '../data/ventures';
import { POSTS_BY_DATE } from '../data/journal';

const PRINCIPLES = [
  {
    icon: Clock,
    title: 'Respect the clock',
    body:
      'Every product asks for a slice of somebody\'s life. If it cannot justify that slice, it should not exist. No streaks, no red badges, no notification that only exists to bring you back.',
  },
  {
    icon: Lock,
    title: 'Default to private',
    body:
      'Collect the least you can get away with, store it where it belongs, and never sell it. Privacy is not a settings page at the bottom — it is the first architectural decision.',
  },
  {
    icon: Compass,
    title: 'Ship, then refine',
    body:
      'A prototype takes a weekend. The twelve unglamorous things between a prototype and a product are the actual work. I would rather be finished than impressive.',
  },
];

const CURRENTLY = [
  {
    label: 'Building',
    title: 'LINKUP cohort beta',
    body: 'Refining the matchmaking engine and onboarding so solo founders can find complementary builders without cold outreach.',
    accent: '#38bdf8',
  },
  {
    label: 'Pitching',
    title: 'LvlUp Ventures — Power of the Pitch',
    body: 'LINKUP was selected to pitch live during Power of the Pitch Week, 7–11 December 2026, in front of judges and 200+ investment partners.',
    accent: '#8b5cf6',
  },
  {
    label: 'Community',
    title: 'Harare builder sessions',
    body: 'Weekend working sessions helping students and independent developers ship public repositories and live URLs.',
    accent: '#fbbf24',
  },
];

export const Home: React.FC = () => {
  const live = VENTURES.filter((v) => v.status === 'live');
  const [featured, ...rest] = POSTS_BY_DATE;

  return (
    <>
      <Atmosphere />

      <div className="relative z-10">
        {/* ───────────────────────── HERO ───────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pb-16 pt-32 sm:px-6 sm:pt-40">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            {/* Copy */}
            <div>
              <Reveal>
                <Pill dot="#38bdf8" className="mb-7">
                  Software holding company · {SITE.location}
                </Pill>
              </Reveal>

              <Reveal delay={1}>
                <h1 className="display text-[clamp(2.9rem,7.5vw,5.4rem)] text-white">
                  Software built
                  <br />
                  <span className="text-gradient">with intent.</span>
                </h1>
              </Reveal>

              <Reveal delay={2}>
                <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-slate-400 sm:text-lg">
                  Tanaka Enterprises is the holding company of{' '}
                  <Link
                    to="/about"
                    className="text-slate-200 underline decoration-white/20 underline-offset-4 transition-colors hover:decoration-sky-400"
                  >
                    Tanaka Gaadzikwa
                  </Link>{' '}
                  — the Zimbabwean founder behind LINKUP. We build products that treat your
                  attention as the scarcest resource in the world, because it is.
                </p>
              </Reveal>

              <Reveal delay={3}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button to="/ventures" arrow>
                    Explore the ventures
                  </Button>
                  <Button to="/journal" variant="glass">
                    Read the journal
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={4}>
                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} className="text-sky-400/80" /> Harare, Zimbabwe
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Radio size={14} className="text-emerald-400/80" /> 1 product live
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles size={14} className="text-violet-400/80" /> Founded 2024
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Portrait */}
            <Reveal delay={2} className="relative">
              <div className="relative mx-auto max-w-[380px] lg:max-w-none">
                {/* Glow behind the glass */}
                <div
                  className="absolute -inset-3 rounded-[48px] opacity-60 blur-3xl"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 20%, rgb(56 189 248 / 0.4), transparent 60%), radial-gradient(circle at 75% 80%, rgb(139 92 246 / 0.35), transparent 60%)',
                  }}
                  aria-hidden="true"
                />

                <GlassCard className="overflow-hidden p-2.5" aria-label="Portrait of Tanaka Gaadzikwa">
                  <div className="photo-frame aspect-[3/4] rounded-[20px]">
                    <img
                      src="/images/tanaka/tanaka-gaadzikwa-beanie-field-smiling.jpg"
                      alt="Tanaka Gaadzikwa, founder of Tanaka Enterprises and CEO of LINKUP, smiling in a black beanie in a maize field in Zimbabwe"
                      width={960}
                      height={1280}
                      fetchPriority="high"
                      decoding="async"
                      style={{ objectPosition: '50% 22%' }}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent p-5 pt-16">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-400/90">
                        Founder
                      </p>
                      <p className="mt-1 text-lg font-semibold tracking-tight text-white">
                        Tanaka Gaadzikwa
                      </p>
                      <p className="text-[13px] text-slate-400">
                        Builder · Harare, Zimbabwe
                      </p>
                    </div>
                  </div>
                </GlassCard>

              </div>
            </Reveal>
          </div>
        </section>

        {/* ───────────────────── MARQUEE STRIP ───────────────────── */}
        <section className="marquee relative overflow-hidden border-y border-white/[0.06] py-4">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center gap-8 px-4" aria-hidden={copy === 1}>
                {[
                  'Privacy-first architecture',
                  'No engagement metrics',
                  'AI matchmaking',
                  'Built in Harare',
                  'Ship, then refine',
                  'Respect the clock',
                  'No dark patterns',
                  'Founder-led',
                ].map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-8 whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.2em] text-slate-500"
                  >
                    {item}
                    <span className="h-1 w-1 rounded-full bg-sky-500/50" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────────── PRINCIPLES ───────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
          <Reveal>
            <SectionHead
              eyebrow="Operating principles"
              title={<>Three rules we do not break.</>}
              copy="Not values on a wall. These are the filters every product decision has to pass before it ships."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={(i + 1) as 1 | 2 | 3}>
                <GlassCard className="h-full p-7">
                  <div className="mb-6 grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.06]">
                    <p.icon size={19} className="text-sky-300" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-white">{p.title}</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-slate-400">{p.body}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ───────────────────── VENTURES ───────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 sm:pb-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <SectionHead
                eyebrow="The portfolio"
                title={<>What is actually live.</>}
                copy="A small number of things, done properly. Products that are not shipped say so."
              />
            </Reveal>
            <Reveal delay={1}>
              <Link
                to="/ventures"
                className="group inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                All ventures
                <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {live.map((v, i) => (
              <Reveal key={v.id} delay={(i + 1) as 1 | 2 | 3}>
                <GlassCard className="group relative h-full overflow-hidden p-7" to="/ventures">
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-25 blur-3xl transition-opacity duration-700 group-hover:opacity-45"
                    style={{ background: v.accent }}
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <Pill dot={v.accent}>{v.statusLabel}</Pill>
                      <ArrowUpRight
                        size={16}
                        className="text-slate-600 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                      />
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">{v.name}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-slate-400">{v.tagline}</p>
                    <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-[11px] uppercase tracking-[0.14em] text-slate-500">
                      <span>{v.year}</span>
                      <span className="text-slate-700">·</span>
                      <span>{v.platform}</span>
                    </div>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ───────────────────── CURRENTLY (from tanakagaadzikwa.com) ───────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 sm:pb-28">
          <Reveal>
            <SectionHead
              eyebrow="Right now"
              title={<>On the desk this quarter.</>}
              copy="A live snapshot rather than a highlight reel — the same one published on tanakagaadzikwa.com."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {CURRENTLY.map((item, i) => (
              <Reveal key={item.title} delay={(i + 1) as 1 | 2 | 3}>
                <GlassCard className="h-full p-7">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: item.accent }}
                  >
                    {item.label}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-slate-400">{item.body}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        <Hairline className="mx-auto max-w-6xl" />

        {/* ───────────────────── JOURNAL PREVIEW ───────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <SectionHead
                eyebrow="The journal"
                title={<>Notes from building.</>}
                copy="Engineering decisions, product arguments and the occasional disagreement with how software gets made."
              />
            </Reveal>
            <Reveal delay={1}>
              <Link
                to="/journal"
                className="group inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                All entries
                <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
            {/* Featured */}
            <Reveal>
              <GlassCard className="h-full p-8 sm:p-10" to={`/journal#${featured.slug}`}>
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  <span className="text-sky-400">{featured.category}</span>
                  <span className="text-slate-700">·</span>
                  <span>{featured.readTime}</span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                  {featured.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-400">{featured.excerpt}</p>
                <p className="mt-6 text-[12px] text-slate-600">{featured.displayDate}</p>
              </GlassCard>
            </Reveal>

            {/* Stack */}
            <div className="flex flex-col gap-5">
              {rest.slice(0, 2).map((post, i) => (
                <Reveal key={post.slug} delay={(i + 1) as 1 | 2}>
                  <GlassCard className="p-6" to={`/journal#${post.slug}`}>
                    <div className="flex items-center gap-2.5 text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      <span className="text-violet-400/90">{post.category}</span>
                      <span className="text-slate-700">·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="mt-3 text-[17px] font-semibold leading-snug tracking-tight text-white">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-slate-400">
                      {post.excerpt}
                    </p>
                  </GlassCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────── CTA ───────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-6">
          <Reveal>
            <div className="glass ring-liquid relative overflow-hidden rounded-[36px] p-10 text-center sm:p-16">
              <div
                className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-[70%] rounded-full opacity-30 blur-3xl"
                style={{
                  background: 'linear-gradient(90deg, #38bdf8, #8b5cf6)',
                }}
                aria-hidden="true"
              />
              <div className="relative">
                <p className="eyebrow mb-5">Open to the right conversation</p>
                <h2 className="display mx-auto max-w-2xl text-3xl text-white sm:text-5xl">
                  Building something that needs a partner?
                </h2>
                <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-slate-400 sm:text-base">
                  Partnerships, investment, press or a conversation about calm software —
                  all arrive in the same inbox.
                </p>
                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button href={SITE.whatsapp} arrow>
                    Message on WhatsApp
                  </Button>
                  <Button to="/contact" variant="glass">
                    Other ways to reach me
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
};

export default Home;
