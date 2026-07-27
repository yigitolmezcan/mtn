'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const norm = (s) => s.toLocaleLowerCase('tr-TR');

export default function TopbarSearch({ players }) {
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
        .filter((p) => norm(p.ad).includes(norm(query)))
        .sort((a, b) => (parseFloat(b.mtnRating) || 0) - (parseFloat(a.mtnRating) || 0))
        .slice(0, 8)
    : [];

  return (
    <div className="tsearch" ref={boxRef}>
      <button className="tsearch__icon" aria-label="Oyuncu ara" onClick={() => setOpen((v) => !v)}>
        <svg width="22" height="22" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="95" cy="88" r="58" fill="none" stroke="#E0742F" strokeWidth="9" />
          <circle cx="95" cy="88" r="37" fill="#E0742F" />
          <line x1="95" y1="55" x2="95" y2="121" stroke="#0A0A0B" strokeWidth="4" />
          <line x1="62" y1="88" x2="128" y2="88" stroke="#0A0A0B" strokeWidth="4" />
          <path d="M95 55 Q57 88 95 121" fill="none" stroke="#0A0A0B" strokeWidth="4" />
          <path d="M95 55 Q133 88 95 121" fill="none" stroke="#0A0A0B" strokeWidth="4" />
          <line x1="138" y1="123" x2="172" y2="157" stroke="#E0742F" strokeWidth="15" strokeLinecap="round" />
          <circle cx="172" cy="157" r="9" fill="#E0742F" />
        </svg>
        <span className="tsearch__label">Ara...</span>
      </button>

      {open && (
        <div className="tsearch__panel">
          <input
            ref={inputRef}
            className="tsearch__input"
            placeholder="Oyuncu ara..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query.trim() && (
            <ul className="tsearch__results">
              {results.length === 0 && <li className="tsearch__empty">Sonuç bulunamadı</li>}
              {results.map((p) => (
                <li key={p.slug}>
                  <Link href={`/oyuncu/${p.slug}`} onClick={() => { setOpen(false); setQuery(''); }}>
                    <span className="tsearch__info">
                      <span className="tsearch__name">{p.ad}</span>
                      <span className="tsearch__meta">{p.takim} · {p.pozisyon}</span>
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
