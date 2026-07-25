const ZONES = {
  PG: { cx: 50, cy: 56 },
  SG: { cx: 84, cy: 34 },
  SF: { cx: 16, cy: 34 },
  PF: { cx: 32, cy: 12 },
  C:  { cx: 50, cy: 6 },
};
export default function PositionCourt({ pozisyon, renk }) {
  const active = pozisyon.split('/').map((s) => s.trim());
  return (
    <svg className="pos-court" viewBox="0 0 100 70" aria-hidden="true">
      <rect x="30" y="0" width="40" height="24" />
      <path d="M 8 62 A 42 42 0 0 1 92 62" />
      <line x1="8" y1="62" x2="8" y2="0" />
      <line x1="92" y1="62" x2="92" y2="0" />
      <line x1="8" y1="0" x2="92" y2="0" />
      <circle cx="50" cy="24" r="12" />
      {Object.entries(ZONES).map(([key, z]) => (
        <circle
          key={key}
          cx={z.cx}
          cy={z.cy}
          r={active.includes(key) ? 5 : 3}
          className={active.includes(key) ? 'zone zone--active' : 'zone'}
          style={active.includes(key) ? { fill: renk } : undefined}
        />
      ))}
    </svg>
  );
}
