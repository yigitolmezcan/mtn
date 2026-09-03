'use client';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';

// Global 404 bir server component; dili bilemiyor. İki dili yan yana
// yazmak yerine LanguageContext'ten okuyan bu istemci bileşenine sarıldı,
// böylece kullanıcı tek dil görüyor.
export default function NotFoundView() {
  const { t } = useLang();

  return (
    <main className="wrap" style={{ padding: '60px 0 80px' }}>
      <div className="bhead"><h2>{t.notFoundTitle}</h2></div>
      <p className="cintro">{t.notFoundText}</p>
      <p style={{ marginTop: 8 }}>
        <Link href="/" className="back">{t.backHome}</Link>
      </p>
    </main>
  );
}
