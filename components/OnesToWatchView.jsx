'use client';
import { useLang } from '@/lib/LanguageContext';
import { playerHref } from '@/lib/playerHref';
import Link from 'next/link';
import PlayerPhoto from './PlayerPhoto';

function Group({ id, title, items, lang, t }) {
  return (
    <section id={id} className="ow__group">
      <h2 className="ow__gtitle">{title}</h2>
      <div className="ow__cards">
        {items.map(({ player, metin, metinEn }) => (
          <Link key={player.slug} href={playerHref(player.slug, lang)} className="ow__card">
            <PlayerPhoto slug={player.slug} renk={player.takimRenk} name={player.ad} size={64} />
            <div className="ow__cinfo">
              <div className="ow__cname">{player.ad}</div>
              <div className="ow__cmeta">{player.takim} · {player.arketip}</div>
              <div className="ow__crating">{player.mtnRating}<span>/10</span></div>
            </div>
            <p className="ow__ctext">{lang === 'en' ? metinEn : metin}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function OnesToWatchView({ guards, forwards, bigs }) {
  const { lang, t } = useLang();
  return (
    <div className="wrap ow">
      <h1 className="ow__title">{t.onesToWatch}</h1>
      <p className="ow__intro">{t.owIntro}</p>
      <Group id="guards" title={t.owGuards} items={guards} lang={lang} t={t} />
      <Group id="forwards" title={t.owForwards} items={forwards} lang={lang} t={t} />
      <Group id="bigs" title={t.owBigs} items={bigs} lang={lang} t={t} />
    </div>
  );
}
