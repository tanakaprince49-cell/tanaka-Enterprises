import React from 'react';
import { Quote, ArrowUpRight, MapPin, Sparkles, Cpu, ShieldCheck } from 'lucide-react';
import { Atmosphere } from '../components/Atmosphere';
import { Button, GlassCard, Reveal, Pill, SectionHead, Hairline, Index } from '../components/ui';
import { SITE, PERSON } from '../data/siteConfig';

const FACTS = [
  { label: 'Full name', value: 'Tanaka Prince Gaadzikwa' },
  { label: 'Role', value: 'Founder, Tanaka Enterprises' },
  { label: 'Also', value: 'Founder & CEO, LINKUP' },
  { label: 'Based in', value: 'Harare, Zimbabwe' },
  { label: 'Known as', value: 'Startup Cupid · Minister of AI' },
  { label: 'Languages', value: 'English · Shona' },
];

export const About: React.FC = () => (
  <>
    <Atmosphere />
    <div className="relative z-10">
      <header className="mx-auto max-w-6xl px-5 pb-16 pt-32 sm:px-6 sm:pt-40">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.7fr]">
          <div>
            <Reveal>
              <Pill className="mb-7">The thesis</Pill>
            </Reveal>
            <Reveal delay={1}>
              <h1 className="display text-[clamp(2.6rem,6.5vw,4.6rem)] text-white">
                Software should
                <br />
                <span className="text-gradient">give time back.</span>
              </h1>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-slate-400">
                Almost every product optimises for the same number: how long it can keep you.
                I think that is backwards. Tanaka Enterprises exists to build the opposite kind
                of software — the kind that finishes its job and gets out of the way.
              </p>
            </Reveal>
          </div>

          <Reveal delay={2}>
            <GlassCard className="p-2.5">
              <div className="photo-frame aspect-[4/5] rounded-[20px]">
                <img
                  src="/images/tanaka/tanaka-gaadzikwa-hoodie-front-portrait.jpg"
                  alt="Portrait of Tanaka Gaadzikwa, Zimbabwean entrepreneur and founder of Tanaka Enterprises, standing in a black hoodie"
                  width={576}
                  height={1280}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </header>

      {/* The story */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-[1.4fr_0.9fr]">
          <Reveal>
            <GlassCard interactive={false} className="h-full p-8 sm:p-12">
              <Quote className="mb-6 text-white/10" size={40} aria-hidden="true" />
              <h2 className="serif text-3xl tracking-tight text-white sm:text-4xl">
                A holding company for software that behaves.
              </h2>

              <div className="mt-7 space-y-5 text-[15.5px] leading-relaxed text-slate-400">
                <p>
                  I am <strong className="font-semibold text-white">Tanaka Gaadzikwa</strong>, a
                  software builder from Harare. I started Tanaka Enterprises after noticing a
                  pattern in the products around me: the ones that made the most money were
                  usually the ones that respected people the least.
                </p>
                <p>
                  My main work is{' '}
                  <a
                    href="https://linkupbuild.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 underline decoration-sky-400/30 underline-offset-4 hover:decoration-sky-400"
                  >
                    LINKUP
                  </a>
                  , an AI platform that matches founders with the collaborators who complete
                  them. It is why people started calling me the{' '}
                  <em className="text-slate-200 not-italic">Startup Cupid</em> — and, for the
                  obsession with applied AI,{' '}
                  <em className="text-slate-200 not-italic">The Minister of AI</em>.
                </p>
                <p>
                  Tanaka Enterprises is the roof over that and whatever comes next. It is a
                  deliberately small company. The constraint is not capital, it is attention:
                  I would rather ship one product that people trust than five that people
                  tolerate.
                </p>
                <p>
                  Being based in Zimbabwe is part of the story, not a limitation on it. The
                  distance from the usual tech corridors removes the noise, and what is left is
                  the work.
                </p>
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button href={SITE.whatsapp} arrow>
                  Talk to me
                </Button>
                <Button href="https://www.tanakagaadzikwa.com/" variant="glass">
                  Full biography
                </Button>
              </div>
            </GlassCard>
          </Reveal>

          <div className="flex flex-col gap-5">
            <Reveal delay={1}>
              <GlassCard interactive={false} className="p-7">
                <p className="eyebrow mb-4">The record</p>
                <dl className="space-y-3 text-[13.5px]">
                  {FACTS.map((fact) => (
                    <div key={fact.label} className="flex justify-between gap-4">
                      <dt className="shrink-0 text-slate-500">{fact.label}</dt>
                      <dd className="text-right font-medium text-slate-200">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </GlassCard>
            </Reveal>

            <Reveal delay={2}>
              <GlassCard className="p-7">
                <p className="eyebrow mb-3">Elsewhere</p>
                <ul className="space-y-2 text-[13.5px]">
                  {[
                    ['tanakagaadzikwa.com', 'https://www.tanakagaadzikwa.com/'],
                    ['LINKUP', 'https://linkupbuild.com/'],
                    ['LinkedIn', 'https://www.linkedin.com/in/tanaka-gaadzikwa-linkup/'],
                    ['X', 'https://x.com/TGaadzikwa'],
                  ].map(([label, href]) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="me noopener noreferrer"
                        className="group flex items-center justify-between rounded-lg px-1 py-1.5 text-slate-400 transition-colors hover:text-white"
                      >
                        {label}
                        <ArrowUpRight
                          size={13}
                          className="opacity-0 transition-opacity group-hover:opacity-60"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>

            <Reveal delay={3}>
              <GlassCard interactive={false} className="p-7">
                <div className="flex items-center gap-2 text-[13px] text-slate-400">
                  <MapPin size={14} className="text-sky-400" />
                  Harare, Zimbabwe · CAT (UTC+2)
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      <Hairline className="mx-auto max-w-6xl" />

      {/* Beliefs */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-24">
        <Reveal>
          <SectionHead
            eyebrow="Beliefs"
            title={<>What I will and will not build.</>}
            copy="Written down so that future me can be held to it."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              n: '01',
              title: 'No dark patterns',
              body: 'Nothing that makes it hard to leave, cancel, delete or understand. If a design only works because the user is confused, it does not ship.',
            },
            {
              icon: Cpu,
              n: '02',
              title: 'AI that reduces work',
              body: 'Applied AI should remove steps, not add a chat box to everything. The measure is whether a task got shorter.',
            },
            {
              icon: Sparkles,
              n: '03',
              title: 'Boring infrastructure',
              body: 'Excitement belongs in the product, not the stack. Proven tools, obvious architecture, no cleverness that only I can debug at 2am.',
            },
          ].map((item, i) => (
            <Reveal key={item.n} delay={(i + 1) as 1 | 2 | 3}>
              <GlassCard className="h-full p-7">
                <div className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.06]">
                    <item.icon size={19} className="text-sky-300" />
                  </span>
                  <Index n={item.n} />
                </div>
                <h3 className="mt-5 text-[17px] font-semibold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-400">{item.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={2}>
          <blockquote className="glass mx-auto mt-16 max-w-3xl rounded-[32px] p-10 text-center sm:p-14">
            <p className="serif text-2xl leading-snug text-white sm:text-3xl">
              “Software is the new architecture of human experience — so it should be built by
              people who care what it feels like to live inside it.”
            </p>
            <footer className="mt-6 text-[12px] uppercase tracking-[0.2em] text-slate-500">
              {PERSON.name} · Founder
            </footer>
          </blockquote>
        </Reveal>
      </section>
    </div>
  </>
);

export default About;
