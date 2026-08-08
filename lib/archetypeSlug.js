export function archetypeSlug(name) {
  return name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
export function archetypeFromSlug(slug, defs) {
  return Object.keys(defs).find((name) => archetypeSlug(name) === slug) || null;
}
