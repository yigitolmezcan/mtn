'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { playerHref } from '@/lib/playerHref';

export default function HeroSpotlight({ latestEuroleague, latestBsl, children }) {
  const { lang } = useLang();
  const [step, setStep] = useState(0);
  const slides = [null, latestEuroleague, latestBsl].filter((s, i) => i === 0 || s);

  return (
    <div className="hero__row">
      <div className="hero__stage">
        <div
          className="hero__track"
          style={{ width: `${slides.length * 100}%`, transform: `translateX(-${(100 / slides.length) * step}%)` }}
        >
          {slides.map((slide, i) => (
            <div className="hero__slide" key={slide ? slide.slug : 'default'} style={{ width: `${100 / slides.length}%` }}>
              {!slide ? (
                <div className="hero__slide-default">{children}</div>
              ) : (
                <Link href={playerHref(slide.slug, lang)} className="hero__ogimg-link">
                  <img
                    src={`/oyuncu/${slide.slug}/opengraph-image`}
                    alt={slide.ad}
                    className="hero__ogimg"
                  />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      <button
        className="hero__bigarrow"
        onClick={() => setStep((s) => (s + 1) % slides.length)}
        aria-label="next"
      >→</button>
    </div>
  );
}
