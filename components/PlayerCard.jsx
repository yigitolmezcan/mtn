'use client';
import Link from 'next/link';
import PlayerPhoto from './PlayerPhoto';
import RatingInfo from './RatingInfo';
import { useLang } from '@/lib/LanguageContext';
import { ratingColor } from '@/lib/ratingColor';

export function Rating({ value, size = 'sm' }) {
  const color = value ? ratingColor(value) : undefined;
  return (
    <div className={`rating rating--${size}`}>
      <span className={`rating__n${value ? '' : ' is-pending'}`} style={color ? { color } : undefined}>
        {value ?? '—'}
      </span>
      <span className="rating__d">/10</span>
    </div>
  );
}

export default function PlayerCard({ player }) {
  const { lang } = useLang();
  const ozet = lang === 'en' ? (player.ozetEn || player.ozet) : player.ozet;

  return (
    <Link
      href={`/oyuncu/${player.slug}`}
      className="card"
      style={{ '--team': player.takimRenk, '--serit1': player.renk1, '--serit2': player.renk2 }}
    >
      <div className="card__id">
        <PlayerPhoto slug={player.slug} renk={player.takimRenk} name={player.ad} />
        <div className="card__idtext">
          <span className="card__cname" lang={player.digerDil ? 'en' : 'tr'}>{lang === 'en' ? player.takimEn : player.takim}</span>
          <h2 className="card__name">{player.ad}</h2>
          <span className="card__pos" lang="en">{player.pozisyon}</span>
        </div>
      </div>
      <p className="card__quote">{ozet}</p>

      <div className="card__foot">
        <span className="card__rlbl">MtN <span lang="en">Rating</span><RatingInfo /></span>
        <Rating value={player.mtnRating} />
      </div>
    </Link>
  );
}
