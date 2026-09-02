import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="wrap" style={{ padding: '60px 0 80px' }}>
      <div className="bhead"><h2>Player not found</h2></div>
      <p className="cintro">The player profile you are looking for does not exist.</p>
      <p style={{ marginTop: 8 }}>
        <Link href="/newcomer-class-26-27" className="back">← 26-27 Newcomer Class</Link>
      </p>
    </main>
  );
}
