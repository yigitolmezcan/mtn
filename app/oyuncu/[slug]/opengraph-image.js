import { ImageResponse } from 'next/og';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import sharp from 'sharp';
import { getPlayer } from '@/lib/players';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const SPEC = {
  colors: {
    background: '#08090B',
    orange: '#E6772E',
    offWhite: '#F5F2EB',
    muted: '#A3A8AF',
    footer: '#777D86',
    pill: '#101318',
    pillBorder: '#2A2F36',
  },
  portrait: { x: 52, y: 82, width: 436, height: 436 },
  brandLogo: { x: 536, y: 26, width: 54, height: 54 },
  leagueBadge: { x: 1094, y: 24, width: 68, height: 68 },
  nameMaxRight: 1088,
};

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

const NAME_SUFFIXES = ['JR', 'JR.', 'SR', 'SR.', 'II', 'III', 'IV'];

function splitPlayerName(name) {
  const words = name.trim().toUpperCase().split(/\s+/);
  if (words.length === 1) return [words[0], ''];
  // "Jr./Sr./II/III" gibi ekler kendi satırına düşmesin, soyadıyla aynı satırda kalsın.
  const splitAt = words.length >= 3 && NAME_SUFFIXES.includes(words.at(-1))
    ? words.length - 2
    : words.length - 1;
  return [words.slice(0, splitAt).join(' '), words.slice(splitAt).join(' ')];
}

// Nimbus Sans Bold büyük harflerde ortalama karakter genişliği ~ fontSize * 0.64.
// Satori'de önceden metin ölçme imkanı yok, bu yüzden isim satırın (left..maxRight)
// aralığına sığması için gereken font boyutunu bu oranla tahmin ediyoruz.
// layout-spec.json'daki nameSize eşik tablosu kısa/orta isimlerde uyuyordu ama
// "AKOBUNDU-EHIOGU" gibi uzun tireli soyadlarında maxRight'ı (1088) aşıyordu —
// o yüzden sabit eşikler yerine gerçek genişliğe göre hesaplayan bu versiyona geçildi.
const CHAR_WIDTH_RATIO = 0.64;
function nameSize(line, preferred, left, maxRight) {
  if (!line) return preferred;
  const available = maxRight - left;
  const fitSize = Math.floor(available / (line.length * CHAR_WIDTH_RATIO));
  return Math.max(28, Math.min(preferred, fitSize));
}

const abs = (style) => ({ position: 'absolute', display: 'flex', ...style });

