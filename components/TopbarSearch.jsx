'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { playerHref } from '@/lib/playerHref';

const norm = (s) => s.toLocaleLowerCase('tr-TR');

export default function TopbarSearch({ players }) {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function onClick(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
        setQuery('');
      }
    }
    function onKey(e) {
      if (e.key === 'Escape') { setOpen(false); setQuery(''); }
    }
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const results = query.trim()
    ? players
        .filter((p) => norm(p.ad).includes(norm(query)) || norm(p.takim).includes(norm(query)))
        .sort((a, b) => (parseFloat(b.mtnRating) || 0) - (parseFloat(a.mtnRating) || 0))
        .slice(0, 8)
    : [];

  return (
    <div className="tsearch" ref={boxRef}>
      <button className="tsearch__icon" aria-label="Oyuncu ara" onClick={() => setOpen((v) => !v)}>
        <img src="/logo-final.png" width="22" height="22" alt="" />
        <span className="tsearch__label">{t.search}</span>
      </button>

      {open && (
        <div className="tsearch__panel">
          <input
            ref={inputRef}
            className="tsearch__input"
            placeholder={t.search}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query.trim() && (
            <ul className="tsearch__results">
              {results.length === 0 && <li className="tsearch__empty">{t.noResults}</li>}
              {results.map((p) => (
                <li key={p.slug}>
                  <Link href={playerHref(p.slug, lang)} onClick={() => { setOpen(false); setQuery(''); }}>
                    <span className="tsearch__info">
                      <span className="tsearch__name">{p.ad}</span>
                      <span className="tsearch__meta">{lang === 'en' ? p.takimEn : p.takim} · {p.pozisyon}</span>
                    </span>
                    <span className="tsearch__rating">{p.mtnRating ?? '—'}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
