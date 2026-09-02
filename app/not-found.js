import Link from 'next/link';

// Global 404 — herhangi bir eşleşmeyen URL. Oyuncuya özel 404 için
// app/oyuncu/[slug]/not-found.js ve app/player/[slug]/not-found.js var.
export default function NotFound() {
  return (
    <main className="wrap" style={{ padding: '60px 0 80px' }}>
      <div className="bhead"><h2>Sayfa bulunamadı</h2></div>
      <p className="cintro">Aradığınız sayfa mevcut değil ya da taşınmış olabilir.</p>
      <p style={{ marginTop: 8 }}>
        <Link href="/" className="back">← Ana sayfa</Link>
      </p>
    </main>
  );
}
