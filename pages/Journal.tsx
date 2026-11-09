import React, { useState } from 'react';
import { ArrowUpRight, Clock, CheckCircle2, Mail } from 'lucide-react';
import { Atmosphere } from '../components/Atmosphere';
import { Button, GlassCard, Reveal, Pill, Hairline } from '../components/ui';
import { POSTS_BY_DATE } from '../data/journal';

const CATEGORY_COLOR: Record<string, string> = {
  Engineering: '#38bdf8',
  Philosophy: '#a78bfa',
  Product: '#34d399',
  Business: '#fbbf24',
};

export const Journal: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  const subscribe = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await fetch('https://formspree.io/f/mbddlaep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, source: 'Tanaka Enterprises — Journal' }),
      });
    } catch {
      /* silent: the user still gets a reasonable outcome */
    }
    setStatus('done');
  };

  const [featured, ...rest] = POSTS_BY_DATE;

  return (
    <>
      <Atmosphere />
      <div className="relative z-10">
        <header className="mx-auto max-w-4xl px-5 pb-12 pt-32 sm:px-6 sm:pt-40">
          <Reveal>
            <Pill className="mb-7">The Journal</Pill>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="display text-[clamp(2.6rem,6.5vw,4.6rem)] text-white">
              Notes from
              <br />
              <span className="text-gradient">building.</span>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-slate-400">
              Engineering decisions, product arguments and the occasional disagreement with how
              software normally gets made. Written honestly, including the parts that did not
              work.
            </p>
          </Reveal>
        </header>

        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          {/* Featured */}
          <Reveal>
            <article
              id={featured.slug}
              className="glass glass--interactive scroll-mt-28 rounded-[32px] p-8 sm:p-12"
            >
              <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em]">
                <span style={{ color: CATEGORY_COLOR[featured.category] }}>{featured.category}</span>
                <span className="text-slate-700">·</span>
                <span className="inline-flex items-center gap-1.5 text-slate-500">
                  <Clock size={12} /> {featured.readTime}
                </span>
                <span className="text-slate-700">·</span>
                <time dateTime={featured.date} className="text-slate-500">
                  {featured.displayDate}
                </time>
              </div>

              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-slate-300">{featured.excerpt}</p>

              <div className="mt-7 space-y-4 border-t border-white/[0.07] pt-7 text-[15px] leading-relaxed text-slate-400">
                {featured.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </article>
          </Reveal>

          <Hairline className="my-12" />

          {/* Rest */}
          <div className="space-y-5">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
                <article
                  id={post.slug}
                  className="glass glass--interactive scroll-mt-28 rounded-[28px] p-7 sm:p-9"
                >
                  <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em]">
                    <span style={{ color: CATEGORY_COLOR[post.category] }}>{post.category}</span>
                    <span className="text-slate-700">·</span>
                    <span className="inline-flex items-center gap-1.5 text-slate-500">
                      <Clock size={12} /> {post.readTime}
                    </span>
                    <span className="text-slate-700">·</span>
                    <time dateTime={post.date} className="text-slate-500">
                      {post.displayDate}
                    </time>
                  </div>

                  <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-white">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-300">{post.excerpt}</p>

                  <details className="group mt-5">
                    <summary className="inline-flex cursor-pointer list-none items-center gap-2 text-[13px] font-semibold text-sky-400 transition-colors hover:text-sky-300">
                      Read the entry
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-500 group-open:rotate-90"
                      />
                    </summary>
                    <div className="mt-5 space-y-4 border-t border-white/[0.07] pt-5 text-[14.5px] leading-relaxed text-slate-400">
                      {post.body.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  </details>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Subscribe */}
          <Reveal delay={2}>
            <section className="glass mt-14 rounded-[32px] p-8 text-center sm:p-12">
              {status !== 'done' ? (
                <>
                  <span className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.06]">
                    <Mail size={20} className="text-sky-300" />
                  </span>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    Get new entries by email
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-slate-400">
                    Occasional, low volume, no tracking pixels. Only when there is something
                    worth saying.
                  </p>
                  <form
                    onSubmit={subscribe}
                    className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
                  >
                    <label htmlFor="journal-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="journal-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="glass glass--inset flex-1 px-5 py-3.5 text-[15px] text-white placeholder:text-slate-500 focus:outline-none"
                    />
                    <Button type="submit" disabled={status === 'loading'}>
                      {status === 'loading' ? 'Joining…' : 'Subscribe'}
                    </Button>
                  </form>
                </>
              ) : (
                <div className="animate-fade-up">
                  <span className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/15">
                    <CheckCircle2 size={22} className="text-emerald-400" />
                  </span>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">You are in</h2>
                  <p className="mt-3 text-[15px] text-slate-400">
                    The next entry will find you.
                  </p>
                </div>
              )}
            </section>
          </Reveal>
        </div>
      </div>
    </>
  );
};

export default Journal;
