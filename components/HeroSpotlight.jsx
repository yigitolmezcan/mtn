'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { useLeague } from '@/lib/LeagueContext';
import HeroPlayerCard from './HeroPlayerCard';

const OTW_PICKS = ['umoja-gibson', 'marcus-bingham', 'both-gach'];

function XLogo({ className }) {
  return (
    <svg className={className} width="34" height="34" viewBox="0 0 24 24" fill="currentColor" aria-label="X">
      <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-6.9L4.5 22H1.4l8.2-9.3L1 2h7.1l4.9 6.3L18.9 2zm-1.2 18h1.9L7.4 4H5.3l12.4 16z"/>
    </svg>
  );
}

export default function HeroSpotlight({ players, children }) {
  const { lang, t } = useLang();
  const { league } = useLeague();
  const [step, setStep] = useState(0);
  const stageRef = useRef(null);
  const slideRefs = useRef([]);
  const [stageHeight, setStageHeight] = useState(null);

  const latestPlayers = useMemo(
    () => players.filter((p) => p.lig === league).slice(0, 2),
    [players, league]
  );

  const slides = useMemo(() => {
    const list = [
      { key: 'title', type: 'title' },
      { key: 'twitter', type: 'twitter' },
    ];
    // Ones to Watch içeriği EuroLeague'e özel — BSL modunda gösterilmiyor.
    if (league === 'euroleague') list.push({ key: 'otw', type: 'otw' });
    latestPlayers.forEach((p) => list.push({ key: p.slug, type: 'player', player: p }));
    return list;
  }, [latestPlayers, league]);

  // lig değişince (ör. EuroLeague<->BSL) slaytlar değişebileceğinden
  // step'i başa sar, aksi halde artık var olmayan bir indekste kalabilir.
  useEffect(() => { setStep(0); }, [league]);

  const step0 = step % slides.length;

  // iOS Safari, flex öğesi içindeki CSS aspect-ratio'yu masaüstü tarayıcılardan
  // farklı hesaplıyor ve kutu devasa büyüyüp içerik üstten/alttan kesiliyordu.
  // Bunun yerine gerçek render genişliğini ölçüp yüksekliği JS ile piksel
  // cinsinden sabitliyoruz — tüm tarayıcılarda garanti aynı sonucu verir.
  // Başlık slaytı OG oranına değil kendi içeriğine göre yükseklik alır —
  // aksi halde görsel slaytlar için düşürülen min-height, başlık metnini keser.
  useEffect(() => {
    function measure() {
      const stageWidth = stageRef.current?.getBoundingClientRect().width || 0;
      const currentType = slides[step0]?.type;
      if (currentType === 'title' || currentType === 'twitter' || currentType === 'otw') {
        const activeEl = slideRefs.current[step0];
        const contentHeight = activeEl ? activeEl.scrollHeight : 200;
        setStageHeight(Math.max(contentHeight, 100));
      } else {
        const h = Math.max(180, Math.min(340, stageWidth * (630 / 1200)));
        setStageHeight(h);
      }
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, [step0, slides]);

  function go(dir) {
    setStep((s) => (s + dir + slides.length) % slides.length);
  }

  const touchStartX = useRef(null);

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      go(delta < 0 ? 1 : -1);
    }
    touchStartX.current = null;
  }

  return (
    <div className="hero__row">
      <div
        className="hero__stage"
        ref={stageRef}
        style={stageHeight ? { height: stageHeight } : undefined}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="hero__track"
          style={{ width: `${slides.length * 100}%`, transform: `translateX(-${(100 / slides.length) * step0}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              className="hero__slide"
              key={slide.key}
              ref={(el) => (slideRefs.current[i] = el)}
              style={{ width: `${100 / slides.length}%` }}
            >
              {slide.type === 'title' && (
                <div className="hero__slide-default">{children}</div>
              )}
              {slide.type === 'twitter' && (
                <a href="https://x.com/meetnewcomers" target="_blank" rel="noopener noreferrer" className="hero__xcard">
                  <img src="/logo-final.png" alt="" className="hero__xcard-logo" />
                  <div className="hero__xcard-text">
                    <div className="hero__xcard-title">
                      {lang === 'en'
                        ? <>A newcomer to <XLogo className="hero__xcard-inline-x" /></>
                        : <>Meet the Newcomers artık <XLogo className="hero__xcard-inline-x" />'te</>}
                    </div>
                    <div className="hero__xcard-handle">@meetnewcomers</div>
                  </div>
                </a>
              )}
              {slide.type === 'otw' && (
                <Link href="/ones-to-watch" className="otw-trio">
                  <div className="otw-trio__header">
                    <span className="otw-trio__title">{t.onesToWatch}</span>
                    <img src="/leagues/euroleague-icon.png" alt="" className="otw-trio__leaguebadge" />
                  </div>
                  <div className="otw-trio__grid">
                    {OTW_PICKS.map((slug) => {
                      const p = players.find((pl) => pl.slug === slug);
                      if (!p) return null;
                      return (
                        <div className="otw-trio__player" key={slug} style={{ '--ring': p.takimRenk }}>
                          <span className="otw-trio__photo">
                            <img
                              src={`/players/${slug}.png`}
                              alt=""
                              onError={(e) => { e.currentTarget.src = `/players/${slug}.jpg`; }}
                            />
                          </span>
                          <div className="otw-trio__pname">{p.ad}</div>
                          <div className="otw-trio__pmeta">{p.pozisyon} · {p.takim}</div>
                          <div className="otw-trio__psub">{lang === 'en' ? p.ozetEn : p.ozet}</div>
                        </div>
                      );
                    })}
                  </div>
                  <span className="otw-trio__gobtn">{t.onesToWatch} →</span>
                </Link>
              )}
              {slide.type === 'player' && (
                <HeroPlayerCard player={slide.player} lang={lang} />
              )}
            </div>
          ))}
        </div>
        <div className="hero__dots">
          {slides.map((slide, i) => (
            <button
              key={slide.key}
              className={`hero__dot${i === step0 ? ' active' : ''}`}
              onClick={() => setStep(i)}
              aria-label={`slide ${i + 1}`}
            />
          ))}
        </div>
        {/* oklar artık kutunun içinde, görselin üzerinde bir overlay — kutu genişliği
            paylaşılmıyor, tüm alan görsele ayrılıyor. */}
        <div className="hero__arrows">
          {step0 !== 0 && (
            <button className="hero__bigarrow" onClick={() => go(-1)} aria-label="prev">←</button>
          )}
          <button
            className="hero__bigarrow"
            onClick={() => go(1)}
            aria-label="next"
            style={step0 === 0 ? { marginLeft: 'auto' } : undefined}
          >→</button>
        </div>
      </div>
    </div>
  );
}
