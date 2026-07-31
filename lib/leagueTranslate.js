const words = {
  'Basketbol Süper Ligi': 'Basketball Super League',
  'VTB Ligi': 'VTB League',
  'ABA Ligi': 'ABA League',
  'BNXT Ligi': 'BNXT League',
  'Ligat HaAl': 'Ligat HaAl',
};
const countries = {
  'İspanya': 'Spain', 'İtalya': 'Italy', 'Türkiye': 'Turkey', 'İngiltere': 'England',
  'Almanya': 'Germany', 'Rusya': 'Russia', 'İsrail': 'Israel', 'ABD': 'USA',
  'Fransa': 'France', 'Litvanya': 'Lithuania', 'Yunanistan': 'Greece',
  'Porto Riko': 'Puerto Rico', 'Adriyatik': 'Adriatic', 'Belçika/Hollanda': 'Belgium/Netherlands',
};

export function translateLeague(str) {
  if (!str) return str;
  let out = str;
  for (const [tr, en] of Object.entries(words)) out = out.replace(tr, en);
  out = out.replace(/\(([^)]+)\)/, (m, c) => `(${countries[c] || c})`);
  return out;
}
