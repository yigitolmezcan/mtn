import { getAllSlugs } from '@/lib/players';
import { archetypeDefs } from '@/lib/archetypeDefs';
import { archetypeSlug } from '@/lib/archetypeSlug';
import { SITE_URL } from '@/lib/site';

export default function sitemap() {
  const lastModified = new Date();

  const staticPages = [
    { url: SITE_URL, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/newcomer-class-26-27`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/ones-to-watch`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/radar`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/arketipler`, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const archetypes = Object.keys(archetypeDefs).map((ad) => ({
    url: `${SITE_URL}/arketip/${archetypeSlug(ad)}`,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  // Her oyuncu iki dilde yayınlanıyor; ikisi de hreflang ile eşlenmiş durumda.
  const players = getAllSlugs().flatMap((slug) => [
    { url: `${SITE_URL}/oyuncu/${slug}`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/player/${slug}`, changeFrequency: 'weekly', priority: 0.7 },
  ]);

  return [...staticPages, ...archetypes, ...players].map((e) => ({ lastModified, ...e }));
}
