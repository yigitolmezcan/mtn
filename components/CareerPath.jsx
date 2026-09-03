import { Fragment } from 'react';

// Kariyer durakları. Masaüstünde yatay, 700px altında dikey (CSS'te).
// Duraklar flex:1 ile mevcut genişliği paylaşır — kaydırma yok, daralarak sığar.
export default function CareerPath({ duraklar, digerDil = false }) {
  if (!duraklar || duraklar.length === 0) return null;

  // Durak arttıkça sütun daralıyor; yazıyı küçülterek kelimenin
  // bütün kalmasını sağlıyoruz (kaydırma yok kuralı bozulmadan).
  const yogunluk =
    duraklar.length > 11 ? ' path--xdense' : duraklar.length > 8 ? ' path--dense' : '';

  return (
    <div className="pathwrap">
      <div className={`path${yogunluk}`}>
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
