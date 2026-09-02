// Bölüm işaretleri — referanstaki .bmark SVG'leri.
export function ClassMark({ className = 'bmark' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M16 29.5 L13.4 21.6 L3.2 15.2 L3.2 12 L13.4 15.6 L14.1 8.2 L10.6 5.3 L10.6 3.2 L16 5.2 L21.4 3.2 L21.4 5.3 L17.9 8.2 L18.6 15.6 L28.8 12 L28.8 15.2 L18.6 21.6 Z"
        strokeLinejoin="round"
        strokeWidth="1.3"
      />
    </svg>
  );
}

export function WatchMark({ className = 'bmark' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="14" cy="14" r="9.5" />
      <circle cx="14" cy="14" r="5" strokeWidth="1.1" />
      <line x1="21" y1="21" x2="28" y2="28" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function RadarMark({ className = 'bmark r' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 29 A13 13 0 0 1 16 3" />
      <path d="M16 25 A9 9 0 0 1 16 7" />
      <path d="M16 21 A5 5 0 0 1 16 11" />
      <circle cx="16" cy="16" r="1.8" fill="var(--radar)" stroke="none" />
    </svg>
  );
}
