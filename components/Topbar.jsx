'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import TopbarSearch from './TopbarSearch';
import MainMenu from './MainMenu';
import { useLang } from '@/lib/LanguageContext';
import { useLeague } from '@/lib/LeagueContext';
import { playerHref } from '@/lib/playerHref';

function hideIfBroken(e) {
  e.target.style.display = 'none';
}

export default function Topbar({ players }) {
  const { lang, t, toggle } = useLang();
  const { league, setLeague } = useLeague();
  const latest = players.filter((p) => p.lig === league)[0];

  // SSR'de resim daha React hydrate olmadan 404 dönebilir; onError o anda kaçırılır.
  useEffect(() => {
    document.querySelectorAll('.league-switch img').forEach((img) => {
      if (img.complete && img.naturalWidth === 0) img.style.display = 'none';
    });
  }, []);

  return (
    <header className="topbar">
      <div className="wrap topbar__inner">
        <MainMenu />
        <TopbarSearch players={players} />
        {latest && (
          <Link href={playerHref(latest.slug, lang)} className="latest-signal">
            <span className="latest-signal__label">{t.latestSignal}</span>
            <span className="latest-signal__name">{latest.ad}</span>
            <span className="latest-signal__arrow">→</span>
          </Link>
        )}
        <div className="topbar__switches">
          <div className="league-switch">
            <button
              className={league === 'euroleague' ? 'active' : ''}
              onClick={() => setLeague('euroleague')}
              aria-label="EuroLeague"
            >
              <img src="/leagues/euroleague-icon.png" alt="" onError={hideIfBroken} />
            </button>
            <button
              className={league === 'bsl' ? 'active' : ''}
              onClick={() => setLeague('bsl')}
              aria-label="BSL"
            >
              <img src="/leagues/bsl-icon.png" alt="" onError={hideIfBroken} />
            </button>
          </div>
          <div className="lang-switch">
            <button className={lang === 'tr' ? 'active' : ''} onClick={() => lang !== 'tr' && toggle()}>TR</button>
            <span className="lang-switch__sep">/</span>
            <button className={lang === 'en' ? 'active' : ''} onClick={() => lang !== 'en' && toggle()}>EN</button>
          </div>
        </div>
      </div>
    </header>
  );
}
