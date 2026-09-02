// Mini yarı saha. Oyuncunun pozisyon(lar)ı büyük ve takım renginde,
// diğerleri küçük ve gri. Renk .crt .act üzerinden --team ile gelir.
const ZONES = {
  PG: { cx: 50, cy: 56 },
  SG: { cx: 84, cy: 34 },
  SF: { cx: 16, cy: 34 },
  PF: { cx: 32, cy: 12 },
  C: { cx: 50, cy: 6 },
};

export default function CourtDiagram({ pozisyon, className = 'crt', style }) {
  const active = pozisyon.split('/').map((s) => s.trim());

  return (
    <svg className={className} viewBox="0 0 100 70" style={style} aria-hidden="true">
      <rect className="ln" x="30" y="0" width="40" height="24" />
      <circle className="ln" cx="50" cy="24" r="12" />
      <path className="ln" d="M 8 4 Q 50 74 92 4" />
      <line className="ln" x1="8" y1="4" x2="8" y2="66" />
      <line className="ln" x1="92" y1="4" x2="92" y2="66" />
      <line className="ln" x1="8" y1="66" x2="92" y2="66" />
      {Object.entries(ZONES).map(([key, z]) => {
        const on = active.includes(key);
        return (
          <circle key={key} className={on ? 'act' : 'dot'} cx={z.cx} cy={z.cy} r={on ? 5 : 3} />
        );
      })}
    </svg>
  );
}
