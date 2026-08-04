import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';
import { getAllPlayers } from '@/lib/players';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function fileToDataUri(absPath, mime) {
  const buf = readFileSync(absPath);
  return `data:${mime};base64,${buf.toString('base64')}`;
}

export default async function Image() {
  const count = getAllPlayers().length;

  const iconUri = fileToDataUri(join(process.cwd(), 'public', 'icon-render.png'), 'image/png');
  const euroleagueUri = fileToDataUri(join(process.cwd(), 'public', 'leagues', 'euroleague-icon.png'), 'image/png');
  const bslUri = fileToDataUri(join(process.cwd(), 'public', 'leagues', 'bsl-icon.png'), 'image/png');

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: '#0A0A0B', position: 'relative',
      }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '10px', background: '#E0742F', display: 'flex' }} />

        <img src={iconUri} width={120} height={120} style={{ marginBottom: 24, display: 'flex' }} />

        <div style={{ fontSize: 62, color: '#ECEAE7', fontWeight: 700, display: 'flex' }}>Meet the Newcomers</div>
        <div style={{ fontSize: 26, color: '#8A8A92', marginTop: 14, display: 'flex' }}>
          EuroLeague'in yeni transferlerini kısa ve net bir gözle anlatıyoruz
        </div>
        <div style={{ fontSize: 22, color: '#E0742F', marginTop: 26, display: 'flex' }}>
          {count} Oyuncu Raporlandı
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 32 }}>
          <img src={euroleagueUri} width={34} height={34} style={{ display: 'flex' }} />
          <img src={bslUri} width={34} height={34} style={{ display: 'flex' }} />
        </div>
      </div>
    ),
    size
  );
}
