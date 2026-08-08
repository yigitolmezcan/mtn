'use client';
import { useLang } from '@/lib/LanguageContext';
import { playerHref } from '@/lib/playerHref';
import Link from 'next/link';
import PlayerPhoto from './PlayerPhoto';

export default function TeamPageView({ players, teamSlug }) {
  const { lang, t } = useLang();
  if (!players.length) return null;
  const teamName = lang === 'en' ? (players[0].takimEn || players[0].takim) : players[0].takim;

  return (
    <div className="wrap ow">
      <h1 className="ow__title">{teamName}</h1>
      <p className="ow__intro">{t.teamPageIntro(teamName)}</p>
      <div className="ow__cards" style={{ marginTop: 28 }}>
        {players.map((p) => (
          <Link key={p.slug} href={playerHref(p.slug, lang)} className="ow__card">
            <PlayerPhoto slug={p.slug} renk={p.takimRenk} name={p.ad} size={64} />
            <div className="ow__cinfo">
              <div className="ow__cname">{p.ad}</div>
              <div className="ow__cmeta">{p.pozisyon} · {p.arketip}</div>
              <div className="ow__crating">{p.mtnRating}<span>/10</span></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
