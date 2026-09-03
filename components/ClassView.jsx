'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import PCard from './PCard';
import { ClassMark } from './SectionMark';
import { useLang } from '@/lib/LanguageContext';
import { norm } from '@/lib/searchNormalize';

export default function ClassView({ players }) {
  const { t } = useLang();
  const [sortBy, setSortBy] = useState('guncelleme');
  const [query, setQuery] = useState('');

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

  // Sayfa içi arama listeyi süzüyor, ayrı bir sonuç paneli açmıyor.
  // Ana sayfadaki aramayla aynı Türkçe karakter normalizasyonu.
  const filtered = useMemo(() => {
    const q = norm(query);
    if (!q) return sorted;
    return sorted.filter(
      (p) => norm(p.ad).includes(q) || norm(p.takim).includes(q) || norm(p.takimEn).includes(q)
    );
  }, [sorted, query]);

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

          {/* yalnızca mobilde görünür (CSS) */}
          <label className="csearch">
            <span className="bm" />
            <input
              className="q"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.classSearchPlaceholder}
              aria-label={t.classSearchPlaceholder}
            />
          </label>

          <div className="ctools">
            <span className="ccount">{t.reportCount(filtered.length)}</span>
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
          {filtered.length > 0 ? (
            <div className="cgrid">
              {filtered.map((p) => <PCard key={p.slug} player={p} />)}
            </div>
          ) : (
            <p className="csearch--empty">{t.searchNoResult(query.trim())}</p>
          )}
        </div>
      </section>
    </main>
  );
}
