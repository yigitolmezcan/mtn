'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import PCard from './PCard';
import { ClassMark } from './SectionMark';
import { useLang } from '@/lib/LanguageContext';

export default function ClassView({ players }) {
  const { t } = useLang();
  const [sortBy, setSortBy] = useState('guncelleme');

  const sorted = useMemo(() => {
    if (sortBy === 'takim') {
      return [...players].sort((a, b) => a.takim.localeCompare(b.takim, 'tr'));
    }
    if (sortBy === 'puan') {
      return [...players].sort(
        (a, b) => (parseFloat(b.mtnRating) || 0) - (parseFloat(a.mtnRating) || 0)
      );
    }
    return players; // güncelleme sırası — veri zaten bu sırada geliyor
  }, [players, sortBy]);

  return (
    <main>
      <section className="chead">
        <div className="wrap">
          <Link href="/" className="cback">{t.backHome}</Link>
          <div className="bhead" style={{ marginTop: 20 }}>
            <ClassMark />
            <h2>{t.classTitle}</h2>
          </div>
          <p className="cintro">{t.classIntro}</p>
          <div className="ctools">
            <span className="ccount">{t.reportCount(players.length)}</span>
            <select
              className="csort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label={t.sortLabel}
            >
              <option value="guncelleme">{t.sortUpdate}</option>
              <option value="takim">{t.sortTeam}</option>
              <option value="puan">{t.sortRating}</option>
            </select>
          </div>
        </div>
      </section>

      <section style={{ padding: '26px 0 40px' }}>
        <div className="wrap">
          <div className="cgrid">
            {sorted.map((p) => <PCard key={p.slug} player={p} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
