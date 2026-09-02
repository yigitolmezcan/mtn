'use client';
import { useState } from 'react';
import Link from 'next/link';
import PlayerPhoto from '@/components/PlayerPhoto';
import CourtDiagram from '@/components/CourtDiagram';
import CareerPath from '@/components/CareerPath';
import PotentialGauge from '@/components/PotentialGauge';
import ChipInfo from '@/components/ChipInfo';
import { useLang } from '@/lib/LanguageContext';
import { countryEn } from '@/lib/i18n';
import { translateLeague } from '@/lib/leagueTranslate';

const POT_KEY = { Yüksek: 'potHigh', Orta: 'potMid', Düşük: 'potLow' };

function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('');
}

function localizeNationality(milliyet, lang) {
  if (lang !== 'en') return milliyet;
  return milliyet.split(' / ').map((c) => countryEn[c] || c).join(' / ');
}

function getYoutubeId(url) {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}

function Section({ label, children, extra = '' }) {
  return (
    <section className={`sec${extra ? ' ' + extra : ''}`}>
      <div className="lb">{label}</div>
      {children}
    </section>
  );
}

export default function PlayerProfile({ p }) {
  const { lang, t } = useLang();
  const [playing, setPlaying] = useState(false);

  const isRadar = p.raporTuru === 'radar';
  const videoId = p.youtubeUrl ? getYoutubeId(p.youtubeUrl) : null;

  const takim = lang === 'en' ? p.takimEn : p.takim;
  const ozetDetay = lang === 'en' ? p.ozetDetayEn : p.ozetDetay;
  const anahtarSoru = lang === 'en' ? p.anahtarSoruEn : p.anahtarSoru;
  const transferNotu = lang === 'en' ? p.transferNotuEn : p.transferNotu;
  const nedenRadarda = lang === 'en' ? (p.nedenRadardaEn || p.nedenRadarda) : p.nedenRadarda;
  const neOlmasiLazim = lang === 'en' ? (p.neOlmasiLazimEn || p.neOlmasiLazim) : p.neOlmasiLazim;
  const guclu = (lang === 'en' ? p.gucluYonlerEn : p.gucluYonler) || [];
  const gelisim = (lang === 'en' ? p.gelisimAlanlariEn : p.gelisimAlanlari) || [];
  const stats = p.featuredStats;
  const pot = p.euroleaguePotansiyeli;

  const backHref = isRadar ? '/radar' : '/newcomer-class-26-27';
  const backLabel = isRadar ? t.radar : t.classTitle;

  const court = <CourtDiagram pozisyon={p.pozisyon} className="crt mCourt" />;

  return (
    <main className={`wrap${isRadar ? ' rad' : ''}`} style={{ '--team': p.halkaRenk }}>
      <Link href={backHref} className="back">← {backLabel}</Link>

      <div className="bGrid">
        <aside className="bRail">
          <div className="bCard">
            <span className="av">
              <PlayerPhoto slug={p.slug} foto={p.foto} name={p.ad} size={112} fallback={initials(p.ad)} />
            </span>
            <div style={{ textAlign: 'center' }}>
              <p className="club" lang={p.digerDil ? 'en' : 'tr'}>{takim}</p>
              <h1 className="pname" style={{ margin: '5px 0 4px' }}>{p.ad}</h1>
              <p className="ark" lang="en">{p.pozisyon} · {p.arketip}</p>
            </div>

            <dl className="bVit">
              {[
                [t.height, p.boy],
                [t.age, p.yas],
                [t.nationality, localizeNationality(p.milliyet, lang)],
                [t.hand, lang === 'en' ? (p.elEn || p.el) : p.el],
              ]
                // Radar kayıtlarında el bilgisi null olabiliyor; boş künye satırı gösterme
                .filter(([, deger]) => deger)
                .map(([etiket, deger]) => (
                  <div className="vt" key={etiket}><dt>{etiket}</dt><dd>{deger}</dd></div>
                ))}
            </dl>

            {isRadar ? (
              pot && (
                <div className="potwrap">
                  <div className="potmain">
                    <span className="potlb">{t.potentialLabel}</span>
                    <PotentialGauge level={pot} className="potg" />
                    <span className="potv">{t[POT_KEY[pot]] ?? pot}</span>
                  </div>
                  {court}
                </div>
              )
            ) : (
              <div className="bRate rate">
                <div
                  className="potmain"
                  style={{ flexDirection: 'row', alignItems: 'baseline', gap: 11, justifyContent: 'center' }}
                >
                  <span className="n">{p.mtnRating || '—'}</span>
                  <span className="l">MtN<br /><span lang="en">Rating</span></span>
                </div>
                {court}
              </div>
            )}
          </div>

          <div className="bCourt">
            <CourtDiagram pozisyon={p.pozisyon} style={{ maxWidth: 158 }} />
          </div>
        </aside>

        <div className="bMain">
          {ozetDetay && (
            <Section label={t.assessment}><p>{ozetDetay}</p></Section>
          )}

          {isRadar
            ? neOlmasiLazim && (
                <Section label={t.neOlmasiLazim} extra="keyq"><p>{neOlmasiLazim}</p></Section>
              )
            : anahtarSoru && (
                <Section label={t.keyQuestion} extra="keyq"><p>{anahtarSoru}</p></Section>
              )}

          {p.kariyerYolu?.length > 0 && (
            <Section label={t.careerPath}>
              <CareerPath duraklar={p.kariyerYolu} digerDil={p.digerDil} />
            </Section>
          )}

          {isRadar
            ? nedenRadarda && (
                <Section label={t.nedenRadarda}><p>{nedenRadarda}</p></Section>
              )
            : transferNotu && (
                <Section label={t.transferNote}><p>{transferNotu}</p></Section>
              )}

          {stats && (
            <Section
              label={
                <>
                  {t.stats} · <span lang="en">{lang === 'en' ? translateLeague(stats.yarisma) : stats.yarisma} {stats.sezon}</span>
                </>
              }
            >
              <div className="stg">
                {stats.items.map(([deger, etiket]) => (
                  <div className="st" key={etiket}>
                    <b>{deger}</b>
                    <span lang="en">{etiket}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {(guclu.length > 0 || gelisim.length > 0) && (
            <Section label={t.strengthsWeaknesses}>
              <div className="led">
                <ul>{guclu.map((x) => <li key={x.t}>{x.t}</li>)}</ul>
                <ul className="neg">{gelisim.map((x) => <li key={x.t}>{x.t}</li>)}</ul>
              </div>
            </Section>
          )}

          {p.benzerOyuncular?.length > 0 && (
            <Section label={t.comparables}>
              <div className="chips">
                {p.benzerOyuncular.map((o) => (
                  <span className="chip" key={o.isim}>
                    {o.isim}
                    <ChipInfo text={lang === 'en' ? o.nedenEn : o.neden} />
                  </span>
                ))}
              </div>
            </Section>
          )}

          <Section label={t.watch}>
            {videoId ? (
              <div className="vid vid--embed">
                {!playing ? (
                  <button className="vid__facade" onClick={() => setPlaying(true)} aria-label={t.watch}>
                    <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt="" />
                    <span className="vid__play">▶</span>
                  </button>
                ) : (
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    title={`${p.ad} highlights`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            ) : (
              <div className="vid">{t.highlightsSoon}</div>
            )}
          </Section>
        </div>
      </div>
    </main>
  );
}
