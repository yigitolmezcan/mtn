'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';

const GROUPS = [
  {
    labelKey: 'menuSections',
    items: [
      { key: 'class', labelKey: 'classTitle', href: '/newcomer-class-26-27' },
      { key: 'onesToWatch', labelKey: 'onesToWatch', href: '/ones-to-watch' },
      { key: 'radar', labelKey: 'radar', href: '/radar' },
    ],
  },
  {
    labelKey: 'menuExplore',
    items: [
      { key: 'archetypes', labelKey: 'menuArchetypes', href: '/arketipler' },
    ],
  },
];

export default function MainMenu() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e) {
      if (!e.target.closest('.mainmenu')) setOpen(false);
    }
    function handleEsc(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [open]);

  return (
    <div className="mainmenu">
      <button className="brg" onClick={() => setOpen((v) => !v)} aria-label={t.mainMenu}>
        <i /><i /><i />
      </button>
      {open && (
        <nav className="mainmenu__panel">
          {GROUPS.map((group) => (
            <div key={group.labelKey}>
              <div className="mainmenu__group">{t[group.labelKey]}</div>
              {group.items.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="mainmenu__link"
                  onClick={() => setOpen(false)}
                >
                  {t[item.labelKey]}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      )}
    </div>
  );
}
