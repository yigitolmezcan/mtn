import { ImageResponse } from 'next/og';
import { getPlayer } from '@/lib/players';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }) {
  const { slug } = await params;
  const p = getPlayer(slug);
  if (!p) {
    return new ImageResponse(
      <div style={{ fontSize: 60, color: '#ECEAE7', background: '#0A0A0B', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Meet the Newcomers
      </div>,
      size
    );
  }

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', background: '#0A0A0B', padding: '64px 72px', position: 'relative',
      }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '12px', background: p.takimRenk, display: 'flex' }} />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 26, color: p.takimRenk, letterSpacing: 3, display: 'flex' }}>{p.takim.toUpperCase()}</div>
          <div style={{ fontSize: 88, color: '#ECEAE7', fontWeight: 700, marginTop: 16, display: 'flex' }}>{p.ad}</div>
          <div style={{ fontSize: 30, color: '#8A8A92', marginTop: 10, display: 'flex' }}>{p.pozisyon}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <div style={{ fontSize: 100, color: '#E0742F', fontWeight: 700, display: 'flex' }}>{p.mtnRating ?? '—'}</div>
            <div style={{ fontSize: 34, color: '#8A8A92', marginLeft: 10, display: 'flex' }}>/10 MtN Rating</div>
          </div>
          <div style={{ fontSize: 22, color: '#5E5E68', marginTop: 20, display: 'flex' }}>
            Özet · Transfer · İstatistik · Özellikler · Video
          </div>
        </div>
      </div>
    ),
    size
  );
}
