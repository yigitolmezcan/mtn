'use client';
import { useLang } from '@/lib/LanguageContext';

const SECTIONS = [
  { id: 'section-ozet', key: 'navOzet' },
  { id: 'section-transfer', key: 'navTransfer' },
  { id: 'section-istatistik', key: 'navIstatistik' },
  { id: 'section-ozellikler', key: 'navOzellikler' },
  { id: 'section-video', key: 'navVideo' },
];

export default function ProfileNav({ onVideoClick }) {
  const { t, lang } = useLang();

  function go(id, isVideo) {
    const el = document.getElementById(id);
    if (el) {
      const topbar = document.querySelector('.topbar');
      const nav = document.querySelector('.pnav');
      const offset = (topbar?.offsetHeight || 0) + (nav?.offsetHeight || 0) + 16;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    if (isVideo) onVideoClick?.();
  }

  return (
    <nav className="pnav">
      {SECTIONS.map((s) => (
        <button key={s.id} className="pnav__item" onClick={() => go(s.id, s.key === 'navVideo')}>
          <span lang={lang}>{t[s.key]}</span>
        </button>
      ))}
    </nav>
  );
}
