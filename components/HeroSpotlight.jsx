'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { useLeague } from '@/lib/LeagueContext';
import { playerHref } from '@/lib/playerHref';

function GoBtn({ text }) {
  return (
    <span className="hero__gobtn">
      <span className="hero__gobtn-text">{text}</span>
      <Search size={12} strokeWidth={2} aria-hidden="true" />
    </span>
  );
}

export default function HeroSpotlight({ players, children }) {
  const { lang, t } = useLang();
  const { league } = useLeague();
  const [step, setStep] = useState(0);
  const stageRef = useRef(null);
  const [stageHeight, setStageHeight] = useState(null);

  // iOS Safari, flex öğesi içindeki CSS aspect-ratio'yu masaüstü tarayıcılardan
  // farklı hesaplıyor ve kutu devasa büyüyüp içerik üstten/alttan kesiliyordu.
  // Bunun yerine gerçek render genişliğini ölçüp yüksekliği JS ile piksel
  // cinsinden sabitliyoruz — tüm tarayıcılarda garanti aynı sonucu verir.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    function measure() {
      const width = el.getBoundingClientRect().width;
      if (!width) return;
      const h = Math.max(320, Math.min(520, width * (630 / 1200)));
      setStageHeight(h);
    }
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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

  function go(dir) {
    setStep((s) => (s + dir + slides.length) % slides.length);
  }

  return (
    <div className="hero__row">
      <div className="hero__stage" ref={stageRef} style={stageHeight ? { height: stageHeight } : undefined}>
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
                  <span className="hero__ogimg-frame">
                    <img
                      src={lang === 'en' ? '/og/mtn-x-launch-en.png' : '/og/mtn-x-launch-tr.png'}
                      alt="@meetnewcomers"
                      className="hero__ogimg"
                    />
                  </span>
                </a>
              )}
              {slide.type === 'otw' && (
                <Link href="/ones-to-watch" className="hero__ogimg-link">
                  <span className="hero__ogimg-frame">
                    <img src="/og/og-ones-to-watch.png" alt="Ones to Watch" className="hero__ogimg" />
                    <GoBtn text={t.onesToWatch} />
                  </span>
                </Link>
              )}
              {slide.type === 'player' && (
                <Link href={playerHref(slide.player.slug, lang)} className="hero__ogimg-link">
                  <span className="hero__ogimg-frame">
                    <img
                      src={`/oyuncu/${slide.player.slug}/opengraph-image`}
                      alt={slide.player.ad}
                      className="hero__ogimg"
                    />
                    <GoBtn text={t.goToProfile} />
                  </span>
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
        {/* oklar artık kutunun içinde, görselin üzerinde bir overlay — kutu genişliği
            paylaşılmıyor, tüm alan görsele ayrılıyor. */}
        <div className="hero__arrows">
          <button className="hero__bigarrow" onClick={() => go(-1)} aria-label="prev">←</button>
          <button className="hero__bigarrow" onClick={() => go(1)} aria-label="next">→</button>
        </div>
      </div>
    </div>
  );
}
