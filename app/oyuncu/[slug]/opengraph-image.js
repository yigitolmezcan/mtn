import { ImageResponse } from 'next/og';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { getPlayer } from '@/lib/players';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function fileToDataUri(absPath, mime) {
  const buf = readFileSync(absPath);
  return `data:${mime};base64,${buf.toString('base64')}`;
}

function findPlayerPhoto(slug) {
  const exts = [['png', 'image/png'], ['jpg', 'image/jpeg'], ['webp', 'image/webp']];
  for (const [ext, mime] of exts) {
    const p = join(process.cwd(), 'public', 'players', `${slug}.${ext}`);
    if (existsSync(p)) return fileToDataUri(p, mime);
  }
  return null;
}

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

  const logoUri = fileToDataUri(join(process.cwd(), 'public', 'logo-final.png'), 'image/png');
  const euroleagueUri = fileToDataUri(join(process.cwd(), 'public', 'leagues', 'euroleague-icon.png'), 'image/png');
  const bslUri = fileToDataUri(join(process.cwd(), 'public', 'leagues', 'bsl-icon.png'), 'image/png');
  const leagueUri = p.lig === 'bsl' ? bslUri : euroleagueUri;
  const photoUri = findPlayerPhoto(slug);
  const trait = p.gucluYonler?.[0]?.t || p.ozet.split(',')[0];

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        background: '#0A0A0B', padding: '48px 60px', position: 'relative',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={logoUri} width={30} height={30} style={{ display: 'flex' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 15, color: '#ECEAE7', fontWeight: 700, letterSpacing: 1, display: 'flex' }}>MEET THE NEWCOMERS</div>
              <div style={{ fontSize: 11, color: '#5E5E68', letterSpacing: 2, display: 'flex' }}>PLAYER SCOUTING REPORT</div>
            </div>
          </div>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: '#141010', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={leagueUri} width={26} height={26} style={{ display: 'flex' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 420 }}>
            <div style={{ fontSize: 18, color: p.takimRenk, fontWeight: 700, letterSpacing: 1, display: 'flex' }}>
              {p.takim.toUpperCase()} / {p.pozisyon}
            </div>
            <div style={{ fontSize: 56, color: '#ECEAE7', fontWeight: 700, marginTop: 8, lineHeight: 1.05, display: 'flex' }}>{p.ad}</div>
          </div>

          <div style={{
            width: 190, height: 190, borderRadius: '50%', border: `6px solid ${p.takimRenk}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#17181B',
          }}>
            {photoUri
              ? <img src={photoUri} width={190} height={190} style={{ objectFit: 'cover', display: 'flex' }} />
              : <div style={{ fontSize: 60, color: p.takimRenk, fontWeight: 700, display: 'flex' }}>{p.ad.split(' ').map(w => w[0]).join('').slice(0,2)}</div>}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ fontSize: 13, color: '#8A8A92', letterSpacing: 2, display: 'flex' }}>MTN RATING</div>
            <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 4 }}>
              <div style={{ fontSize: 72, color: '#E0742F', fontWeight: 700, display: 'flex' }}>{p.mtnRating ?? '—'}</div>
              <div style={{ fontSize: 24, color: '#5E5E68', marginLeft: 6, display: 'flex' }}>/10</div>
            </div>
            <div style={{ background: '#141010', borderRadius: 10, padding: '10px 16px', marginTop: 14, maxWidth: 260, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 11, color: '#E0742F', letterSpacing: 1, display: 'flex' }}>{p.arketip?.toUpperCase()}</div>
              <div style={{ fontSize: 14, color: '#C3C2C0', marginTop: 4, display: 'flex' }}>{trait}</div>
            </div>
          </div>
        </div>

        <div style={{ fontSize: 13, color: '#5E5E68', letterSpacing: 1, display: 'flex' }}>MEETNEWCOMERS.COM</div>
      </div>
    ),
    size
  );
}
