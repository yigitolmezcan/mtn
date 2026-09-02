'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MainMenu from './MainMenu';
import { useLang } from '@/lib/LanguageContext';

// Ana sayfada hero zaten büyük başlığı taşıyor; kelime markası ancak
// başlık ekrandan çıkmaya başlayınca beliriyor.
const REVEAL_AT = 240;

export default function Topbar() {
  const { lang, toggle } = useLang();
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    function update() {
      setScrolled(window.scrollY >= REVEAL_AT);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [isHome]);

  const hideMark = isHome && !scrolled;

  return (
    <header className="topbar">
      <div className="wrap">
        <div className="tbl">
          <MainMenu />
          <Link href="/" className={`mark${hideMark ? ' hide' : ''}`}>Meet the Newcomers</Link>
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
