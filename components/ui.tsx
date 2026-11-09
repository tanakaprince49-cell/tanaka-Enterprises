import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

/* ────────────────────────────────────────────────────────────────────
   useReveal — adds `is-in` when the element scrolls into view.
   One observer per element, disconnected after firing, so a long page
   never accumulates six hundred live observers.
   ──────────────────────────────────────────────────────────────────── */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-in');
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}

interface RevealProps {
  children: React.ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li' | 'header' | 'figure';
}

/** Fades + lifts its children in when scrolled to. */
export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className = '', as = 'div' }) => {
  const ref = useReveal<HTMLDivElement>();
  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      data-delay={delay || undefined}
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
  );
};

/* ────────────────────────────────────────────────────────────────────
   GlassCard — the pointer-tracked glass surface.
   Writes --sheen-x / --sheen-y on the element itself so the CSS
   gradient follows the cursor. Values are percentages so the same
   inline vars work for the border mask and the inner bloom.
   ──────────────────────────────────────────────────────────────────── */
interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
  strong?: boolean;
  className?: string;
  as?: 'div' | 'article' | 'a' | 'section';
  href?: string;
  to?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  interactive = true,
  strong = false,
  className = '',
  as = 'div',
  href,
  to,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMove = (event: React.PointerEvent) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--sheen-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    node.style.setProperty('--sheen-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  const classes = [
    'glass',
    interactive ? 'glass--interactive' : '',
    strong ? 'glass--strong' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  /*
   * One prop bag shared by the div / anchor / Link variants. Typed as `any`
   * because React's attribute types differ per element and a union here would
   * force three near-identical branches for no runtime benefit.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shared: any = { className: classes, onPointerMove: handleMove, ref, ...rest };

  if (to) {
    return <Link to={to} {...shared}>{children}</Link>;
  }
  if (href) {
    return <a href={href} {...shared}>{children}</a>;
  }

  const Tag = as as React.ElementType;
  return <Tag {...shared}>{children}</Tag>;
};

/* ────────────────────────────────────────────────────────────────────
   Buttons
   ──────────────────────────────────────────────────────────────────── */

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  variant?: 'primary' | 'glass';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  arrow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  to,
  href,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  disabled,
  arrow = false,
}) => {
  const classes = `btn btn--${variant} ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`;
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && (
        <ArrowUpRight
          size={17}
          className="relative z-10 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`group ${classes}`}>
        {inner}
      </Link>
    );
  }
  if (href) {
    const external = href.startsWith('http');
    return (
      <a
        href={href}
        className={`group ${classes}`}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`group ${classes}`}>
      {inner}
    </button>
  );
};

/* ────────────────────────────────────────────────────────────────────
   Small typographic furniture
   ──────────────────────────────────────────────────────────────────── */

export const Pill: React.FC<{ children: React.ReactNode; className?: string; dot?: string }> = ({
  children,
  className = '',
  dot,
}) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300 backdrop-blur-xl ${className}`}
  >
    {dot && (
      <span
        className="h-1.5 w-1.5 rounded-full animate-pulse-soft"
        style={{ background: dot, boxShadow: `0 0 10px ${dot}` }}
      />
    )}
    {children}
  </span>
);

export const SectionHead: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  copy?: React.ReactNode;
  align?: 'left' | 'center';
}> = ({ eyebrow, title, copy, align = 'left' }) => (
  <div className={`${align === 'center' ? 'text-center mx-auto' : ''} max-w-2xl`}>
    <p className="eyebrow mb-5">{eyebrow}</p>
    <h2 className="display text-3xl sm:text-4xl lg:text-5xl text-white">{title}</h2>
    {copy && (
      <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-400">{copy}</p>
    )}
  </div>
);

/** Thin hairline divider that fades at both ends. */
export const Hairline: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`hairline ${className}`} aria-hidden="true" />
);

/** Numbered label used in the process / principle lists. */
export const Index: React.FC<{ n: string; accent?: string }> = ({ n, accent = '#38bdf8' }) => (
  <span
    className="font-mono text-[11px] font-semibold tracking-[0.2em]"
    style={{ color: accent }}
  >
    {n}
  </span>
);

/** Counts up from 0 when it enters the viewport. Used for the stat strip. */
export const CountUp: React.FC<{ to: number; suffix?: string; duration?: number }> = ({
  to,
  suffix = '',
  duration = 1400,
}) => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setValue(to);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
          setValue(to);
          return;
        }
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(eased * to));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
};
