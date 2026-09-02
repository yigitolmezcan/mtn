'use client';
import Link from 'next/link';
import ProfileRow from './ProfileRow';
import { RadarMark } from './SectionMark';
import { useLang } from '@/lib/LanguageContext';

export default function RadarListView({ players }) {
  const { lang, t } = useLang();

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
          {players.map((p) => (
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
