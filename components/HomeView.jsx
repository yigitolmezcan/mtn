'use client';
import { useState, useMemo } from 'react';
import PlayerCard from '@/components/PlayerCard';
import { useLang } from '@/lib/LanguageContext';
import { useLeague } from '@/lib/LeagueContext';

export default function HomeView({ players, sezon }) {
  const { lang, t } = useLang();
  const { league } = useLeague();
  const [sortBy, setSortBy] = useState('guncelleme');

  const buildDate = new Date();
  const formatted = lang === 'tr'
    ? buildDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
    : buildDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const leaguePlayers = useMemo(() => players.filter((p) => p.lig === league), [players, league]);

  const sortedPlayers = useMemo(() => {
    if (sortBy === 'takim') {
      return [...leaguePlayers].sort((a, b) => a.takim.localeCompare(b.takim, 'tr'));
    }
    if (sortBy === 'puan') {
      return [...leaguePlayers].sort((a, b) => (parseFloat(b.mtnRating) || 0) - (parseFloat(a.mtnRating) || 0));
    }
    return leaguePlayers; // güncelleme sırası — zaten doğru dizilmiş geliyor
  }, [leaguePlayers, sortBy]);

  return (
    <main className="wrap">
      <section className="hero">
        <div className="hero__lockup">
          <h1 className="hero__h1">
            <span className="hero__a">Meet the</span>
            <span className="hero__b">Newcomers</span>
          </h1>
          <img src="/logo-final.png" alt="" className="hero__logo" />
        </div>
        <p className="hero__p">{league === 'bsl' ? t.heroSubtitleBsl : t.heroSubtitle}</p>
        <div className="rail">
          <b>{t.playersScouted(leaguePlayers.length)}</b>
          <span>·</span>
          <span>{t.lastUpdated}: {formatted}</span>
          <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="guncelleme">{t.sortUpdate}</option>
            <option value="takim">{t.sortTeam}</option>
            <option value="puan">{t.sortRating}</option>
          </select>
        </div>
      </section>

      <section className="grid">
        {sortedPlayers.map((p) => (
          <PlayerCard key={p.slug} player={p} />
        ))}
      </section>

      <section className="explain">
        <div className="eyebrow">{t.assessment}</div>
        <h2 className="explain__h2">{t.ratingExplainH2}</h2>
        <p className="explain__p">{league === 'bsl' ? t.ratingExplainP1Bsl : t.ratingExplainP1}</p>
        <p className="explain__p">{league === 'bsl' ? t.ratingExplainP2Bsl : t.ratingExplainP2}</p>
      </section>
    </main>
  );
}
