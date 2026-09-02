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
      <Link href="/" className="backlink">
        ← {t.allTransfers}
      </Link>
      <h1 className="ow__title">{teamName}</h1>
      <p className="ow__intro">{t.teamPageIntro(teamName)}</p>
      <div className="ow__cards" style={{ marginTop: 28 }}>
        {players.map((p) => (
          <Link key={p.slug} href={playerHref(p.slug, lang)} className="ow__card" style={{ '--ring': p.takimRenk }}>
            <span className="ow__card-stripe" style={{ background: p.renk1 }} />
            <span className="ow__card-stripe ow__card-stripe--2" style={{ background: p.renk2 }} />
            <span className="ow__card-badge">{teamName}</span>
            <span className="ow__card-photowrap">
              <PlayerPhoto slug={p.slug} renk={p.takimRenk} name={p.ad} size={116}
                fallback={<span className="hcard__fallback">{p.ad.split(' ').map((w) => w[0]).join('').slice(0, 2)}</span>} />
            </span>
            <div className="ow__cinfo">
              <div className="ow__cname">{p.ad}</div>
              <div className="ow__cmeta">{p.pozisyon} · {p.arketip}</div>
              {p.raporTuru === 'radar' ? (
                <div className="ow__crating ow__crating--potential">
                  {{ 'Yüksek': t.potHigh, 'Orta': t.potMid, 'Düşük': t.potLow }[p.euroleaguePotansiyeli] || p.euroleaguePotansiyeli}
                </div>
              ) : (
                <div className="ow__crating">{p.mtnRating}<span>/10</span></div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
