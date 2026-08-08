const VOWELS = 'aeıioöuü';

function lastVowel(name) {
  const clean = name.toLowerCase().replace(/[^a-zçğıöşü]/g, '');
  for (let i = clean.length - 1; i >= 0; i--) {
    if (VOWELS.includes(clean[i])) return clean[i];
  }
  return 'a';
}

function endsWithVowel(name) {
  const clean = name.trim();
  const last = clean[clean.length - 1]?.toLowerCase() || '';
  return VOWELS.includes(last);
}

/** "Barcelona" -> "'nın", "Efes" -> "'in" — ünlü uyumuna göre iyelik eki (-ın/-in/-un/-ün). */
export function genitiveSuffix(name) {
  const v = lastVowel(name);
  let suffix;
  if (v === 'a' || v === 'ı') suffix = 'ın';
  else if (v === 'e' || v === 'i') suffix = 'in';
  else if (v === 'o' || v === 'u') suffix = 'un';
  else suffix = 'ün';
  if (endsWithVowel(name)) suffix = 'n' + suffix;
  return "'" + suffix;
}
