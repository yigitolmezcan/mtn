'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { useLeague } from '@/lib/LeagueContext';
import HeroPlayerCard from './HeroPlayerCard';
import PlayerPhoto from './PlayerPhoto';
import { curatedLists } from '@/data/curatedLists';

const OTW_PICKS = ['umoja-gibson', 'marcus-bingham', 'both-gach'];

function TrioSlide({ href, title, playerSlugs, players, gobtnLabel }) {
  return (
    <Link href={href} className="otw-trio">
      <div className="otw-trio__header">
        <span className="otw-trio__title">{title}</span>
        <img src="/leagues/euroleague-icon.png" alt="" className="otw-trio__leaguebadge" />
      </div>
      <div className="otw-trio__grid">
        {playerSlugs.map((slug) => {
          const p = players.find((pl) => pl.slug === slug);
          if (!p) return null;
          const initials = p.ad.split(' ').map((w) => w[0]).join('').slice(0, 2);
          return (
            <div className="otw-trio__player" key={slug} style={{ '--ring': p.takimRenk }}>
              <span className="otw-trio__photo">
                <PlayerPhoto slug={slug} renk={p.takimRenk} name={p.ad} size={110}
                  fallback={<span className="hcard__fallback">{initials}</span>} />
              </span>
              <div className="otw-trio__pname">{p.ad}</div>
              <div className="otw-trio__pmeta">{p.pozisyon} · {p.takim}</div>
              <div className="otw-trio__psub">{p.arketip}</div>
            </div>
          );
        })}
      </div>
      <span className="otw-trio__gobtn"><span className="otw-trio__gobtn-label">{gobtnLabel}</span> →</span>
    </Link>
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
    ];
    // Ones to Watch ve curated list'ler EuroLeague'e özel — BSL modunda gösterilmiyor.
    if (league === 'euroleague') {
      list.push({ key: 'otw', type: 'otw' });
      Object.entries(curatedLists).forEach(([slug, curated]) => {
        list.push({ key: `curated-${slug}`, type: 'curated', listSlug: slug, curated });
      });
    }
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
      const titleIndex = slides.findIndex((s) => s.type === 'title');
      const titleEl = slideRefs.current[titleIndex];
      const titleHeight = titleEl ? titleEl.scrollHeight : 300;
      setStageHeight(Math.max(titleHeight, 180));
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, [slides, lang, league]);

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
              {slide.type === 'otw' && (
                <TrioSlide
                  href="/ones-to-watch"
                  title={t.onesToWatch}
                  playerSlugs={OTW_PICKS}
                  players={players}
                  gobtnLabel={t.viewFullList}
                />
              )}
              {slide.type === 'curated' && (
                <TrioSlide
                  href={`/liste/${slide.listSlug}`}
                  title={slide.curated.title}
                  playerSlugs={slide.curated.players}
                  players={players}
                  gobtnLabel={t.viewFullList}
                />
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
