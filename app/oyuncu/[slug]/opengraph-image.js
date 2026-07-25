import { ImageResponse } from 'next/og';
import { getPlayer } from '@/lib/players';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }) {
  const { slug } = await params;
  const p = getPlayer(slug);
  if (!p) return new ImageResponse(<div style={{ fontSize: 60, color: '#ECEAE7', background: '#0A0A0B', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Meet the Newcomers</div>, size);

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        background: '#0A0A0B', padding: '70px', position: 'relative',
      }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '10px', background: p.takimRenk }} />
        <div style={{ fontSize: 28, color: p.takimRenk, letterSpacing: '3px', textTransform: 'uppercase', display: 'flex' }}>{p.takim}</div>
        <div style={{ fontSize: 96, color: '#ECEAE7', fontWeight: 700, marginTop: 20, display: 'flex' }}>{p.ad}</div>
        <div style={{ fontSize: 32, color: '#8A8A92', marginTop: 10, display: 'flex' }}>{p.pozisyon}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 'auto' }}>
          <div style={{ fontSize: 80, color: '#E0742F', fontWeight: 700, display: 'flex' }}>{p.mtnRating ?? '—'}</div>
          <div style={{ fontSize: 28, color: '#8A8A92', marginLeft: 8, display: 'flex' }}>/10 MtN Rating</div>
        </div>
      </div>
    ),
    size
  );
}