export default async function Image({ params }) {
  const { slug } = await params;
  const p = getPlayer(slug);

  const packDir = join(process.cwd(), 'og-pack:');

  if (!p) {
    return new ImageResponse(
      <div style={{ fontSize: 60, color: '#ECEAE7', background: '#0A0A0B', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Meet the Newcomers
      </div>,
      size
    );
  }

  const regularFont = readFileSync(join(packDir, 'fonts', 'NimbusSans-Regular.otf'));
  const boldFont = readFileSync(join(packDir, 'fonts', 'NimbusSans-Bold.otf'));

  const backgroundUri = fileToDataUri(join(packDir, 'assets', 'background-1200x630.png'), 'image/png');
  const brandLogoUri = fileToDataUri(join(packDir, 'assets', 'mtn-logo.png'), 'image/png');
  const euroleagueBadgeUri = fileToDataUri(join(packDir, 'assets', 'euroleague-badge.png'), 'image/png');
  const bslBadgeUri = fileToDataUri(join(process.cwd(), 'public', 'leagues', 'bsl-icon.png'), 'image/png');
  const isBsl = p.lig === 'bsl';

  const photoUri = p.ogFoto
    ? fileToDataUri(join(process.cwd(), 'public', p.ogFoto), 'image/png')
    : await findPlayerPhoto(slug);

  // og-pack'teki varsayılan crop (scale:1.38, y:28), paketin referans fotoğrafı olan
  // uzun kaynak görsel (kyle-source.webp) için kalibre edilmiş. Projenin gerçek oyuncu
  // fotoğrafları (findPlayerPhoto) zaten omuz planında kare kare kırpılmış geliyor,
  // bu yüzden onlar için doğal (1:1, kırpmasız) çerçeveleme kullanılıyor.
  const crop = {
    scale: p.ogCrop?.scale ?? 1,
    x: p.ogCrop?.x ?? 0,
    y: p.ogCrop?.y ?? 0,
  };
  const portraitImgWidth = SPEC.portrait.width * crop.scale;
  const portraitImgLeft = (SPEC.portrait.width - portraitImgWidth) / 2 + crop.x;

  const [firstNameLine, secondNameLine] = splitPlayerName(p.ad);
  const C = SPEC.colors;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200, height: 630, position: 'relative', display: 'flex',
          overflow: 'hidden', background: C.background, color: C.offWhite,
          fontFamily: 'Nimbus Sans',
        }}
      >
        <img src={backgroundUri} width="1200" height="630" style={abs({ inset: 0, width: 1200, height: 630 })} />

        {/* portrait: outline ring + white border ring + circular photo */}
        <div style={abs({
          left: SPEC.portrait.x - 16, top: SPEC.portrait.y - 16,
          width: SPEC.portrait.width + 32, height: SPEC.portrait.height + 32,
          borderRadius: 999, background: C.orange,
        })} />
        <div style={abs({
          left: SPEC.portrait.x - 9, top: SPEC.portrait.y - 9,
          width: SPEC.portrait.width + 18, height: SPEC.portrait.height + 18,
          borderRadius: 999, background: C.offWhite,
        })} />
        <div style={abs({
          left: SPEC.portrait.x, top: SPEC.portrait.y,
          width: SPEC.portrait.width, height: SPEC.portrait.height,
          borderRadius: 999, overflow: 'hidden', background: C.orange,
          alignItems: 'center', justifyContent: 'center',
        })}>
          {photoUri && (
            <img
              src={photoUri}
              style={{
                position: 'absolute', display: 'flex',
                width: portraitImgWidth, height: portraitImgWidth, objectFit: 'cover',
                left: portraitImgLeft, top: crop.y, filter: 'grayscale(100%)',
              }}
            />
          )}
        </div>

        <img src={brandLogoUri} width={SPEC.brandLogo.width} height={SPEC.brandLogo.height}
          style={abs({ left: SPEC.brandLogo.x, top: SPEC.brandLogo.y, width: SPEC.brandLogo.width, height: SPEC.brandLogo.height })} />
        <div style={abs({ left: 604, top: 30, fontSize: 22, fontWeight: 700, lineHeight: 1 })}>MEET THE NEWCOMERS</div>
        <div style={abs({ left: 605, top: 57, fontSize: 12, color: '#8E949D', lineHeight: 1 })}>EUROLEAGUE &amp; BSL PLAYER SCOUTING</div>

        {isBsl ? (
          <div style={abs({
            left: SPEC.leagueBadge.x, top: SPEC.leagueBadge.y,
            width: SPEC.leagueBadge.width, height: SPEC.leagueBadge.height,
            borderRadius: 16, background: C.pill, border: `1px solid ${C.pillBorder}`,
            alignItems: 'center', justifyContent: 'center',
          })}>
            <img src={bslBadgeUri} width={46} height={46} style={{ display: 'flex' }} />
          </div>
        ) : (
          <img src={euroleagueBadgeUri} width={SPEC.leagueBadge.width} height={SPEC.leagueBadge.height}
            style={abs({ left: SPEC.leagueBadge.x, top: SPEC.leagueBadge.y, width: SPEC.leagueBadge.width, height: SPEC.leagueBadge.height })} />
        )}

        <div style={abs({
          left: 536, top: 128, minWidth: 98, height: 36, padding: '0 22px',
          borderRadius: 18, background: C.pill, border: `2px solid ${C.pillBorder}`,
          alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700,
        })}>
          {p.pozisyon.toUpperCase()}
        </div>
        <div style={abs({
          left: 646, top: 128, minWidth: 150, height: 36, padding: '0 24px',
          borderRadius: 18, background: C.pill, border: `2px solid ${C.pillBorder}`,
          alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700,
        })}>
          {(p.arketip ?? '').toUpperCase()}
        </div>

        <div style={abs({ left: 536, top: 183, fontSize: 21, fontWeight: 700, color: C.orange })}>
          {p.takim.toUpperCase()}
        </div>
        <div style={abs({
          left: 532, top: 220, fontSize: nameSize(firstNameLine, 68, 532, SPEC.nameMaxRight), fontWeight: 400,
          lineHeight: 1, whiteSpace: 'nowrap',
        })}>
          {firstNameLine}
        </div>
        <div style={abs({
          left: 528, top: 286, fontSize: nameSize(secondNameLine, 92, 528, SPEC.nameMaxRight), fontWeight: 700,
          lineHeight: 1, whiteSpace: 'nowrap',
        })}>
          {secondNameLine}
        </div>

        <div style={abs({ left: 536, top: 373, width: 552, height: 4, background: C.orange })} />
        <div style={abs({ left: 536, top: 395, width: 4, height: 155, background: C.orange })} />
        <div style={abs({ left: 558, top: 405, fontSize: 18, fontWeight: 700, color: C.muted })}>MTN RATING</div>
        <div style={abs({ left: 550, top: 432, fontSize: 110, fontWeight: 700, color: C.orange, lineHeight: 1 })}>
          {p.mtnRating ? Number(p.mtnRating).toFixed(1) : '—'}
        </div>
        <div style={abs({ left: 760, top: 484, fontSize: 32, fontWeight: 400 })}>/ 10</div>

        <div style={abs({ left: 536, top: 590, fontSize: 13, color: C.footer })}>MEETNEWCOMERS.COM</div>
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
