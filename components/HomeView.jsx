'use client';
import PlayerCard from '@/components/PlayerCard';
import { useLang } from '@/lib/LanguageContext';

export default function HomeView({ players, sezon }) {
  const { lang, t } = useLang();

  const buildDate = new Date();
  const formatted = lang === 'tr'
    ? buildDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
    : buildDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <main className="wrap">
      <section className="hero">
        <h1 className="hero__h1">
          <span className="hero__a">Meet the</span>
          <span className="hero__b">Newcomers</span>
        </h1>
        <p className="hero__p">{t.heroSubtitle}</p>
        <div className="rail">
          <b>{t.playersScouted(players.length)}</b>
          <span>·</span>
          <span>{t.lastUpdated}: {formatted}</span>
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
