'use client';
import Link from 'next/link';
import ProfileRow from './ProfileRow';
import { RadarMark } from './SectionMark';
import { useLang } from '@/lib/LanguageContext';

// Potansiyele göre üç grup. 18 isme çıkınca düz liste taranamaz hale
// geliyor; gruplama hem yapı veriyor hem dereceyi sayfanın omurgası yapıyor.
const GROUPS = [
  { seviye: 'Yüksek', labelKey: 'potGroupHigh' },
  { seviye: 'Orta', labelKey: 'potGroupMid' },
  { seviye: 'Düşük', labelKey: 'potGroupLow' },
];

export default function RadarListView({ players }) {
  const { lang, t } = useLang();

  const gruplar = GROUPS.map((g) => ({
    ...g,
    // Grup içi sıralama veriden geldiği gibi korunuyor.
    oyuncular: players.filter((p) => p.euroleaguePotansiyeli === g.seviye),
  })).filter((g) => g.oyuncular.length > 0);

  // Potansiyeli henüz girilmemiş oyuncu olursa kaybolmasın.
  const gruplanmayan = players.filter(
    (p) => !GROUPS.some((g) => g.seviye === p.euroleaguePotansiyeli)
  );

  return (
    <main>
      <section className="chead">
        <div className="wrap">
          <Link href="/" className="cback">{t.backHome}</Link>
          <div className="bhead" style={{ marginTop: 20 }}>
            <RadarMark />
            <h2>{t.radar}</h2>
          </div>
          <p className="cintro">{t.radarBandIntro}</p>
          <div className="ctools">
            <span className="ccount" style={{ color: 'var(--radar)' }}>
              {t.nameCount(players.length)}
            </span>
          </div>
        </div>
      </section>

      <section style={{ padding: '8px 0 40px' }}>
        <div className="wrap">
          {gruplar.map((g) => (
            <div key={g.seviye}>
              <div className="ogrp ogrp--radar">{t[g.labelKey]}</div>
              {g.oyuncular.map((p) => (
                <ProfileRow
                  key={p.slug}
                  player={p}
                  metin={lang === 'en' ? p.ozetDetayEn : p.ozetDetay}
                  radar
                />
              ))}
            </div>
          ))}
          {gruplanmayan.map((p) => (
            <ProfileRow
              key={p.slug}
              player={p}
              metin={lang === 'en' ? p.ozetDetayEn : p.ozetDetay}
              radar
            />
          ))}
        </div>
      </section>
    </main>
  );
}
