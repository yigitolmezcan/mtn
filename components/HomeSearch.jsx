'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import PlayerPhoto from './PlayerPhoto';
import { useLang } from '@/lib/LanguageContext';
import { playerHref } from '@/lib/playerHref';
import { norm } from '@/lib/searchNormalize';

function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('');
}

// "X için bir rapor bulunamadı." / "No report found for X." — aranan terim
// iki dilde farklı konumda olduğu için cümle içinde bulunup kalın yazılıyor.
function noResultParts(build, q) {
  const msg = build(q);
  const i = msg.indexOf(q);
  if (i === -1) return msg;
  return (
    <>
      {msg.slice(0, i)}
      <b>{q}</b>
      {msg.slice(i + q.length)}
    </>
  );
}

const SECTIONS = [
  { key: 'class', labelKey: 'classTitle', href: '/newcomer-class-26-27' },
  { key: 'radar', labelKey: 'radar', href: '/radar' },
  { key: 'onesToWatch', labelKey: 'onesToWatch', href: '/ones-to-watch' },
];

export default function HomeSearch({ players }) {
  const { lang, t } = useLang();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const hits = useMemo(() => {
    const q = norm(query);
    if (!q) return [];
    return players
      .filter((p) =>
        norm(p.ad).includes(q) ||
        norm(p.takim).includes(q) ||
        norm(p.takimEn).includes(q)
      )
      .slice(0, 8);
  }, [players, query]);

  const typed = query.trim().length > 0;

  return (
    <div className="sblock">
      <label className={`sbox${focused ? ' act' : ''}`}>
        <span className="bm" />
        <input
          className="q"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={t.searchPlaceholder}
          aria-label={t.searchPlaceholder}
        />
      </label>

      {typed && (
        <div className="sres on">
          {hits.length > 0 ? (
            hits.map((p) => (
              <Link
                key={p.slug}
                href={playerHref(p.slug, lang)}
                className="sr"
                style={{ '--rg': p.halkaRenk }}
              >
                <span className="srav">
                  <PlayerPhoto
                    slug={p.slug}
                    foto={p.foto}
                    name={p.ad}
                    size={34}
                    fallback={initials(p.ad)}
                  />
                </span>
                <span className="srt">
                  <span className="srn">{p.ad}</span>
                  <span className="srs">
                    <span lang={p.digerDil ? 'en' : 'tr'}>{lang === 'en' ? p.takimEn : p.takim}</span>
                    {' · '}
                    <span lang="en">{p.pozisyon}</span>
                  </span>
                </span>
              </Link>
            ))
          ) : (
            <div className="sempty">
              <p>{noResultParts(t.searchNoResult, query.trim())}</p>
              <p style={{ color: 'var(--mutedd)', fontSize: '12.5px', marginTop: 6 }}>
                {t.searchBrowse}
              </p>
              <div className="go">
                {SECTIONS.map((s) => (
                  <Link key={s.key} href={s.href}>
                    <span>{t[s.labelKey]}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
