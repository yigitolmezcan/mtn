'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { playerHref } from '@/lib/playerHref';

export default function HeroSpotlight({ latestEuroleague, latestBsl, children }) {
  const { lang } = useLang();
  const [step, setStep] = useState(0);
  const slides = [null, latestEuroleague, latestBsl].filter((s, i) => i === 0 || s);
  const current = slides[step];

  return (
    <div className="hero__row">
      <div className="hero__stage">
        {!current ? (
          children
        ) : (
          <Link href={playerHref(current.slug, lang)} className="hero__ogimg-link">
            <img
              src={`/oyuncu/${current.slug}/opengraph-image`}
              alt={current.ad}
              className="hero__ogimg"
            />
          </Link>
        )}
      </div>
      <button
        className="hero__bigarrow"
        onClick={() => setStep((s) => (s + 1) % slides.length)}
        aria-label="next"
      >→</button>
    </div>
  );
}
