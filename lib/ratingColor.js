export function ratingColor(rating) {
  const r = Math.max(6.5, Math.min(8.5, parseFloat(rating) || 7.5));
  const t = (r - 6.5) / 2;
  const lightness = 68 - t * 26;
  return `hsl(24, 76%, ${lightness}%)`;
}
