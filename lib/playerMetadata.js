import { getPlayer } from '@/lib/players';
import { SITE_URL } from '@/lib/site';

export function buildPlayerMetadata(slug, lang) {
  const p = getPlayer(slug);
  if (!p) return {};

  const title = lang === 'en' ? `${p.ad} — ${p.takimEn || p.takim}` : `${p.ad} — ${p.takim}`;
  const description = lang === 'en' ? (p.ozetEn || p.ozet) : p.ozet;

  const trUrl = `${SITE_URL}/oyuncu/${slug}`;
  const enUrl = `${SITE_URL}/player/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      url: lang === 'en' ? enUrl : trUrl,
    },
    alternates: {
      // Her dil kendi URL'sini kanonik gösterir; ikisi hreflang ile eşlenir.
      canonical: lang === 'en' ? enUrl : trUrl,
      languages: {
        tr: trUrl,
        en: enUrl,
        'x-default': trUrl,
      },
    },
  };
}
