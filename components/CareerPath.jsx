import { Fragment } from 'react';

// Kariyer durakları. Masaüstünde yatay, 700px altında dikey (CSS'te).
// Duraklar flex:1 ile mevcut genişliği paylaşır — kaydırma yok, daralarak sığar.
export default function CareerPath({ duraklar, digerDil = false }) {
  if (!duraklar || duraklar.length === 0) return null;

  return (
    <div className="pathwrap">
      <div className="path">
        {duraklar.map((d, i) => {
          const son = i === duraklar.length - 1;
          return (
            <Fragment key={`${d.kulup}-${d.yil}-${i}`}>
              {i > 0 && <div className={`pline${son ? ' cur' : ''}`} />}
              <div className={`pnode${son ? ' cur' : ''}`}>
                <span className="pdot" />
                <span className="pclub" lang={digerDil ? 'en' : 'tr'}>{d.kulup}</span>
                <span className="pyear">{d.yil}</span>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
