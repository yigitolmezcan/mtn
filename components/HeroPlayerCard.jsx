import Link from 'next/link';
import PlayerPhoto from './PlayerPhoto';
import { playerHref } from '@/lib/playerHref';
import { useLang } from '@/lib/LanguageContext';

export default function HeroPlayerCard({ player, lang }) {
  const { t } = useLang();
  const initials = player.ad.split(' ').map((w) => w[0]).join('').slice(0, 2);
  return (
    <Link href={playerHref(player.slug, lang)} className="hcard" style={{ '--ring': player.takimRenk }}>
      <span className="hcard__stripe">
        <span style={{ background: player.renk1 || player.takimRenk }} />
        <span style={{ background: player.renk2 || player.takimRenk }} />
      </span>
      <div className="hcard__main">
        <span className="hcard__photowrap">
          <PlayerPhoto slug={player.slug} renk={player.takimRenk} name={player.ad} size={120}
            fallback={<span className="hcard__fallback">{initials}</span>} />
        </span>
        <div className="hcard__body">
          <div className="hcard__name">{player.ad}</div>
          <div className="hcard__meta">{player.pozisyon} · {player.takim}</div>
          <div className="hcard__ozet">{lang === 'en' ? player.ozetEn : player.ozet}</div>
        </div>
      </div>
      <div className="hcard__rating">
        <span className="num">{player.mtnRating ?? '—'}</span>
        <span className="lbl">MtN Rating</span>
      </div>
      <span className="hcard__gobtn"><span className="hcard__gobtn-label">{t.goToProfile}</span> →</span>
    </Link>
  );
}
