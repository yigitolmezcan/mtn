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
    logoUrl: `/logos/${player.takimSlug}.svg`,
  };
}

export const sezon = db.sezon;

export function getAllPlayers() {
  return db.oyuncular.map(decorate);
}

export function getPlayer(slug) {
  const found = db.oyuncular.find((p) => p.slug === slug);
  return found ? decorate(found) : null;
}

export function getAllSlugs() {
  return db.oyuncular.map((p) => p.slug);
}
