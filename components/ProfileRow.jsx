'use client';
import Link from 'next/link';
import PlayerPhoto from './PlayerPhoto';
import PotentialGauge from './PotentialGauge';
import { useLang } from '@/lib/LanguageContext';
import { playerHref } from '@/lib/playerHref';

function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('');
}

const POT_KEY = { Yüksek: 'potHigh', Orta: 'potMid', Düşük: 'potLow' };

export default function ProfileRow({ player: p, metin, radar = false, from = null }) {
  const { lang, t } = useLang();
  const takim = lang === 'en' ? p.takimEn : p.takim;
  const guclu = (lang === 'en' ? p.gucluYonlerEn : p.gucluYonler) || [];
  const gelisim = (lang === 'en' ? p.gelisimAlanlariEn : p.gelisimAlanlari) || [];
  const stats = p.featuredStats;
  const pot = radar ? p.euroleaguePotansiyeli : null;

  return (
    <Link
      href={`${playerHref(p.slug, lang)}${from ? `?from=${from}` : ''}`}
      className={`orow${radar ? ' rad' : ''}`}
      style={{ '--rg': p.halkaRenk }}
    >
      <div className="ol">
        <span className="oav">
          <PlayerPhoto slug={p.slug} foto={p.foto} name={p.ad} size={104} fallback={initials(p.ad)} />
        </span>
        <div>
          <div className="onm">{p.ad}</div>
          <div className="ocl" lang={p.digerDil ? 'en' : 'tr'}>{takim}</div>
          <div className="oark">
            <span lang="en">{p.pozisyon}</span>
            <span lang="en">{p.arketip}</span>
          </div>
        </div>
      </div>

      <div className="orr">
        <p>{metin}</p>

        {stats && (
          <div className="ostats">
            {stats.items.map(([deger, etiket]) => (
              <span className="ost" key={etiket}>
                <b>{deger}</b>
                <span lang="en">{etiket}</span>
              </span>
            ))}
            <span className="ostl">{stats.yarisma} {stats.sezon}</span>
          </div>
        )}

        {pot && (
          <div className="opotbox">
            <div className="lb">{t.potentialLabel}</div>
            <div className="opotrow">
              <PotentialGauge level={pot} />
              <span className="opotval">{t[POT_KEY[pot]] ?? pot}</span>
            </div>
          </div>
        )}

        <div className="osw">
          <ul>
            {guclu.slice(0, 3).map((x) => <li key={x.t}>{x.t}</li>)}
          </ul>
          <ul className="neg">
            {gelisim.slice(0, 3).map((x) => <li key={x.t}>{x.t}</li>)}
          </ul>
        </div>

        <span className="obtn">{t.browse}</span>
      </div>
    </Link>
  );
}
