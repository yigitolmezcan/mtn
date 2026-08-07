'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';

const MENU = [
  { key: 'onesToWatch', labelKey: 'onesToWatch', href: '/ones-to-watch' },
];

export default function MainMenu() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e) {
      if (!e.target.closest('.mainmenu')) setOpen(false);
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  return (
    <div className="mainmenu">
      <button className="mainmenu__toggle" onClick={() => setOpen(v => !v)} aria-label={t.mainMenu}>
        <svg width="18" height="18" viewBox="0 0 18 18">
          <line x1="1" y1="4" x2="17" y2="4" stroke="currentColor" strokeWidth="1.5" />
          <line x1="1" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.5" />
          <line x1="1" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      {open && (
        <div className="mainmenu__panel">
          <div className="mainmenu__section">{t.menuContent}</div>
          {MENU.map((item) => (
            <div key={item.key} className="mainmenu__item">
              <div className="mainmenu__row">
                <Link href={item.href} className="mainmenu__link" onClick={() => setOpen(false)}>
                  {t[item.labelKey]}
                </Link>
                {item.children && (
                  <button
                    className={`mainmenu__chevron${expanded === item.key ? ' open' : ''}`}
                    onClick={() => setExpanded(expanded === item.key ? null : item.key)}
                    aria-label="expand"
                  >▾</button>
                )}
              </div>
              {item.children && expanded === item.key && (
                <div className="mainmenu__children">
                  {item.children.map((child) => (
                    <Link key={child.key} href={`${item.href}${child.anchor}`} className="mainmenu__child" onClick={() => setOpen(false)}>
                      {t[child.labelKey]}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
