import fs from 'node:fs';
import path from 'node:path';
import db from '@/data/oyuncular.json';

/**
 * Oyuncu fotoğraflarının uzantısı build zamanında bir kez çözülür.
 * Eskiden PlayerPhoto tarayıcıda png→jpg→webp→avif sırasını deneyip
 * her PNG olmayan oyuncuda 1-3 boşa 404 üretiyordu; artık doğru dosya
 * adı veriyle birlikte geliyor.
 */
const PHOTOS = (() => {
  const map = {};
  try {
    const dir = path.join(process.cwd(), 'public', 'players');
    for (const file of fs.readdirSync(dir)) {
      const m = file.match(/^(.+)\.(png|jpg|jpeg|webp|avif)$/i);
      if (m) map[m[1]] = file;
    }
  } catch {
    // public/players yoksa fotoğraflar sessizce gizlenir
  }
  return map;
})();

/** #RRGGBB → göreli parlaklık (WCAG). CSS token'ları (var(--bone)) için null. */
function luminance(hex) {
  if (typeof hex !== 'string') return null;
  const h = hex.replace('#', '');
  if (!/^[0-9a-f]{6}$/i.test(h)) return null;
  const ch = [0, 2, 4].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}

/**
 * Fotoğraf halkası ve kart şeridi için kulüp rengi.
 * Siyaha çok yakın markalarda (Beşiktaş, Virtus, Paris, ASVEL gibi) renk1
 * zemine karışıyor; bu kulüplerde ikinci renge geçilir.
 */
const KOYU_ESIK = 0.02;

function halkaRenginiSec(renk1, renk2) {
  const l1 = luminance(renk1);
  if (l1 === null || l1 >= KOYU_ESIK) return renk1;
  if (!renk2) return renk1;
  const l2 = luminance(renk2);
  // renk2 bir CSS token'ı (var(--bone)) ya da renk1'den belirgin açıksa geç
  if (l2 === null || l2 > l1) return renk2;
  return renk1;
}

/** Her oyuncuya kulüp bilgisini ve çözülmüş fotoğraf adını ekler. */
function decorate(player) {
  const club = db.takimlar[player.takimSlug] ?? {
    ad: player.takimSlug,
    marka: '#1A1A1A',
    vurgu: '#8A8A92',
  };

  return {
    ...player,
    takim: club.ad,
    takimEn: club.adEn || club.ad,
    takimMarkaRenk: club.marka,
    takimRenk: club.vurgu,
    renk1: club.renk1,
    renk2: club.renk2,
    digerDil: club.digerDil || false,
    halkaRenk: halkaRenginiSec(club.renk1, club.renk2),
    foto: PHOTOS[player.slug] ?? null,
  };
}

export const sezon = db.sezon;

export function getAllPlayers() {
  return db.oyuncular.map(decorate).reverse();
}

export function getPlayer(slug) {
  const found = db.oyuncular.find((p) => p.slug === slug);
  return found ? decorate(found) : null;
}

export function getAllSlugs() {
  return db.oyuncular.map((p) => p.slug);
}
