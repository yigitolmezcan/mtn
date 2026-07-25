import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="wrap" style={{ padding: '80px 20px' }}>
      <h1 className="explain__h2">Oyuncu bulunamadı</h1>
      <p className="explain__p">Aradığınız oyuncu profili mevcut değil.</p>
      <p style={{ marginTop: 24 }}>
        <Link href="/" className="backlink">← Tüm transferler</Link>
      </p>
    </main>
  );
}
