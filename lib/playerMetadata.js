import { getPlayer } from '@/lib/players';

export function buildPlayerMetadata(slug, lang) {
  const p = getPlayer(slug);
  if (!p) return {};

  const title = lang === 'en' ? `${p.ad} — ${p.takimEn || p.takim}` : `${p.ad} — ${p.takim}`;
  const description = lang === 'en' ? (p.ozetEn || p.ozet) : p.ozet;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
    },
    alternates: {
      languages: {
        'tr': `https://www.meetnewcomers.com/oyuncu/${slug}`,
        'en': `https://www.meetnewcomers.com/player/${slug}`,
        'x-default': `https://www.meetnewcomers.com/oyuncu/${slug}`,
      },
    },
  };
}
