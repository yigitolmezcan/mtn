'use client';
import Link from 'next/link';
import ProfileRow from './ProfileRow';
import { WatchMark } from './SectionMark';
import { useLang } from '@/lib/LanguageContext';

export default function OtwView({ groups }) {
  const { lang, t } = useLang();

  return (
    <main>
      <section className="chead">
        <div className="wrap">
          <Link href="/" className="cback">{t.backHome}</Link>
          <div className="bhead" style={{ marginTop: 20 }}>
            <WatchMark />
            <h2>{t.onesToWatch}</h2>
          </div>
          <p className="cintro">{t.owBandIntro}</p>
        </div>
      </section>

      <section style={{ padding: '8px 0 40px' }}>
        <div className="wrap">
          {groups.map((g) => (
            <div key={g.key}>
              <div className="ogrp">{t[g.labelKey]}</div>
              {g.entries.map(({ player, metin, metinEn }) => (
                <ProfileRow
                  key={player.slug}
                  player={player}
                  metin={lang === 'en' ? metinEn : metin}
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
