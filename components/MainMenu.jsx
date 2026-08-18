'use client';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { useLeague } from '@/lib/LeagueContext';

const MENU = [
  { key: 'onesToWatch', labelKey: 'onesToWatch', href: '/ones-to-watch' },
  { key: 'teams', labelKey: 'menuTeams', href: '/takimlar', teams: true },
  { key: 'archetypes', labelKey: 'menuArchetypes', href: '/arketipler' },
  { key: 'bestShooters', label: 'Best Shooters', href: '/liste/best-shooters' },
  { key: 'mostAthletic', label: 'Most Athletic', href: '/liste/most-athletic' },
];

export default function MainMenu({ teams = [] }) {
  const { t, lang } = useLang();
  const { league } = useLeague();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const sortedTeams = useMemo(() => {
    return teams
      .filter((team) => team.lig === league)
      .slice()
      .sort((a, b) => {
        const nameA = lang === 'en' ? (a.adEn || a.ad) : a.ad;
        const nameB = lang === 'en' ? (b.adEn || b.ad) : b.ad;
        return nameA.localeCompare(nameB, lang === 'en' ? 'en' : 'tr');
      });
  }, [teams, league, lang]);

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
                {item.teams ? (
                  <button
                    className="mainmenu__link"
                    onClick={() => setExpanded(expanded === item.key ? null : item.key)}
                  >
                    {item.label || t[item.labelKey]}
                  </button>
                ) : (
                  <Link href={item.href} className="mainmenu__link" onClick={() => setOpen(false)}>
                    {item.label || t[item.labelKey]}
                  </Link>
                )}
                {(item.children || item.teams) && (
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
              {item.teams && expanded === item.key && (
                <div className="mainmenu__children">
                  {sortedTeams.map((team) => (
                    <Link
                      key={team.slug}
                      href={`/takim/${team.slug}`}
                      className="mainmenu__child"
                      onClick={() => setOpen(false)}
                    >
                      {lang === 'en' ? (team.adEn || team.ad) : team.ad}
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
