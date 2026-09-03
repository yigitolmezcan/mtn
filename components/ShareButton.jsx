'use client';
import { useState, useEffect } from 'react';
import { useLang } from '@/lib/LanguageContext';

export default function ShareButton({ url }) {
  const { t } = useLang();
  const [kopyalandi, setKopyalandi] = useState(false);

  useEffect(() => {
    if (!kopyalandi) return;
    const zaman = setTimeout(() => setKopyalandi(false), 2000);
    return () => clearTimeout(zaman);
  }, [kopyalandi]);

  async function kopyala() {
    try {
      await navigator.clipboard.writeText(url);
      setKopyalandi(true);
      return;
    } catch {
      // Clipboard API her bağlamda izin vermiyor; eski yönteme düş.
    }
    try {
      const alan = document.createElement('textarea');
      alan.value = url;
      alan.setAttribute('readonly', '');
      alan.style.position = 'fixed';
      alan.style.opacity = '0';
      document.body.appendChild(alan);
      alan.select();
      const oldu = document.execCommand('copy');
      document.body.removeChild(alan);
      if (oldu) setKopyalandi(true);
    } catch {
      // kopyalanamadıysa buton sessizce eski halinde kalır
    }
  }

  return (
    <button className={`pshare${kopyalandi ? ' ok' : ''}`} onClick={kopyala}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {kopyalandi ? (
          <polyline points="20 6 9 17 4 12" />
        ) : (
          <>
            <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.5 1.5" />
            <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.5-1.5" />
          </>
        )}
      </svg>
      <span>{kopyalandi ? t.copied : t.copyLink}</span>
    </button>
  );
}
