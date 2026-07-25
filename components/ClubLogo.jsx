'use client';

import { useState } from 'react';

/**
 * Kulüp logosu.
 * Dosya /public/logos/<takimSlug>.svg konumundan okunur.
 * Dosya yoksa veya yüklenemezse logo gizlenir, yalnızca kulüp adı kalır.
 *
 * size: kart için 22, profil için 32 (piksel)
 */
export default function ClubLogo({ src, alt, size = 22 }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) return null;

  return (
    <span className="logo-slot" style={{ width: size, height: size }}>
      <img src={src} alt={alt} width={size} height={size} onError={() => setFailed(true)} />
    </span>
  );
}
