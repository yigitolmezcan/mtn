// Arama için metin normalizasyonu.
// toLocaleLowerCase('tr-TR') tek başına yetmiyordu: "sisli" yazan "Şişli"yi,
// "besiktas" yazan "Beşiktaş"ı bulamıyordu. Önce Türkçe harfler ASCII
// karşılığına eşlenir (ı/İ NFD ile çözülmediği için elle), sonra kalan
// diakritikler (é, ć, š, ž…) NFD + birleşik işaret temizliğiyle atılır.
const TR = {
  'ı': 'i', 'İ': 'i', 'ş': 's', 'Ş': 's', 'ğ': 'g', 'Ğ': 'g',
  'ü': 'u', 'Ü': 'u', 'ö': 'o', 'Ö': 'o', 'ç': 'c', 'Ç': 'c',
};

export function norm(s) {
  return (s || '')
    .replace(/[ıİşŞğĞüÜöÖçÇ]/g, (c) => TR[c])
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}
