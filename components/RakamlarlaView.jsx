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
  const youngest = useMemo(() => [...list].sort((a, b) => parseFloat(a.yas) - parseFloat(b.yas)).slice(0, 3), [list]);
  const tallest = useMemo(() => [...list].sort((a, b) => parseFloat(b.boy) - parseFloat(a.boy)).slice(0, 3), [list]);
  const archetypeCounts = useMemo(() => {
    const counts = {};
    list.forEach((p) => { counts[p.arketip] = (counts[p.arketip] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
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
      <h1 className="ow__title">Rakamlarla</h1>
      <section className="ow__group">
        <h2 className="ow__gtitle">En Yüksek Rating</h2>
        {topRated.map((p) => <Row key={p.slug} p={p} value={p.mtnRating} />)}
      </section>
      <section className="ow__group">
        <h2 className="ow__gtitle">En Genç</h2>
        {youngest.map((p) => <Row key={p.slug} p={p} value={p.yas} />)}
      </section>
      <section className="ow__group">
        <h2 className="ow__gtitle">En Uzun</h2>
        {tallest.map((p) => <Row key={p.slug} p={p} value={p.boy} />)}
      </section>
      <section className="ow__group">
        <h2 className="ow__gtitle">Arketip Dağılımı</h2>
        {archetypeCounts.map(([ark, count]) => (
          <div className="stat-row" key={ark}>
            <span className="stat-row__name">{ark}</span>
            <span className="stat-row__value">{count}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
