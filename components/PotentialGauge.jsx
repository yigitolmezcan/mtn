'use client';
import { useId } from 'react';

// Soldan sağa incelen kama. Dolgu genişliği seviyeye göre:
// Düşük 67, Orta 134, Yüksek 200. 66 ve 133'teki kesikler üç kademeyi işaretler.
const WIDTH = { Düşük: 67, Orta: 134, Yüksek: 200 };

export default function PotentialGauge({ level }) {
  // Aynı sayfada birden fazla kama olduğunda clipPath id'leri çakışmasın.
  const clipId = useId().replace(/:/g, '');
  const w = WIDTH[level] ?? 0;

  return (
    <svg className="opotgauge" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <polygon points="0,18 200,2 200,18" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect x="0" y="0" width="200" height="20" fill="#25252B" />
        <rect x="0" y="0" width={w} height="20" fill="#6FA8FF" />
        <rect x="66" y="0" width="1.5" height="20" fill="#0A0A0B" />
        <rect x="133" y="0" width="1.5" height="20" fill="#0A0A0B" />
      </g>
    </svg>
  );
}
