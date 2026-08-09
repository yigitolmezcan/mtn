import { ImageResponse } from 'next/og';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import sharp from 'sharp';
import { getPlayer } from '@/lib/players';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const C = {
  ink: '#0A0A0B',
  surface2: '#17171A',
  bone: '#ECEAE7',
  paper: '#C3C2C0',
  mutedDim: '#5D5D66',
  lineSoft: '#1B1B20',
  court: '#E0742F',
};

// data/oyuncular.json'daki bazı renk2 değerleri CSS custom property olarak
// tanımlı ("var(--bone)") — satori gerçek bir CSS cascade'i çalıştırmadığı
// için bunları render'dan önce gerçek hex karşılığına çeviriyoruz.
function resolveColor(val, fallback) {
  if (!val) return fallback;
  if (val === 'var(--bone)') return C.bone;
  return val;
}

function fileToDataUri(absPath, mime) {
  const buf = readFileSync(absPath);
  return `data:${mime};base64,${buf.toString('base64')}`;
}

// Satori (next/og'un render motoru) AVIF'i çözemeyip çöküyor, bu yüzden
// AVIF kaynaklar request anında sharp ile PNG'ye çevrilip öyle veriliyor.
async function findPlayerPhoto(slug) {
  const exts = [['png', 'image/png'], ['jpg', 'image/jpeg'], ['webp', 'image/webp'], ['avif', 'image/avif']];
  for (const [ext, mime] of exts) {
    const p = join(process.cwd(), 'public', 'players', `${slug}.${ext}`);
    if (existsSync(p)) {
      if (ext === 'avif') {
        const pngBuf = await sharp(p).png().toBuffer();
        return `data:image/png;base64,${pngBuf.toString('base64')}`;
      }
      return fileToDataUri(p, mime);
    }
  }
  return null;
}

function initialsOf(name) {
  return name.trim().split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

const abs = (style) => ({ position: 'absolute', display: 'flex', ...style });

export default async function Image({ params }) {
  const { slug } = await params;
  const p = getPlayer(slug);

  const packDir = join(process.cwd(), 'og-pack:');

  if (!p) {
    return new ImageResponse(
      <div style={{ fontSize: 60, color: C.bone, background: C.ink, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Meet the Newcomers
      </div>,
      size
    );
  }

  const regularFont = readFileSync(join(packDir, 'fonts', 'NimbusSans-Regular.otf'));
  const boldFont = readFileSync(join(packDir, 'fonts', 'NimbusSans-Bold.otf'));

  const euroleagueBadgeUri = fileToDataUri(join(packDir, 'assets', 'euroleague-badge.png'), 'image/png');
  const bslBadgeUri = fileToDataUri(join(process.cwd(), 'public', 'leagues', 'bsl-icon.png'), 'image/png');
  const isBsl = p.lig === 'bsl';

  const photoUri = p.ogFoto
    ? fileToDataUri(join(process.cwd(), 'public', p.ogFoto), 'image/png')
    : await findPlayerPhoto(slug);

  const ring = p.takimRenk || C.court;
  const stripe1 = resolveColor(p.renk1, ring);
  const stripe2 = resolveColor(p.renk2, ring);
  const ozet = p.ozet || '';
  const rating = p.mtnRating ? Number(p.mtnRating).toFixed(1) : '—';

  const photoSize = 300;
  const photoLeft = 100;
  const photoTop = (size.height - photoSize) / 2;
  const bodyLeft = photoLeft + photoSize + 70;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200, height: 630, position: 'relative', display: 'flex',
          overflow: 'hidden', background: C.ink, color: C.bone,
          fontFamily: 'Nimbus Sans',
        }}
      >
        {/* çok soluk saha çizgisi deseni */}
        <div style={abs({ left: 599, top: 0, width: 1, height: 630, background: C.lineSoft, opacity: 0.5 })} />
        <div style={abs({
          left: 460, top: 175, width: 280, height: 280, borderRadius: 999,
          border: `1px solid ${C.lineSoft}`, opacity: 0.5,
        })} />
        <div style={abs({ left: 40, top: 165, width: 220, height: 300, border: `1px solid ${C.lineSoft}`, opacity: 0.5 })} />
        <div style={abs({ left: 940, top: 165, width: 220, height: 300, border: `1px solid ${C.lineSoft}`, opacity: 0.5 })} />

        {/* sol kenar: dikey iki tonlu kulüp şeridi */}
        <div style={abs({ left: 0, top: 0, width: 16, height: 630, background: stripe1 })} />
        <div style={abs({ left: 16, top: 0, width: 10, height: 630, background: stripe2 })} />

        {/* fotoğraf + halo + halka */}
        <div style={abs({
          left: photoLeft - 46, top: photoTop - 46, width: photoSize + 92, height: photoSize + 92,
          borderRadius: 999, background: ring, opacity: 0.08,
        })} />
        <div style={abs({
          left: photoLeft, top: photoTop, width: photoSize, height: photoSize,
          borderRadius: 999, overflow: 'hidden', background: C.surface2,
          border: `3px solid ${ring}`, alignItems: 'center', justifyContent: 'center',
        })}>
          {photoUri ? (
            <img
              src={photoUri}
              style={{ position: 'absolute', display: 'flex', width: photoSize, height: photoSize, objectFit: 'cover' }}
            />
          ) : (
            <div style={{ display: 'flex', fontSize: 96, fontWeight: 700, color: ring }}>{initialsOf(p.ad)}</div>
          )}
        </div>

        {/* lig rozeti */}
        {isBsl ? (
          <div style={abs({
            left: 1094, top: 24, width: 68, height: 68, borderRadius: 16,
            background: C.surface2, border: `1px solid ${C.lineSoft}`,
            alignItems: 'center', justifyContent: 'center',
          })}>
            <img src={bslBadgeUri} width={46} height={46} style={{ display: 'flex' }} />
          </div>
        ) : (
          <img src={euroleagueBadgeUri} width={68} height={68} style={abs({ left: 1094, top: 24, width: 68, height: 68 })} />
        )}

        {/* isim / bilgi bloğu */}
        <div style={abs({ left: bodyLeft, top: 110, right: 60, fontSize: 56, fontWeight: 700, color: C.bone, lineHeight: 1.05 })}>
          {p.ad}
        </div>
        <div style={abs({ left: bodyLeft, top: 190, fontSize: 26, color: C.mutedDim })}>
          {p.pozisyon} · {p.takim}
        </div>
        <div style={abs({
          left: bodyLeft, top: 245, width: 660, fontSize: 22, fontStyle: 'italic',
          color: C.paper, lineHeight: 1.4,
        })}>
          {ozet}
        </div>

        <div style={abs({
          left: bodyLeft, top: 400, width: 150, height: 78, borderRadius: 12,
          background: C.court, alignItems: 'center', justifyContent: 'center',
        })}>
          <div style={{ display: 'flex', fontSize: 38, fontWeight: 700, color: C.ink }}>{rating}</div>
        </div>
        <div style={abs({
          left: bodyLeft, top: 486, fontSize: 13, fontWeight: 700, letterSpacing: 2,
          color: C.mutedDim, textTransform: 'uppercase',
        })}>
          MtN Rating
        </div>

        <div style={abs({ left: 1000, top: 594, fontSize: 13, color: C.mutedDim })}>meetnewcomers.com</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Nimbus Sans', data: regularFont, weight: 400, style: 'normal' },
        { name: 'Nimbus Sans', data: boldFont, weight: 700, style: 'normal' },
      ],
    }
  );
}
