'use client';
import { useState, useMemo } from 'react';
import PlayerCard from '@/components/PlayerCard';
import { useLang } from '@/lib/LanguageContext';
import { useLeague } from '@/lib/LeagueContext';

export default function HomeView({ players, sezon }) {
  const { lang, t } = useLang();
  const { league } = useLeague();
  const [sortBy, setSortBy] = useState('guncelleme');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [posFilter, setPosFilter] = useState(null);
  const [arkFilter, setArkFilter] = useState(null);

  const POSITIONS = ['PG', 'SG', 'SF', 'PF', 'C'];
  const ARCHETYPES = {
    Guards: ['Floor General', 'Combo Guard', 'Scoring Point Guard', 'Slasher', 'Sharpshooter'],
    Wings: ['3&D Wing', 'Scoring Wing', 'Point Forward', 'Athletic Forward'],
    Bigs: ['Stretch Big', 'Athletic Center', 'Rim Protector', 'Post Scorer'],
  };

  const buildDate = new Date();
  const formatted = lang === 'tr'
    ? buildDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
    : buildDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const leaguePlayers = useMemo(() => players.filter((p) => p.lig === league), [players, league]);

  const filteredPlayers = useMemo(() => leaguePlayers.filter(p =>
    (!posFilter || p.pozisyon.split(' / ').includes(posFilter)) &&
    (!arkFilter || p.arketip === arkFilter)
  ), [leaguePlayers, posFilter, arkFilter]);

  const availablePositions = useMemo(() => {
    const base = arkFilter ? leaguePlayers.filter(p => p.arketip === arkFilter) : leaguePlayers;
    const set = new Set();
    base.forEach(p => p.pozisyon.split(' / ').forEach(pos => set.add(pos.trim())));
    return set;
  }, [leaguePlayers, arkFilter]);

  const availableArchetypes = useMemo(() => {
    const base = posFilter ? leaguePlayers.filter(p => p.pozisyon.split(' / ').map(s => s.trim()).includes(posFilter)) : leaguePlayers;
    return new Set(base.map(p => p.arketip));
  }, [leaguePlayers, posFilter]);

  const sortedPlayers = useMemo(() => {
    if (sortBy === 'takim') {
      return [...filteredPlayers].sort((a, b) => a.takim.localeCompare(b.takim, 'tr'));
    }
    if (sortBy === 'puan') {
      return [...filteredPlayers].sort((a, b) => (parseFloat(b.mtnRating) || 0) - (parseFloat(a.mtnRating) || 0));
    }
    return filteredPlayers; // güncelleme sırası — zaten doğru dizilmiş geliyor
  }, [filteredPlayers, sortBy]);

  return (
    <main className="wrap">
      <section className="hero">
        <h1 className="hero__h1">
          <span className="hero__a hero__lockup">
            Meet the <img src="/logo-final.png" alt="" className="hero__logo" />
          </span>
          <span className="hero__b">Newcomers</span>
        </h1>
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
          <button className="filter-toggle" onClick={() => setFiltersOpen(v => !v)}>
            {t.filterLabel}{(posFilter || arkFilter) && <span className="filter-dot" />}
          </button>
        </div>

        {filtersOpen && (
          <div className="filter-panel">
            <div className="filter-group">
              <div className="filter-group__label">{t.filterPosition}</div>
              <div className="filter-chips">
                {POSITIONS.filter(pos => availablePositions.has(pos)).map(pos => (
                  <button key={pos} className={`filter-chip${posFilter === pos ? ' active' : ''}`}
                    onClick={() => setPosFilter(posFilter === pos ? null : pos)}>{pos}</button>
                ))}
              </div>
            </div>
            {Object.entries(ARCHETYPES).map(([group, list]) => {
              const visible = list.filter(ark => availableArchetypes.has(ark));
              if (visible.length === 0) return null;
              return (
                <div className="filter-group" key={group}>
                  <div className="filter-group__label">{group}</div>
                  <div className="filter-chips">
                    {visible.map(ark => (
                      <button key={ark} className={`filter-chip${arkFilter === ark ? ' active' : ''}`}
                        onClick={() => setArkFilter(arkFilter === ark ? null : ark)}>{ark}</button>
                    ))}
                  </div>
                </div>
              );
            })}
            {(posFilter || arkFilter) && (
              <button className="filter-clear" onClick={() => { setPosFilter(null); setArkFilter(null); }}>
                {t.filterClear}
              </button>
            )}
          </div>
        )}
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
