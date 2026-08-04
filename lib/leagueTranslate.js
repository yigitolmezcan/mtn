const dict = {
  'Basketbol Süper Ligi': 'Basketball Super League',
  'Basketbol Şampiyonlar Ligi': 'Basketball Champions League',
  'VTB Ligi': 'VTB League',
  'ABA Ligi': 'ABA League',
  'BNXT Ligi': 'BNXT League',
  'Ligat HaAl': 'Ligat HaAl',
  'İspanya': 'Spain', 'İtalya': 'Italy', 'Türkiye': 'Turkey', 'İngiltere': 'England',
  'Almanya': 'Germany', 'Rusya': 'Russia', 'İsrail': 'Israel', 'ABD': 'USA',
  'Fransa': 'France', 'Litvanya': 'Lithuania', 'Yunanistan': 'Greece',
  'Porto Riko': 'Puerto Rico', 'Adriyatik': 'Adriatic', 'Belçika/Hollanda': 'Belgium/Netherlands',
};

const entries = Object.entries(dict).sort((a, b) => b[0].length - a[0].length);

export function translateLeague(str) {
  if (!str) return str;
  let out = str;
  for (const [tr, en] of entries) out = out.split(tr).join(en);
  return out;
}
