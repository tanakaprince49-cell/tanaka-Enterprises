import React from 'react';
import { ArrowUpRight, Link2, Building2, HeartPulse, PenLine, ExternalLink, CircleSlash2 } from 'lucide-react';
import { Atmosphere } from '../components/Atmosphere';
import { Button, GlassCard, Reveal, Pill, SectionHead, Index, Hairline } from '../components/ui';
import { VENTURES } from '../data/ventures';

type Venture = (typeof VENTURES)[number];
import { SITE } from '../data/siteConfig';

const GLYPHS: Record<Venture['glyph'], React.ElementType> = {
  link: Link2,
  enterprise: Building2,
  heart: HeartPulse,
  pen: PenLine,
};

const VentureCard: React.FC<{ venture: Venture; index: number }> = ({ venture, index }) => {
  const Glyph = GLYPHS[venture.glyph];
  const isLive = venture.status === 'live';

  return (
    <Reveal delay={(Math.min(index + 1, 4)) as 1 | 2 | 3 | 4}>
      <GlassCard className="group relative overflow-hidden p-8 sm:p-10">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full opacity-20 blur-3xl transition-opacity duration-700 group-hover:opacity-40"
          style={{ background: venture.accent }}
          aria-hidden="true"
        />

        <div className="relative grid gap-8 lg:grid-cols-[1fr_0.55fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10"
                style={{ background: `${venture.accent}1f` }}
              >
                <Glyph size={19} style={{ color: venture.accent }} />
              </span>
              <Pill dot={isLive ? venture.accent : '#64748b'}>{venture.statusLabel}</Pill>
              <span className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                {venture.year}
              </span>
            </div>

            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {venture.name}
            </h3>
            <p className="mt-2 text-[15px] font-medium text-slate-300">{venture.tagline}</p>
            <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-slate-400">
              {venture.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {venture.href && (
                <Button href={venture.href} variant="primary" arrow>
                  {venture.hrefLabel}
                </Button>
              )}
              {venture.playStore && (
                <Button href={venture.playStore} variant="glass">
                  <span className="flex items-center gap-1.5">
                    <ExternalLink size={14} /> Google Play
                  </span>
                </Button>
              )}
              {!venture.href && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[12px] font-medium text-slate-400">
                  <CircleSlash2 size={14} className="text-slate-500" />
                  No public link yet
                </span>
              )}
            </div>
          </div>

          <div className="lg:border-l lg:border-white/[0.07] lg:pl-8">
            <p className="eyebrow mb-4">Details</p>
            <dl className="space-y-3 text-[13.5px]">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Role</dt>
                <dd className="text-right font-medium text-slate-200">{venture.role}</dd>
              </div>
              {venture.platform && (
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Platform</dt>
                  <dd className="text-right font-medium text-slate-200">{venture.platform}</dd>
                </div>
              )}
              {venture.facts.map((fact) => (
                <div key={fact.label} className="flex justify-between gap-4">
                  <dt className="text-slate-500">{fact.label}</dt>
                  <dd className="text-right font-medium text-slate-200">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </GlassCard>
    </Reveal>
  );
};

export const Ventures: React.FC = () => (
  <>
    <Atmosphere />
    <div className="relative z-10">
      <header className="mx-auto max-w-6xl px-5 pb-14 pt-32 sm:px-6 sm:pt-40">
        <Reveal>
          <Pill dot="#38bdf8" className="mb-7">
            The portfolio
          </Pill>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="display max-w-3xl text-[clamp(2.6rem,6.5vw,4.6rem)] text-white">
            A short list,
            <br />
            <span className="text-gradient">kept honest.</span>
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-slate-400">
            Four ventures under this roof. Two are live and taking users, one is the site you
            are reading, and one is paused — which is stated plainly rather than hidden behind
            a button that goes nowhere.
          </p>
        </Reveal>
      </header>

      <section className="mx-auto max-w-6xl space-y-5 px-5 pb-20 sm:px-6">
        {VENTURES.map((venture, i) => (
          <VentureCard key={venture.id} venture={venture} index={i} />
        ))}
      </section>

      <Hairline className="mx-auto max-w-6xl" />

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-24">
        <Reveal>
          <SectionHead
            eyebrow="Selection criteria"
            title={<>How something earns a place here.</>}
            copy="The bar is deliberately awkward, which is why the list is short."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              n: '01',
              title: 'It solves a real friction',
              body: 'Not a feature looking for a problem. LINKUP exists because finding a co-founder is genuinely broken and cold DMing does not fix it.',
            },
            {
              n: '02',
              title: 'It can be explained in one line',
              body: 'If the value proposition needs a diagram, the product is not finished. Sounding complicated is not the same as being sophisticated.',
            },
            {
              n: '03',
              title: 'It survives the attention test',
              body: 'Would I be comfortable explaining to a user exactly how this makes money? If the answer needs hedging, the model needs changing.',
            },
          ].map((item, i) => (
            <Reveal key={item.n} delay={(i + 1) as 1 | 2 | 3}>
              <GlassCard className="h-full p-7">
                <Index n={item.n} />
                <h3 className="mt-4 text-[17px] font-semibold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-400">{item.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={2}>
          <div className="glass mt-14 flex flex-col items-center justify-between gap-6 rounded-[32px] p-8 sm:flex-row sm:p-10">
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-white">
                Want to build something with us?
              </h3>
              <p className="mt-2 text-[14.5px] text-slate-400">
                Partnership, investment or a joint venture — the inbox is open.
              </p>
            </div>
            <Button href={SITE.whatsapp} arrow>
              Start a conversation
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  </>
);

export default Ventures;
