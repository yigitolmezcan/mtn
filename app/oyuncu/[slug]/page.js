import Link from 'next/link';
import { notFound } from 'next/navigation';
import ClubLogo from '@/components/ClubLogo';
import { Rating } from '@/components/PlayerCard';
import { getPlayer, getAllSlugs } from '@/lib/players';
import { ARCHETYPE_ICONS } from '@/lib/archetypeIcons';
import PositionCourt from '@/components/PositionCourt';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getPlayer(slug);
  if (!p) return {};

  return {
    title: `${p.ad} — ${p.takim}`,
    description: p.ozet,
    openGraph: {
      title: `${p.ad} — ${p.takim}`,
      description: p.ozet,
      type: 'profile',
    },
  };
}

function StatBlock({ comp, featured }) {
  return (
    <div className={`comp${featured ? '' : ' comp--minor'}`}>
      <div className="comp__head">
        <span lang="en">
          {comp.yarisma} · {comp.sezon}
        </span>
        {featured && <span className="tag">Öne Çıkan</span>}
      </div>
      <div className="stats">
        {comp.items.map(([v, k]) => (
          <div className="stat" key={k}>
            <div className="stat__v">{v}</div>
            <div className="stat__k" lang="en">{k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Ledger({ items, kind }) {
  const sign = kind === 'plus' ? '+' : '−';
  return (
    <ul className={`ledger__list ledger__list--${kind}`}>
      {items.map((o) => (
        <li key={o.t}>
          <span className="ledger__sign">{sign}</span>
          <span>
            {o.t}
            {o.v && <span className="metric">{o.v}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default async function PlayerPage({ params }) {
  const { slug } = await params;
  const p = getPlayer(slug);
  if (!p) notFound();

  const ArketipIcon = p.arketip ? ARCHETYPE_ICONS[p.arketip] : null;

  return (
    <main className="profile" style={{ '--team': p.takimRenk }}>
      <div className="wrap">
        <Link href="/" className="backlink">
          ← Tüm transferler
        </Link>
      </div>

      <header className="head">
        <div className="wrap head__inner">
          <div className="crest">
            <ClubLogo src={p.logoUrl} alt={`${p.takim} logosu`} size={32} />
            <div>
              <div className="crest__name">{p.takim}</div>
              <div className="crest__meta">EuroLeague · 2026-27</div>
            </div>
          </div>

          <div className="head__top">
            <div className="head__idcol">
              <h1 className="head__h1">{p.ad}</h1>
              {p.arketip && (
                <span className="tag tag--soft">
                  {ArketipIcon && <ArketipIcon size={14} strokeWidth={2} color="currentColor" />}
                  <span lang="en">{p.arketip}</span>
                </span>
              )}
            </div>
            <div className="head__pos" lang="en">{p.pozisyon}</div>
          </div>

          <dl className="vitalrow">
            <div className="vital">
              <dt>Boy</dt>
              <dd>{p.boy}</dd>
            </div>
            <div className="vital">
              <dt>Yaş</dt>
              <dd>{p.yas}</dd>
            </div>
            <div className="vital">
              <dt>Milliyet</dt>
              <dd>{p.milliyet}</dd>
            </div>
          </dl>

          <PositionCourt pozisyon={p.pozisyon} renk={p.takimRenk} />

          {p.milliyetNotu && <p className="note">{p.milliyetNotu}</p>}
        </div>
      </header>

      <section className="blk wrap">
        <div className="lbl">Değerlendirme</div>
        <div className="verdict-row">
          <p className="verdict">{p.ozet}</p>
          <Rating value={p.mtnRating} size="lg" />
        </div>
        {p.ratingNotu && <p className="rating-note">{p.ratingNotu}</p>}
      </section>

      <section className="blk wrap">
        <div className="lbl">Transfer</div>
        <div className="transfer">
          <div className="node">
            <div className="node__club">{p.geldigiKulup}</div>
            <div className="node__league">{p.geldigiLig}</div>
          </div>
          <div className="link">
            <span className="link__stem" />
            <span className="link__arrow">↓</span>
          </div>
          <div className="node node--to">
            <div className="node__club">{p.takim}</div>
            <div className="node__league">EuroLeague (Avrupa)</div>
          </div>
        </div>
        {p.transferNotu && <p className="note">{p.transferNotu}</p>}
      </section>

      <section className="blk wrap">
        <div className="lbl">İstatistikler</div>
        <StatBlock comp={p.featuredStats} featured />
        {p.digerIstatistikler.map((c) => (
          <StatBlock key={c.yarisma} comp={c} />
        ))}
      </section>

      <section className="blk wrap">
        <div className="ledger">
          <div>
            <div className="lbl">Güçlü Yönler</div>
            <Ledger items={p.gucluYonler} kind="plus" />
          </div>
          <div>
            <div className="lbl">Geliştirmesi Gereken Alanlar</div>
            <Ledger items={p.gelisimAlanlari} kind="minus" />
          </div>
        </div>
      </section>

      <section className="blk wrap">
        <div className="lbl">Benzer Oyuncular</div>
        <div className="chips">
          {p.benzerOyuncular.map((n) => (
            <span className="chip" key={n}>
              {n}
            </span>
          ))}
        </div>
      </section>

      <section className="blk wrap">
        {p.youtubeUrl ? (
          <a className="hl hl--ready" href={p.youtubeUrl} target="_blank" rel="noopener noreferrer">
            <span>YouTube&apos;da <span lang="en">highlights</span> izle</span>
          </a>
        ) : (
          <>
            <button className="hl" disabled>
              <span><span lang="en">Highlights</span> eklenecek</span>
            </button>
            <p className="hl__note">Video bağlantısı henüz eklenmedi</p>
          </>
        )}
      </section>
    </main>
  );
}
