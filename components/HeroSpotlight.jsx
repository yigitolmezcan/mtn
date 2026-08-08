'use client';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { useLeague } from '@/lib/LeagueContext';
import { playerHref } from '@/lib/playerHref';

export default function HeroSpotlight({ players, children }) {
  const { lang, t } = useLang();
  const { league } = useLeague();
  const [step, setStep] = useState(0);

  const latestPlayers = useMemo(
    () => players.filter((p) => p.lig === league).slice(0, 2),
    [players, league]
  );

  const slides = useMemo(() => {
    const list = [
      { key: 'title', type: 'title' },
      { key: 'twitter', type: 'twitter' },
      { key: 'otw', type: 'otw' },
    ];
    latestPlayers.forEach((p) => list.push({ key: p.slug, type: 'player', player: p }));
    return list;
  }, [latestPlayers]);

  // lig değişince (ör. EuroLeague<->BSL) oyuncu slaytları değişebileceğinden
  // step'i başa sar, aksi halde artık var olmayan bir indekste kalabilir.
  useEffect(() => { setStep(0); }, [league]);

  const step0 = step % slides.length;

  return (
    <div className="hero__row">
      <div className="hero__stage">
        <div
          className="hero__track"
          style={{ width: `${slides.length * 100}%`, transform: `translateX(-${(100 / slides.length) * step0}%)` }}
        >
          {slides.map((slide) => (
            <div className="hero__slide" key={slide.key} style={{ width: `${100 / slides.length}%` }}>
              {slide.type === 'title' && (
                <div className="hero__slide-default">{children}</div>
              )}
              {slide.type === 'twitter' && (
                <a href="https://x.com/meetnewcomers" target="_blank" rel="noopener noreferrer" className="hero__ogimg-link">
                  <img
                    src={lang === 'en' ? '/og/mtn-x-launch-en.png' : '/og/mtn-x-launch-tr.png'}
                    alt="@meetnewcomers"
                    className="hero__ogimg"
                  />
                </a>
              )}
              {slide.type === 'otw' && (
                <Link href="/ones-to-watch" className="hero__ogimg-link">
                  <img src="/og/og-ones-to-watch.png" alt="Ones to Watch" className="hero__ogimg" />
                </Link>
              )}
              {slide.type === 'player' && (
                <Link href={playerHref(slide.player.slug, lang)} className="hero__ogimg-link">
                  <img
                    src={`/oyuncu/${slide.player.slug}/opengraph-image`}
                    alt={slide.player.ad}
                    className="hero__ogimg"
                  />
                  <span className="hero__gobtn">{t.goToProfile} →</span>
                </Link>
              )}
            </div>
          ))}
        </div>
        <div className="hero__dots">
          {slides.map((slide, i) => (
            <span key={slide.key} className={`hero__dot${i === step0 ? ' active' : ''}`} />
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
