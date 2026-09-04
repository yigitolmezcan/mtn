'use client';
import { useState, Suspense } from 'react';
import PlayerPhoto from '@/components/PlayerPhoto';
import ShareButton from '@/components/ShareButton';
import ProfileBackLink from '@/components/ProfileBackLink';
import CourtDiagram from '@/components/CourtDiagram';
import CareerPath from '@/components/CareerPath';
import PotentialGauge from '@/components/PotentialGauge';
import { useLang } from '@/lib/LanguageContext';
import { countryEn } from '@/lib/i18n';
import { translateLeague } from '@/lib/leagueTranslate';
import { playerHref } from '@/lib/playerHref';
import { SITE_URL } from '@/lib/site';

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

  return (
    <main className={`wrap${isRadar ? ' rad' : ''}`} style={{ '--team': p.halkaRenk }}>
      <div className="prow">
        {/* useSearchParams statik prerender'da Suspense sınırı istiyor */}
        <Suspense fallback={<span className="back" />}>
          <ProfileBackLink isRadar={isRadar} />
        </Suspense>
        <ShareButton url={`${SITE_URL}${playerHref(p.slug, lang)}`} />
      </div>

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
                </div>
              )
            ) : (
              <div className="bRate rate">
                <span className="l" lang="en">MtN Rating</span>
                <span className="n">{p.mtnRating || '—'}</span>
              </div>
            )}

            <div className="incourt">
              <span className="clabel">{t.positionLabel}</span>
              <CourtDiagram pozisyon={p.pozisyon} />
            </div>
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
                  <span className="chip" key={o.isim}>{o.isim}</span>
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
