'use client';
import { useState, useRef, useEffect } from 'react';

// `foto` alanı lib/players.js tarafından build zamanında çözülür
// (public/players/ okunur), o yüzden doğru uzantı tek istekte gelir.
// Alan yoksa eski uzantı zincirine düşülür — henüz yeniden yazılmamış
// bileşenler bozulmasın diye.
const CHAIN = ['png', 'jpg', 'webp', 'avif'];

export default function PlayerPhoto({ slug, foto, name, size = 56, fallback = null }) {
  const [step, setStep] = useState(0);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef(null);

  const resolved = foto ? `/players/${foto}` : `/players/${slug}.${CHAIN[step]}`;

  function advance() {
    if (foto) return setFailed(true);
    if (step < CHAIN.length - 1) setStep(step + 1);
    else setFailed(true);
  }

  // SSR'de resim React hydrate olmadan 404 dönebilir; onError o anda kaçırılır.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) advance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, foto]);

  if (failed) return fallback;

  return (
    <img
      ref={imgRef}
      className="pphoto"
      src={resolved}
      alt={name || ''}
      width={size}
      height={size}
      onError={advance}
    />
  );
}
