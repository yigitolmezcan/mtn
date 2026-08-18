'use client';
import { useMemo } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { useLeague } from '@/lib/LeagueContext';
import { playerHref } from '@/lib/playerHref';

export default function RakamlarlaView({ players }) {
  const { lang, t } = useLang();
  const { league } = useLeague();
  const list = players.filter((p) => p.lig === league);

  const topRated = useMemo(() => [...list].sort((a, b) => parseFloat(b.mtnRating) - parseFloat(a.mtnRating)).slice(0, 5), [list]);
  const lowestRated = useMemo(() => [...list].sort((a, b) => parseFloat(a.mtnRating) - parseFloat(b.mtnRating)).slice(0, 5), [list]);
  const youngest = useMemo(() => [...list].sort((a, b) => parseFloat(a.yas) - parseFloat(b.yas)).slice(0, 3), [list]);
  const oldest = useMemo(() => [...list].sort((a, b) => parseFloat(b.yas) - parseFloat(a.yas)).slice(0, 3), [list]);
  const tallest = useMemo(() => [...list].sort((a, b) => parseFloat(b.boy) - parseFloat(a.boy)).slice(0, 3), [list]);
  const shortest = useMemo(() => [...list].sort((a, b) => parseFloat(a.boy) - parseFloat(b.boy)).slice(0, 3), [list]);
  const archetypeCounts = useMemo(() => {
    const counts = {};
    list.forEach((p) => { counts[p.arketip] = (counts[p.arketip] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [list]);
  const mostSigned = useMemo(() => {
    const counts = {};
    list.forEach((p) => { counts[p.takim] = (counts[p.takim] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [list]);

  function Row({ p, value }) {
    return (
      <Link href={playerHref(p.slug, lang)} className="stat-row">
        <span className="stat-row__name">{p.ad}</span>
        <span className="stat-row__team">{p.takim}</span>
        <span className="stat-row__value">{value}</span>
      </Link>
    );
  }

  return (
    <div className="wrap ow">
      <Link href="/" className="backlink">
        ← {t.allTransfers}
      </Link>
      <h1 className="ow__title">{t.rakamlarlaTitle}</h1>
      <section className="ow__group">
        <h2 className="ow__gtitle">{t.statTopRated}</h2>
        {topRated.map((p) => <Row key={p.slug} p={p} value={p.mtnRating} />)}
      </section>
      <section className="ow__group">
        <h2 className="ow__gtitle">{t.statLowestRated}</h2>
        {lowestRated.map((p) => <Row key={p.slug} p={p} value={p.mtnRating} />)}
      </section>
      <section className="ow__group">
        <h2 className="ow__gtitle">{t.statYoungest}</h2>
        {youngest.map((p) => <Row key={p.slug} p={p} value={p.yas} />)}
      </section>
      <section className="ow__group">
        <h2 className="ow__gtitle">{t.statOldest}</h2>
        {oldest.map((p) => <Row key={p.slug} p={p} value={p.yas} />)}
      </section>
      <section className="ow__group">
        <h2 className="ow__gtitle">{t.statTallest}</h2>
        {tallest.map((p) => <Row key={p.slug} p={p} value={p.boy} />)}
      </section>
      <section className="ow__group">
        <h2 className="ow__gtitle">{t.statShortest}</h2>
        {shortest.map((p) => <Row key={p.slug} p={p} value={p.boy} />)}
      </section>
      <section className="ow__group">
        <h2 className="ow__gtitle">{t.statArchetype}</h2>
        {archetypeCounts.map(([ark, count]) => (
          <div className="stat-row" key={ark}>
            <span className="stat-row__name">{ark}</span>
            <span className="stat-row__value">{count}</span>
          </div>
        ))}
      </section>
      <section className="ow__group">
        <h2 className="ow__gtitle">{t.statMostSigned}</h2>
        {mostSigned.map(([takim, count]) => (
          <div className="stat-row" key={takim}>
            <span className="stat-row__name">{takim}</span>
            <span className="stat-row__value">{count}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
