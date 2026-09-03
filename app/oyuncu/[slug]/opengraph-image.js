import { ImageResponse } from 'next/og';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import sharp from 'sharp';
import { getPlayer } from '@/lib/players';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// satori CSS değişkeni çözmüyor; hepsi düz hex.
// Çizginin sönme basamakları: %70'e kadar doğrusal iniyor, sonrası şeffaf.
// 16 parça x 37px = 592px. satori'de flex:1 ince kutularda genişlemediği
// için parça genişliği açıkça veriliyor.
const LINE_STEPS = Array.from({ length: 16 }, (_, i) => {
  const t = i / 15;
  return t >= 0.7 ? 0 : Math.round((1 - t / 0.7) * 100) / 100;
});

const C = {
  ink: '#0A0A0B',
  bone: '#ECEAE7',
  muted: '#9A9AA2',
  court: '#E0742F',
};

// data/oyuncular.json'daki bazı renk2 değerleri CSS token'ı olarak duruyor
// ("var(--bone)"); satori bunu çözemediği için önce gerçek hex'e çevriliyor.
function resolveColor(val, fallback) {
  if (!val) return fallback;
  if (val === 'var(--bone)') return C.bone;
  return val;
}

function fileToDataUri(absPath, mime) {
  return `data:${mime};base64,${readFileSync(absPath).toString('base64')}`;
}

// Satori AVIF ve WebP'yi çözemeyip sessizce çöküyor, bu yüzden bu formatlar
// request anında sharp ile PNG'ye çevriliyor. Fotoğrafların tamamı artık
// WebP olduğu için pratikte hepsi bu yoldan geçiyor.
async function findPlayerPhoto(slug) {
  const exts = [['png', 'image/png'], ['jpg', 'image/jpeg'], ['webp', 'image/webp'], ['avif', 'image/avif']];
  for (const [ext, mime] of exts) {
    const p = join(process.cwd(), 'public', 'players', `${slug}.${ext}`);
    if (existsSync(p)) {
      if (ext === 'avif' || ext === 'webp') {
        const png = await sharp(p).png().toBuffer();
        return `data:image/png;base64,${png.toString('base64')}`;
      }
      return fileToDataUri(p, mime);
    }
  }
  return null;
}

function initialsOf(name) {
  return name.trim().split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

export default async function Image({ params }) {
  const { slug } = await params;
  const p = getPlayer(slug);

  const assetDir = join(process.cwd(), 'og-assets');
  const displayBold = readFileSync(join(assetDir, 'fonts', 'SpaceGrotesk-Bold.ttf'));
  const displayRegular = readFileSync(join(assetDir, 'fonts', 'SpaceGrotesk-Regular.ttf'));
  const sansRegular = readFileSync(join(assetDir, 'fonts', 'Inter-Regular.ttf'));
  const sansSemi = readFileSync(join(assetDir, 'fonts', 'Inter-SemiBold.ttf'));

  const fonts = [
    { name: 'Inter', data: sansRegular, weight: 400, style: 'normal' },
    { name: 'Inter', data: sansSemi, weight: 600, style: 'normal' },
    { name: 'Space Grotesk', data: displayRegular, weight: 400, style: 'normal' },
    { name: 'Space Grotesk', data: displayBold, weight: 700, style: 'normal' },
  ];

  if (!p) {
    return new ImageResponse(
      (
        <div style={{ width: 1200, height: 630, display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.ink, color: C.bone, fontFamily: 'Space Grotesk', fontSize: 60 }}>
          Meet the Newcomers
        </div>
      ),
      { ...size, fonts }
    );
  }

  const takimRenk = resolveColor(p.halkaRenk, C.court);
  const stripe1 = resolveColor(p.renk1, takimRenk);
  const stripe2 = resolveColor(p.renk2, takimRenk);
  const photoUri = await findPlayerPhoto(slug);
  // satori text-transform'u locale'siz uyguluyor; "Bahçeşehir" -> "BAHÇEŞEHIR"
  // oluyordu. Büyük harfe burada, sitedeki digerDil kuralıyla çeviriyoruz.
  const kulupAdi = p.digerDil ? p.takim.toUpperCase() : p.takim.toLocaleUpperCase('tr-TR');
  const logoUri = fileToDataUri(join(process.cwd(), 'public', 'logo-final.png'), 'image/png');

  return new ImageResponse(
    (
      <div style={{ position: 'relative', width: 1200, height: 630, display: 'flex', overflow: 'hidden', background: C.ink }}>
        {/* zemin ışığı */}
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, display: 'flex',
          backgroundImage:
            'radial-gradient(95% 62% at 50% -8%, rgba(224,116,47,.15), transparent 58%),' +
            'radial-gradient(120% 100% at 50% 120%, rgba(0,0,0,.6), transparent 55%)',
        }} />

        {/* sol yarı: fotoğraf, sağa doğru zemine karışıyor */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 470, display: 'flex',
          alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
          backgroundImage: 'linear-gradient(180deg,#1C1C20,#0D0D0F)',
        }}>
          {photoUri ? (
            <img src={photoUri} width={470} height={630} style={{ width: 470, height: 630, objectFit: 'cover' }} />
          ) : (
            <div style={{ display: 'flex', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 150, color: takimRenk, opacity: 0.5 }}>
              {initialsOf(p.ad)}
            </div>
          )}
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: 210, display: 'flex',
            backgroundImage: `linear-gradient(90deg, rgba(10,10,11,0), ${C.ink})`,
          }} />
        </div>

        {/* sol kenar: çift tonlu kulüp şeridi */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 14, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flex: 1, background: stripe1 }} />
          <div style={{ display: 'flex', flex: 1, background: stripe2 }} />
        </div>

        {/* üst çizgi */}
        {/* Sönen üst çizgi. satori ince kutularda linear-gradient'i doğru
            ölçeklemiyordu (592px'lik alanın ancak 200-260px'ini boyuyordu),
            bu yüzden çizgi katı parçalardan kuruluyor. */}
        <div style={{ position: 'absolute', left: 530, top: 92, width: 592, height: 2, display: 'flex' }}>
          {LINE_STEPS.map((o, i) => (
            <div key={i} style={{ flexShrink: 0, width: 37, height: 2, backgroundColor: C.court, opacity: o }} />
          ))}
        </div>

        {/* kulüp / isim / pozisyon */}
        <div style={{ position: 'absolute', left: 530, top: 140, width: 592, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 21, letterSpacing: 3.36, color: C.court, fontWeight: 600 }}>
            {kulupAdi}
          </div>
          <div style={{
            display: 'flex', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 78,
            letterSpacing: -2.73, lineHeight: 0.98, color: C.bone, marginTop: 18,
          }}>
            {p.ad}
          </div>
          <div style={{ display: 'flex', fontSize: 24, color: C.muted, marginTop: 20 }}>
            {p.pozisyon} · {p.arketip}
          </div>
        </div>

        {/* marka kilidi — puanın olduğu yerin yerine geçti */}
        <div style={{ position: 'absolute', left: 530, bottom: 74, display: 'flex', alignItems: 'center' }}>
          <img src={logoUri} height={52} style={{ height: 52 }} />
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 15, fontFamily: 'Space Grotesk', lineHeight: 1.05 }}>
            <div style={{ display: 'flex', fontWeight: 700, fontSize: 27, letterSpacing: -0.68, color: C.bone }}>Meet the</div>
            <div style={{ display: 'flex', fontWeight: 400, fontSize: 27, color: C.muted }}>Newcomers</div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
