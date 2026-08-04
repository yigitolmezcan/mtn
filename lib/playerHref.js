export function playerHref(slug, lang) {
  return lang === 'en' ? `/player/${slug}` : `/oyuncu/${slug}`;
}
