'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Rating } from '@/components/PlayerCard';
import RatingInfo from '@/components/RatingInfo';
import ChipInfo from '@/components/ChipInfo';
import ProfileNav from '@/components/ProfileNav';
import { ARCHETYPE_ICONS } from '@/lib/archetypeIcons';
import PositionCourt from '@/components/PositionCourt';
import ShareButton from '@/components/ShareButton';
import { useLang } from '@/lib/LanguageContext';
import { countryEn } from '@/lib/i18n';

function localizeNationality(milliyet, lang) {
  if (lang !== 'en') return milliyet;
  return milliyet.split(' / ').map((c) => countryEn[c] || c).join(' / ');
}

function StatBlock({ comp, featured, featuredLabel }) {
  return (
    <div className={`comp${featured ? '' : ' comp--minor'}`}>
      <div className="comp__head">
        <span lang="en">
          {comp.yarisma} · {comp.sezon}
        </span>
        {featured && <span className="tag">{featuredLabel}</span>}
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

function getYoutubeId(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
    return u.searchParams.get('v');
  } catch { return null; }
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

export default function PlayerProfile({ p, allPlayers = [] }) {
  const { lang, t } = useLang();
  const ArketipIcon = p.arketip ? ARCHETYPE_ICONS[p.arketip] : null;
  const [cinematic, setCinematic] = useState(false);

  const teammates = allPlayers.filter(
    (tm) => tm.takimSlug === p.takimSlug && tm.slug !== p.slug && tm.lig === p.lig
  );

  const ozet = lang === 'en' ? (p.ozetDetayEn || p.ozetEn || p.ozet) : (p.ozetDetay || p.ozet);
  const gucluYonler = lang === 'en' ? (p.gucluYonlerEn || p.gucluYonler) : p.gucluYonler;
  const gelisimAlanlari = lang === 'en' ? (p.gelisimAlanlariEn || p.gelisimAlanlari) : p.gelisimAlanlari;
  const transferNotu = lang === 'en' ? (p.transferNotuEn || p.transferNotu) : p.transferNotu;
  const milliyetNotu = lang === 'en' ? (p.milliyetNotuEn || p.milliyetNotu) : p.milliyetNotu;
  const ratingNotu = lang === 'en' ? (p.ratingNotuEn || p.ratingNotu) : p.ratingNotu;
  const milliyet = localizeNationality(p.milliyet, lang);

  return (
    <main className="profile" style={{ '--team': p.takimRenk }}>
      <div className="wrap profile-nav">
        <Link href="/" className="backlink">
          ← {t.allTransfers}
        </Link>
        <ShareButton url={`https://meetnewcomers.com/oyuncu/${p.slug}`} />
      </div>

      <header className="head">
        <div className="wrap head__inner">
          <div className="crest">
            <div>
              <div className="crest__name" lang={p.digerDil ? 'en' : 'tr'}>{p.takim}</div>
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
              <dt>{t.height}</dt>
              <dd>{p.boy}</dd>
            </div>
            <div className="vital">
              <dt>{t.age}</dt>
              <dd>{p.yas}</dd>
            </div>
            <div className="vital">
              <dt>{t.nationality}</dt>
              <dd>{milliyet}</dd>
            </div>
            <div className="vital">
              <dt>{t.hand}</dt>
              <dd>{lang === 'en' ? p.elEn : p.el}</dd>
            </div>
          </dl>

          <PositionCourt pozisyon={p.pozisyon} renk={p.takimRenk} />

          {milliyetNotu && <p className="note">{milliyetNotu}</p>}
        </div>
      </header>

      <ProfileNav onVideoClick={() => setCinematic(true)} />

      <section className="blk wrap" id="section-ozet">
        <div className="lbl">{t.assessment}</div>
        <div className="verdict-row">
          <p className="verdict">{ozet}</p>
          <span className="rating-holder">
            <Rating value={p.mtnRating} size="lg" />
            <RatingInfo />
          </span>
        </div>
        {ratingNotu && <p className="rating-note">{ratingNotu}</p>}
      </section>

      {p.anahtarSoru && (
        <section className="blk wrap">
          <div className="keyq">
            <div className="keyq__label">{t.keyQuestion}</div>
            <p className="keyq__text">
              {lang === 'tr' ? p.anahtarSoru : p.anahtarSoruEn}
            </p>
          </div>
        </section>
      )}

      <section className="blk wrap" id="section-transfer">
        <div className="lbl">{t.transfer}</div>
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
            <div className="node__league">{t.euroleagueEurope}</div>
          </div>
        </div>
        {transferNotu && <p className="note">{transferNotu}</p>}
      </section>

      <section className="blk wrap" id="section-istatistik">
        <div className="lbl">{t.stats}</div>
        <StatBlock comp={p.featuredStats} featured featuredLabel={t.featured} />
        {p.digerIstatistikler.map((c) => (
          <StatBlock key={c.yarisma} comp={c} />
        ))}
      </section>

      <section className="blk wrap" id="section-ozellikler">
        <div className="ledger">
          <div>
            <div className="lbl">{t.strengths}</div>
            <Ledger items={gucluYonler} kind="plus" />
          </div>
          <div>
            <div className="lbl">{t.improve}</div>
            <Ledger items={gelisimAlanlari} kind="minus" />
          </div>
        </div>
      </section>

      <section className="blk wrap">
        <div className="lbl">{t.comparables}</div>
        <div className="chips">
          {p.benzerOyuncular.map((o) => (
            <span className="chip" key={o.isim}>
              {o.isim}
              <ChipInfo text={lang === 'en' ? o.nedenEn : o.neden} />
            </span>
          ))}
        </div>
      </section>

      {teammates.length > 0 && (
        <section className="blk wrap">
          <div className="lbl">{t.otherSignings(p.takim)}</div>
          <div className="chips">
            {teammates.map((tm) => (
              <Link key={tm.slug} href={`/oyuncu/${tm.slug}`} className="chip chip--link">
                {tm.ad}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="blk wrap" id="section-video">
        <div className="lbl">{t.watch}</div>
        {p.youtubeUrl ? (
          <div className={`hl-embed${cinematic ? ' hl-embed--wide' : ''}`}>
            <iframe
              src={`https://www.youtube.com/embed/${getYoutubeId(p.youtubeUrl)}`}
              title={`${p.ad} highlights`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <button className="hl" disabled>
            {lang === 'tr' ? (
              <span><span lang="en">Highlights</span> eklenecek</span>
            ) : (
              <span>{t.highlightsSoon}</span>
            )}
          </button>
        )}
      </section>
    </main>
  );
}
