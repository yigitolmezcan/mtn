import db from '@/data/oyuncular.json';

/** Her oyuncuya kulüp bilgisini (ad, marka rengi, vurgu rengi, logo yolu) ekler. */
function decorate(player) {
  const club = db.takimlar[player.takimSlug] ?? {
    ad: player.takimSlug,
    marka: '#1A1A1A',
    vurgu: '#8A8A92',
  };

  return {
    ...player,
    takim: club.ad,
    takimMarkaRenk: club.marka,
    takimRenk: club.vurgu,
    renk1: club.renk1,
    renk2: club.renk2,
    digerDil: club.digerDil || false,
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
