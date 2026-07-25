import Link from 'next/link';

export function Rating({ value, size = 'sm' }) {
  return (
    <div className={`rating rating--${size}`}>
      <span className={`rating__n${value ? '' : ' is-pending'}`}>{value ?? '—'}</span>
      <span className="rating__d">/10</span>
    </div>
  );
}

export default function PlayerCard({ player }) {
  return (
    <Link
      href={`/oyuncu/${player.slug}`}
      className="card"
      style={{ '--team': player.takimRenk, '--serit1': player.renk1, '--serit2': player.renk2 }}
    >
      <div className="card__club">
        <span className="card__cname" lang={player.digerDil ? 'en' : 'tr'}>{player.takim}</span>
      </div>

      <h2 className="card__name">{player.ad}</h2>
      <div className="card__pos" lang="en">{player.pozisyon}</div>
      <p className="card__quote">{player.ozet}</p>

      <div className="card__foot">
        <span className="card__rlbl">MtN <span lang="en">Rating</span></span>
        <Rating value={player.mtnRating} />
      </div>
    </Link>
  );
}
