import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Meet the Newcomers — European Basketball Scouting';

// Site OG'si bilerek DİLSİZ: eski statik görselde Türkçe metin vardı ve
// yabancı dilde paylaşınca tuhaf duruyordu. satori CSS değişkeni
// çözmediği için renkler düz hex.
const INK = '#0A0A0B';
const BONE = '#ECEAE7';
const MUTED = '#9A9AA2';
const MUTED_DIM = '#7C7C86';
const COURT = '#E0742F';

export default function Image() {
  const assetDir = join(process.cwd(), 'og-assets', 'fonts');
  const displayBold = readFileSync(join(assetDir, 'SpaceGrotesk-Bold.ttf'));
  const displayRegular = readFileSync(join(assetDir, 'SpaceGrotesk-Regular.ttf'));
  const sansRegular = readFileSync(join(assetDir, 'Inter-Regular.ttf'));

  const logoUri = `data:image/png;base64,${readFileSync(join(process.cwd(), 'public', 'logo-final.png')).toString('base64')}`;

  return new ImageResponse(
    (
      <div style={{ position: 'relative', width: 1200, height: 630, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: INK }}>
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, display: 'flex',
          backgroundImage:
            'radial-gradient(95% 62% at 50% -8%, rgba(224,116,47,.15), transparent 58%),' +
            'radial-gradient(120% 100% at 50% 120%, rgba(0,0,0,.6), transparent 55%)',
        }} />

        {/* sol kenar şeridi */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 14, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flex: 1, background: COURT }} />
          <div style={{ display: 'flex', flex: 1, background: BONE }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* logo başlığın içinde — ana sayfadaki gömülü yerleşimin aynısı */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              display: 'flex', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 104,
              letterSpacing: -4.16, lineHeight: 0.94, color: BONE,
            }}>
              Meet the
            </div>
            <img src={logoUri} height={118} style={{ height: 118, marginLeft: 12, marginTop: 22 }} />
          </div>
          <div style={{
            display: 'flex', fontFamily: 'Space Grotesk', fontWeight: 400, fontSize: 104,
            letterSpacing: -4.16, lineHeight: 0.94, color: MUTED,
          }}>
            Newcomers
          </div>
          <div style={{
            display: 'flex', fontSize: 23, letterSpacing: 4.6, textTransform: 'uppercase',
            color: MUTED_DIM, marginTop: 26,
          }}>
            European Basketball Scouting
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Inter', data: sansRegular, weight: 400, style: 'normal' },
        { name: 'Space Grotesk', data: displayRegular, weight: 400, style: 'normal' },
        { name: 'Space Grotesk', data: displayBold, weight: 700, style: 'normal' },
      ],
    }
  );
}
