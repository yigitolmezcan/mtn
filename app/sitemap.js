import { getAllSlugs } from '@/lib/players';

export default function sitemap() {
  const base = 'https://meetthenewcomers.com';
  const players = getAllSlugs().map((slug) => ({
    url: `${base}/oyuncu/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
  return [{ url: base, changeFrequency: 'daily', priority: 1 }, ...players];
}
