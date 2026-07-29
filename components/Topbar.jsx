'use client';
import { useEffect } from 'react';
import TopbarSearch from './TopbarSearch';
import { useLang } from '@/lib/LanguageContext';
import { useLeague } from '@/lib/LeagueContext';

function hideIfBroken(e) {
  e.target.style.display = 'none';
}

export default function Topbar({ players }) {
  const { lang, toggle } = useLang();
  const { league, setLeague } = useLeague();

  // SSR'de resim daha React hydrate olmadan 404 dönebilir; onError o anda kaçırılır.
  useEffect(() => {
    document.querySelectorAll('.league-switch img').forEach((img) => {
      if (img.complete && img.naturalWidth === 0) img.style.display = 'none';
    });
  }, []);

  return (
    <header className="topbar">
      <div className="wrap topbar__inner">
        <TopbarSearch players={players} />
        <div className="topbar__switches">
          <div className="league-switch">
            <button
              className={league === 'euroleague' ? 'active' : ''}
              onClick={() => setLeague('euroleague')}
              aria-label="EuroLeague"
            >
              <img src="/leagues/euroleague-icon.jpg" alt="" onError={hideIfBroken} />
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
