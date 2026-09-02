'use client';
import Link from 'next/link';
import PlayerPhoto from './PlayerPhoto';
import { useLang } from '@/lib/LanguageContext';
import { playerHref } from '@/lib/playerHref';

function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('');
}

export default function PCard({ player: p }) {
  const { lang } = useLang();
  const takim = lang === 'en' ? p.takimEn : p.takim;
  const ozet = lang === 'en' ? p.ozetEn : p.ozet;

  return (
    <Link href={playerHref(p.slug, lang)} className="pcard" style={{ '--rg': p.halkaRenk }}>
      <span className="pstripe">
        <i style={{ background: p.renk1 }} />
        <i style={{ background: p.renk2 || p.renk1 }} />
      </span>
      <span className="pav">
        <PlayerPhoto slug={p.slug} foto={p.foto} name={p.ad} size={88} fallback={initials(p.ad)} />
      </span>
      <div className="pname">{p.ad}</div>
      <div className="pmeta">
        <span lang="en">{p.pozisyon}</span>
        {' · '}
        <span lang={p.digerDil ? 'en' : 'tr'}>{takim}</span>
      </div>
      <div className="pozet">{ozet}</div>
      <div className="prate">
        <b>{p.mtnRating || '—'}</b>
        <span>MtN <span lang="en">Rating</span></span>
      </div>
    </Link>
  );
}
