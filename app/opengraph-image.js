import { ImageResponse } from 'next/og';
import { getAllPlayers } from '@/lib/players';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const count = getAllPlayers().length;

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: '#0A0A0B', position: 'relative',
      }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '10px', background: '#E0742F', display: 'flex' }} />

        <div style={{ position: 'relative', width: 130, height: 130, display: 'flex', marginBottom: 28 }}>
          <div style={{
            width: 104, height: 104, borderRadius: '50%',
            border: '9px solid #E0742F', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 66, height: 66, borderRadius: '50%', background: '#E0742F', display: 'flex' }} />
          </div>
          <div style={{
            position: 'absolute', width: 16, height: 62, background: '#E0742F', borderRadius: 8,
            left: 88, top: 88, transform: 'rotate(45deg)', transformOrigin: 'top left', display: 'flex',
          }} />
        </div>

        <div style={{ fontSize: 62, color: '#ECEAE7', fontWeight: 700, display: 'flex' }}>Meet the Newcomers</div>
        <div style={{ fontSize: 26, color: '#8A8A92', marginTop: 14, display: 'flex' }}>
          EuroLeague'in yeni transferlerini kısa ve net bir gözle anlatıyoruz
        </div>
        <div style={{ fontSize: 22, color: '#E0742F', marginTop: 26, display: 'flex' }}>
          {count} Oyuncu Raporlandı
        </div>
      </div>
    ),
    size
  );
}
