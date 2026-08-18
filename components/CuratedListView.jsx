'use client';
import { useLang } from '@/lib/LanguageContext';
import { playerHref } from '@/lib/playerHref';
import Link from 'next/link';
import PlayerPhoto from './PlayerPhoto';

export default function CuratedListView({ title, intro, introEn, players }) {
  const { lang, t } = useLang();
  if (!players.length) return null;

  return (
    <div className="wrap ow">
      <Link href="/" className="backlink">
        ← {t.allTransfers}
      </Link>
      <h1 className="ow__title">{title}</h1>
      <p className="ow__intro">{lang === 'en' ? introEn : intro}</p>
      <div className="ow__cards" style={{ marginTop: 28 }}>
        {players.map((p) => (
          <Link key={p.slug} href={playerHref(p.slug, lang)} className="ow__card" style={{ '--ring': p.takimRenk }}>
            <span className="ow__card-stripe" style={{ background: p.renk1 }} />
            <span className="ow__card-stripe ow__card-stripe--2" style={{ background: p.renk2 }} />
            <span className="ow__card-badge">{p.pozisyon}</span>
            <span className="ow__card-photowrap">
              <PlayerPhoto slug={p.slug} renk={p.takimRenk} name={p.ad} size={116}
                fallback={<span className="hcard__fallback">{p.ad.split(' ').map((w) => w[0]).join('').slice(0, 2)}</span>} />
            </span>
            <div className="ow__cinfo">
              <div className="ow__cname">{p.ad}</div>
              <div className="ow__cmeta">{p.takim}</div>
              <div className="ow__crating">{p.mtnRating}<span>/10</span></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
