'use client';
import Link from 'next/link';
import PlayerPhoto from './PlayerPhoto';
import HomeSearch from './HomeSearch';
import { ClassMark, WatchMark, RadarMark } from './SectionMark';
import { useLang } from '@/lib/LanguageContext';

function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('');
}

function Stack({ players }) {
  return (
    <div className="bv">
      <div className="stack">
        {players.map((p) => (
          <div key={p.slug} className="f" style={{ '--rg': p.halkaRenk }}>
            <PlayerPhoto slug={p.slug} foto={p.foto} name={p.ad} size={84} fallback={initials(p.ad)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Band({ mark, title, lede, stat, go, href, players, radar }) {
  return (
    <section className="band">
      <div className="wrap">
        <div className="bl">
          <div className="bhead">
            {mark}
            <h2>{title}</h2>
          </div>
          <p className="bld">{lede}</p>
          <p className="bst">{stat}</p>
          <Link href={href} className={`bgo${radar ? ' r' : ''}`}>{go}</Link>
        </div>
        <Stack players={players} />
      </div>
    </section>
  );
}

export default function HubView({ searchData, classPreview, owPreview, radarPreview, counts }) {
  const { t } = useLang();

  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <div className="hgrid">
            <div className="hleft">
              <div className="hlock">
                <h1>Meet the<span className="sf">Newcomers</span></h1>
                <img className="hlogo" src="/logo-final.png" alt="" />
              </div>
              <p className="lede">{t.heroLede}</p>
            </div>
            <HomeSearch players={searchData} />
          </div>
        </div>
      </section>

      <Band
        mark={<ClassMark />}
        title={t.classTitle}
        lede={t.classIntro}
        stat={t.reportCount(counts.newcomer)}
        go={t.browse}
        href="/newcomer-class-26-27"
        players={classPreview}
      />
      <Band
        mark={<WatchMark />}
        title={t.onesToWatch}
        lede={t.owBandIntro}
        stat={t.playerCountLabel(counts.ow)}
        go={t.browse}
        href="/ones-to-watch"
        players={owPreview}
      />
      <Band
        mark={<RadarMark />}
        title={t.radar}
        lede={t.radarBandIntro}
        stat={t.nameCount(counts.radar)}
        go={t.browse}
        href="/radar"
        players={radarPreview}
        radar
      />
    </main>
  );
}
