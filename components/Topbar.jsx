'use client';
import TopbarSearch from './TopbarSearch';
import { useLang } from '@/lib/LanguageContext';

export default function Topbar({ players }) {
  const { lang, toggle } = useLang();

  return (
    <header className="topbar">
      <div className="wrap topbar__inner">
        <TopbarSearch players={players} />
        <div className="lang-switch">
          <button className={lang === 'tr' ? 'active' : ''} onClick={() => lang !== 'tr' && toggle()}>TR</button>
          <span className="lang-switch__sep">/</span>
          <button className={lang === 'en' ? 'active' : ''} onClick={() => lang !== 'en' && toggle()}>EN</button>
        </div>
      </div>
    </header>
  );
}
