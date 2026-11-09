import React, { useState } from 'react';
import {
  Mail,
  MessageCircle,
  Linkedin,
  MapPin,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Atmosphere } from '../components/Atmosphere';
import { Button, GlassCard, Reveal, Pill, Hairline } from '../components/ui';
import { SITE } from '../data/siteConfig';

const SUBJECTS = ['Partnership', 'Investment', 'Press / media', 'Speaking', 'Something else'];

export const Contact: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: SUBJECTS[0],
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('loading');
    try {
      await fetch('https://formspree.io/f/mbddlaep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, source: 'Tanaka Enterprises — Contact' }),
      });
    } catch {
      /* handled below */
    }
    setStatus('done');
  };

  const update =
    (field: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const channels = [
    {
      icon: Mail,
      label: 'Email',
      value: SITE.email,
      href: `mailto:${SITE.email}`,
      tone: '#38bdf8',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '0780 011 810',
      href: SITE.whatsapp,
      tone: '#25D366',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Tanaka Gaadzikwa',
      href: 'https://www.linkedin.com/in/tanaka-gaadzikwa-linkup/',
      tone: '#0A66C2',
    },
    {
      icon: MapPin,
      label: 'Based in',
      value: 'Harare, Zimbabwe',
      href: undefined,
      tone: '#a78bfa',
    },
  ];

  return (
    <>
      <Atmosphere />
      <div className="relative z-10">
        <header className="mx-auto max-w-6xl px-5 pb-12 pt-32 sm:px-6 sm:pt-40">
          <Reveal>
            <Pill dot="#38bdf8" className="mb-7">
              Open to the right conversation
            </Pill>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="display text-[clamp(2.6rem,6.5vw,4.6rem)] text-white">
              Say something
              <br />
              <span className="text-gradient">worth reading.</span>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-slate-400">
              Partnerships, investment, press, speaking, or a genuinely good argument about
              product design. All of it arrives in the same inbox and gets read.
            </p>
          </Reveal>
        </header>

        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-6">
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Channels */}
            <div className="flex flex-col gap-3">
              {channels.map((channel, i) => {
                const inner = (
                  <div className="flex items-center gap-4">
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/10"
                      style={{ background: `${channel.tone}1a` }}
                    >
                      <channel.icon size={18} style={{ color: channel.tone }} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                        {channel.label}
                      </p>
                      <p className="mt-0.5 truncate text-[14.5px] font-medium text-slate-200">
                        {channel.value}
                      </p>
                    </div>
                    {channel.href && (
                      <ArrowRight
                        size={15}
                        className="ml-auto shrink-0 text-slate-600 transition-transform duration-500 group-hover:translate-x-1"
                      />
                    )}
                  </div>
                );

                return (
                  <Reveal key={channel.label} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
                    {channel.href ? (
                      <GlassCard
                        href={channel.href}
                        className="group block p-5"
                        {...(channel.href.startsWith('http')
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                      >
                        {inner}
                      </GlassCard>
                    ) : (
                      <GlassCard interactive={false} className="p-5">
                        {inner}
                      </GlassCard>
                    )}
                  </Reveal>
                );
              })}

              <Reveal delay={4}>
                <p className="px-2 pt-3 text-[12.5px] leading-relaxed text-slate-500">
                  Replies usually land within two working days. If it is urgent, WhatsApp is
                  faster than email.
                </p>
              </Reveal>
            </div>

            {/* Form */}
            <Reveal delay={1}>
              <GlassCard interactive={false} className="h-full p-7 sm:p-10">
                {status !== 'done' ? (
                  <>
                    <h2 className="text-2xl font-semibold tracking-tight text-white">
                      Send a message
                    </h2>
                    <p className="mt-2 text-[14px] text-slate-400">
                      Straight to my inbox. No autoresponder.
                    </p>

                    <form onSubmit={submit} className="mt-8 space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="name"
                            className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-slate-500"
                          >
                            Your name
                          </label>
                          <input
                            id="name"
                            required
                            value={form.name}
                            onChange={update('name')}
                            className="glass glass--inset w-full px-4 py-3 text-[15px] text-white placeholder:text-slate-600 focus:outline-none"
                            placeholder="Name"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-slate-500"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={update('email')}
                            className="glass glass--inset w-full px-4 py-3 text-[15px] text-white placeholder:text-slate-600 focus:outline-none"
                            placeholder="you@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-slate-500"
                        >
                          What is this about
                        </label>
                        <select
                          id="subject"
                          value={form.subject}
                          onChange={update('subject')}
                          className="glass glass--inset w-full appearance-none px-4 py-3 text-[15px] text-white focus:outline-none"
                        >
                          {SUBJECTS.map((subject) => (
                            <option key={subject} value={subject} className="bg-ink-900 text-white">
                              {subject}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-slate-500"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={6}
                          value={form.message}
                          onChange={update('message')}
                          className="glass glass--inset w-full resize-none px-4 py-3 text-[15px] leading-relaxed text-white placeholder:text-slate-600 focus:outline-none"
                          placeholder="Tell me what you are working on."
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full"
                        arrow
                      >
                        {status === 'loading' ? 'Sending…' : 'Send message'}
                      </Button>
                    </form>
                  </>
                ) : (
                  <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center animate-fade-up">
                    <span className="mb-6 grid h-14 w-14 place-items-center rounded-full bg-emerald-500/15">
                      <CheckCircle2 size={26} className="text-emerald-400" />
                    </span>
                    <h2 className="text-2xl font-semibold tracking-tight text-white">
                      Message sent
                    </h2>
                    <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-slate-400">
                      Thanks for writing. I read everything and will come back to you properly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="mt-8 text-[13px] font-semibold text-sky-400 hover:text-sky-300"
                    >
                      Send another
                    </button>
                  </div>
                )}
              </GlassCard>
            </Reveal>
          </div>
        </section>

        <Hairline className="mx-auto max-w-6xl" />

        <section className="mx-auto max-w-6xl px-5 py-14 text-center sm:px-6">
          <p className="text-[14px] text-slate-500">
            For the full biography, press kit and photography, visit{' '}
            <a
              href="https://www.tanakagaadzikwa.com/"
              className="text-slate-300 underline decoration-white/20 underline-offset-4 hover:decoration-white/60"
            >
              tanakagaadzikwa.com
            </a>{' '}
            — or grab images from the{' '}
            <a
              href="/press"
              className="text-slate-300 underline decoration-white/20 underline-offset-4 hover:decoration-white/60"
            >
              press kit
            </a>
            .
          </p>
        </section>
      </div>
    </>
  );
};

export default Contact;
