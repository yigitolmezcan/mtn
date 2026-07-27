'use client';
import PlayerCard from '@/components/PlayerCard';
import { useLang } from '@/lib/LanguageContext';

export default function HomeView({ players, sezon }) {
  const { t } = useLang();

  return (
    <main className="wrap">
      <section className="hero">
        <h1 className="hero__h1">
          <span className="hero__a">Meet the</span>
          <span className="hero__b">Newcomers</span>
        </h1>
        <p className="hero__p">{t.heroSubtitle}</p>
        <div className="rail">
          <b>{sezon} {t.season}</b>
          <span>·</span>
          <span>{players.length} {t.players}</span>
        </div>
      </section>

      <section className="grid">
        {players.map((p) => (
          <PlayerCard key={p.slug} player={p} />
        ))}
      </section>

      <section className="explain">
        <div className="eyebrow">{t.assessment}</div>
        <h2 className="explain__h2">{t.ratingExplainH2}</h2>
        <p className="explain__p">{t.ratingExplainP1}</p>
        <p className="explain__p">{t.ratingExplainP2}</p>
      </section>
    </main>
  );
}
