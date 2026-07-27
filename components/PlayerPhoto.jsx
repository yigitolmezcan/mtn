'use client';
import { useState, useRef, useEffect } from 'react';

export default function PlayerPhoto({ slug, renk, name, size = 56 }) {
  const [ext, setExt] = useState('png');
  const [failed, setFailed] = useState(false);
  const imgRef = useRef(null);

  function advance() {
    if (ext === 'png') setExt('jpg');
    else if (ext === 'jpg') setExt('webp');
    else if (ext === 'webp') setExt('avif');
    else setFailed(true);
  }

  // SSR'de resim daha React hydrate olmadan 404 dönebilir; onError o anda
  // kaçırılır. Mount/ext değişiminde zaten başarısız bitmiş mi diye kontrol et.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      advance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ext]);

  if (failed) return null;

  return (
    <span className="pphoto" style={{ '--ring': renk, width: size, height: size }}>
      <img ref={imgRef} src={`/players/${slug}.${ext}`} alt={name} onError={advance} />
    </span>
  );
}
