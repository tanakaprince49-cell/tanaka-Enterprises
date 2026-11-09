import React from 'react';
import { Camera, Download, Mail } from 'lucide-react';
import { Atmosphere } from '../components/Atmosphere';
import { Reveal, Pill } from '../components/ui';
import { PHOTOS, PHOTO_LICENSE } from '../data/photoGallery';
import { SITE } from '../data/siteConfig';

/**
 * /press — the official photo library.
 *
 * Linked from the footer, but never from the main navigation: it exists for
 * Google Images and for journalists. Every photo is a <figure> with a real
 * <img> (src, alt, width, height) plus a caption and longer description, so the
 * text-to-image association is unambiguous for crawlers.
 */
export const Press: React.FC = () => (
  <>
    <Atmosphere />
    <div className="relative z-10">
      <header className="mx-auto max-w-5xl px-5 pb-12 pt-32 sm:px-6 sm:pt-40">
        <Reveal>
          <Pill className="mb-7">
            <Camera size={13} /> Press &amp; media
          </Pill>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="display text-[clamp(2.3rem,5.5vw,3.8rem)] text-white">
            Tanaka Gaadzikwa
            <br />
            <span className="text-gradient">photo library.</span>
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-slate-400">
            {PHOTOS.length} official photographs of the founder of Tanaka Enterprises and CEO of
            LINKUP, shot in Harare and rural Zimbabwe. Free to publish with a credit.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <p className="mt-4 text-[13px] text-slate-500">
            JPEG · up to 1280px tall · updated {PHOTOS[0]?.datePublished} ·{' '}
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-1 text-sky-400 hover:underline"
            >
              <Mail size={12} /> request a specific shot
            </a>
          </p>
        </Reveal>
      </header>

      <section className="mx-auto max-w-5xl px-5 pb-16 sm:px-6" aria-labelledby="library">
        <h2 id="library" className="sr-only">
          Every official photo of Tanaka Gaadzikwa
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PHOTOS.map((photo, index) => (
            <figure
              key={photo.id}
              id={photo.id}
              itemScope
              itemType="https://schema.org/ImageObject"
              className="glass group overflow-hidden rounded-[24px]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading={index < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                  itemProp="contentUrl"
                  className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <a
                  href={photo.src}
                  download={photo.file}
                  aria-label={`Download ${photo.title}`}
                  className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-[11px] font-semibold text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 focus:opacity-100"
                >
                  <Download size={12} /> JPG
                </a>
              </div>
              <figcaption className="space-y-2 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-400/90">
                  {photo.category} · {photo.width}×{photo.height}
                </p>
                <h3 itemProp="name" className="text-[14px] font-semibold leading-snug text-white">
                  {photo.title}
                </h3>
                <p itemProp="caption" className="text-[12.5px] leading-relaxed text-slate-400">
                  {photo.caption}
                </p>
                <p className="border-t border-white/[0.07] pt-2 text-[11px] leading-relaxed text-slate-500">
                  <meta itemProp="creditText" content={photo.creditText} />
                  <meta itemProp="datePublished" content={photo.datePublished} />
                  {photo.description}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-6">
        <div className="glass rounded-[28px] p-7 sm:p-9">
          <h2 className="text-lg font-semibold tracking-tight text-white">
            Using these photographs
          </h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-slate-400">
            Every image here is an official photograph of Tanaka Gaadzikwa, released for
            editorial and press use. Credit “Tanaka Gaadzikwa” and, where the frame is
            watermarked, “Photography by TAKEPHOTOS”. They may not be used to advertise a
            product or imply an endorsement.
          </p>
          <p className="mt-3 text-[14.5px] leading-relaxed text-slate-400">
            Licence:{' '}
            <a href={PHOTO_LICENSE.url} className="text-sky-400 hover:underline">
              {PHOTO_LICENSE.name}
            </a>
            . For originals or an interview, email{' '}
            <a href={`mailto:${SITE.email}`} className="text-sky-400 hover:underline">
              {SITE.email}
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  </>
);

export default Press;
