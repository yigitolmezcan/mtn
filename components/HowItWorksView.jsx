'use client';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';

function Olcek({ satirlar }) {
  return (
    <dl className="scale">
      {satirlar.map(([deger, aciklama]) => (
        <div className="scale__row" key={deger}>
          <dt>{deger}</dt>
          <dd>{aciklama}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function HowItWorksView() {
  const { t } = useLang();

  return (
    <main className="wrap">
      <Link href="/" className="back">{t.backHome}</Link>
      <div className="bhead" style={{ marginTop: 20 }}>
        <h2>{t.howTitle}</h2>
      </div>
      <p className="cintro">{t.howIntro}</p>

      <section className="sec">
        <div className="lb">{t.howRatingTitle}</div>
        <p>{t.howRatingP1}</p>
        <p>{t.howRatingP2}</p>
        <p>{t.howRatingScaleIntro}</p>
        <Olcek satirlar={t.howRatingScale} />
        <p>{t.howRatingP3}</p>
      </section>

      <section className="sec">
        <div className="lb">{t.howPotTitle}</div>
        <p>{t.howPotP1}</p>
        <Olcek satirlar={t.howPotScale} />
        <p>{t.howPotP2}</p>
      </section>

      <section className="sec">
        <div className="lb">{t.howArkTitle}</div>
        <p>{t.howArkP1}</p>
        <p>{t.howArkP2}</p>
        <p><Link href="/arketipler" className="seclink">{t.howArkLink}</Link></p>
      </section>

      <section className="sec" style={{ paddingBottom: 40 }}>
        <div className="lb">{t.howWriteTitle}</div>
        <p>{t.howWriteP1}</p>
        <p>{t.howWriteP2}</p>
        <p>{t.howWriteP3}</p>
        <p>{t.howWriteP4}</p>
      </section>
    </main>
  );
}
