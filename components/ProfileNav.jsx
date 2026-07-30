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
  const { t } = useLang();

  function go(id, isVideo) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (isVideo) onVideoClick?.();
  }

  return (
    <nav className="pnav">
      {SECTIONS.map((s) => (
        <button key={s.id} className="pnav__item" onClick={() => go(s.id, s.key === 'navVideo')}>
          {t[s.key]}
        </button>
      ))}
    </nav>
  );
}
