'use client';
import Link from 'next/link';
import MainMenu from './MainMenu';
import { useLang } from '@/lib/LanguageContext';

export default function Topbar() {
  const { lang, toggle } = useLang();

  return (
    <header className="topbar">
      <div className="wrap">
        <div className="tbl">
          <MainMenu />
          <Link href="/" className="mark">Meet the Newcomers</Link>
        </div>
        <div className="lng">
          <button className={lang === 'tr' ? 'active' : ''} onClick={() => lang !== 'tr' && toggle()}>TR</button>
          <span>/</span>
          <button className={lang === 'en' ? 'active' : ''} onClick={() => lang !== 'en' && toggle()}>EN</button>
        </div>
      </div>
    </header>
  );
}
