# Meet the Newcomers — Proje Kuralları

Bu dosya, projede çalışan her Claude oturumu için bağlayıcıdır.
Kod yazmadan veya içerik üretmeden önce buradaki kuralları oku.

---

## Proje nedir

Türkçe bir EuroLeague scouting sitesi. Yeni transfer olan oyuncuları tanıtır.

**Ürün vaadi:** "Yeni bir EuroLeague oyuncusunu 10 saniyede anla, istersen 3 dakika derinleş."

**Hedef kitle:** Türk EuroLeague taraftarı, basketbol meraklısı, transfer takipçisi.

**Hissiyat:** EuroLeague scouting departmanı / premium basketbol veritabanı.
Lüks dergi değil, fintech sitesi değil, genel spor haber sitesi değil.

---

## 1. En önemli kural: MtN Rating

**Claude asla rating vermez.** Ne puan, ne gerekçe cümlesi.
Bu tamamen kullanıcının editoryal kararıdır.

`mtnRating` alanı boşsa `null` bırak. Arayüz otomatik olarak `—` gösterir.
Tahmin etme, öneri yapma, "şu civarda olabilir" deme. Kullanıcıdan iste.

Aynı şey `ratingNotu` için de geçerli.

Rating gerekçesi transferi "iyi/kötü" olarak etiketlemez, oyuncuyu tarif eder.

---

## 2. Uydurma yok

- Doğrulanmamış hiçbir istatistik, boy, yaş veya transfer bilgisi yazma.
- Kaynak bulamadıysan alanı boş bırak ve kullanıcıya bunu **açıkça söyle**.
- Bir sayıdan emin değilsen, sayıyı yazma. "Yaklaşık" değer üretme.
- Kaynaklar çelişiyorsa ikisini de kullanıcıya bildir, sen seçme.

---

## 3. Pozisyonlar

Yalnızca şu kısaltmalar: **PG, SG, SF, PF, C**

- Türkçeleştirme yok. "Kısa Forvet", "KF", "Şutör Guard" yazılmaz.
- İki pozisyon varsa ayraç: `SG / PG` (boşluklu eğik çizgi)
- Pozisyon **rolü** tarif eder, boyu değil. 2.03 m bir oyuncu, oyun tarzı
  kanat forvetiyse `SF / PF` olur — uzunluğuna bakılarak `PF / C` yazılmaz.
- Ana sayfa kartında kısaltma kalır. Tam isim yalnızca profil sayfasında görünür.

---

## 4. Arketipler

`arketip` **kapalı listedir.** Yalnızca aşağıdaki 13 değerden biri kullanılır.
Liste dışına çıkma. Uyan bir karşılık bulamıyorsan yeni etiket uydurma —
kullanıcıya sor.

**Guards**
`Floor General` · `Combo Guard` · `Scoring Point Guard` · `Slasher` · `Sharpshooter`

**Wings**
`3&D Wing` · `Scoring Wing` · `Point Forward` · `Athletic Forward`

**Bigs**
`Stretch Big` · `Athletic Center` · `Rim Protector` · `Post Scorer`

`Post Scorer`: düşük post ve pick-and-roll bitirişlerinden skor üreten, şut menzili veya elit savunma/atletizmle tanımlanmayan içeri oyuncusu.

Kurallar:

- İngilizce yazılır, Türkçeleştirilmez.
- Oyuncu başına **tek** arketip. İkisi arasında kaldıysan kullanıcıya sor, sen seçme.
- Arketip pozisyondan farklı bir şeydir: pozisyon nerede oynadığını,
  arketip nasıl oynadığını söyler. `SG / PG` + `Combo Guard` normaldir.
- Yalnızca profil sayfasında, pozisyonun yanında küçük gri rozet olarak görünür.
  Ana sayfa kartında yer almaz.

Güncel atamalar için data/oyuncular.json dosyasına bak.

**Bilinçli olarak listede olmayanlar:**

- *Savunmacı guard* yok. Bir oyuncuyu savunmasıyla etiketlemek diğer
  meziyetlerini eksiltiyor. Savunması güçlü bir guard, hücum arketipiyle
  etiketlenir; savunma katkısı güçlü yönler bölümünde yazılır.
- *Post oyuncusu* yok. Modern basketbolda sayıları az ve çoğu sırtı dönük
  oyuncu `Stretch Big` tanımına uyum sağlıyor.


## 5. İsimler

- Görünen isim = taraftarın aradığı ve tanıdığı isim → `DJ Stewart`
- Resmî tam isim `resmiAd` alanında saklanır, sayfada görünmez → `D.J. Stewart Jr.`
- Yabancı isimler Türkçeleştirilmez. Aksanlar korunur: `Xabi López-Arostegui`
- Kulüp adları sponsorsuz yazılır: `Anadolu Efes`, `Beşiktaş`, `Baskonia`,
  `Fenerbahçe`, `Paris Basketball`

---

## 6. Format tutarlılığı

| Alan | Format | Örnek |
|---|---|---|
| `boy` | iki ondalık + boşluk + m | `1.97 m` |
| `yas` | yalnızca sayı, metin olarak | `"27"` |
| `milliyet` | Türkçe ülke adı, çift uyruk ` / ` ile | `ABD / Kuzey Makedonya` |
| `geldigiLig` | Lig (Bölge) | `Liga Endesa (İspanya)` |
| `mtnRating` | tek ondalık, metin | `"7.5"` |
| `slug` | küçük harf, tire, Türkçe karakter yok | `tyson-etienne` |

İstatistik kısaltmaları İngilizce: **PPG, RPG, APG, BPG, SPG, FG, 3PT, FT**

---

## 7. Scouting dili

Türk basketbol scoutunun konuştuğu gibi yaz. Google Translate Türkçesi değil.

**Kullan:** Off-ball, Off-screen, Spot-up, Pull-up, Step-back, Drive, Pick-and-roll,
PnR, Roll finisher, Rim protection, Spacing, Self-creation, Playmaking,
Transition, Switch, Help defense, Combo guard, Size, İkinci top yönlendirici

**Kullanma:** "atak yönlü guard", "potaya kesmelerde sıçrama gücü",
"topsuz oyun hacmi", "çember çevresi etkinliği" gibi zorlama çeviriler.

**Yasak kelimeler:** "elit" (gerçekten hak edilmedikçe), abartılı pazarlama dili.
Ton sakin ve profesyoneldir; heyecanlı değil.

Özet ve madde metinlerinde pozisyon isimleri Türkçeye çevrilmez (ör. "power forward" → "güç forvet" yazılmaz). Genel terimler ("forvet", "uzun", "pivot") serbesttir, İngilizce kısaltmanın birebir çevirisi yazılmaz.

Solaklık gibi fiziksel detaylar yalnızca gerçekten ayırt edici olduğunda güçlü yön olarak yazılır, her solak oyuncuda otomatik belirtilmez.

### Madde yazım kuralı

Güçlü yönler ve gelişim alanları **isim öbeği** olarak yazılır.
Fiil çekimi yok, sonda nokta yok, 3-6 kelime.

```
DOĞRU:  "Off-screen çıkışlarda skor üretimi"
YANLIŞ: "Off-screen çıkışlarda skor üretiyor"
YANLIŞ: "Perde arkasından çıkarak sürekli skor üretebilme kabiliyeti"
```

Bir maddeye destekleyici veri eklenebilir ama **her maddeye değil** —
oyuncu başına en fazla 2 tane:

```json
{ "t": "Paint içi bitirişlerde yüksek verim", "v": "%56.0 2PT" }
```

### Tek cümlelik özet

- 95-130 karakter arası
- Tek cümle, sonda nokta
- Oyuncunun **ne tür oyuncu olduğunu** söyler
- Her oyuncuda aynı kalıbı tekrarlama. Üç oyuncu üst üste "öne çıkan" ile
  başlıyorsa yapay durur — "dikkat çeken", "ayrışan", "değer üreten" gibi
  farklı fiillerle çeşitlendir.

---

## 8. Tek maç hikâyesi yok

Profil bir haber yazısı değil. "Son saniyede üç sayılık attı" gibi
anlatılar girmez. Tekrarlanabilir özellikler yazılır:

şut profili · karar alma · topsuz hareket · savunma kapasitesi · rol projeksiyonu

Sezonluk başarı (şampiyonluk, MVP) transfer notu olarak yazılabilir —
tek maç anısı yazılamaz.

---

## 9. Benzer oyuncular

Pozisyon eşleşmesi **yeterli değil.** Şunlara bakılır:

rol · hücum tarzı · fiziksel profil · kendi şutunu yaratma · savunma rolü

**Her oyuncu için 1 ila 2 benzer oyuncu yazılır. 3 veya daha fazla yazılmaz. Karşılaştırma çok net ve güçlüyse tek isim yeterlidir.** Sayı doldurmak için isim ekleme.

Örnek hata: Tyson Etienne için TJ Shorts ve Markquis Nowell yazmak.
İkisi de 1.80 altı, değerleri oyun kurmaktan gelen oyunculardır.
Etienne yüksek volümlü skorer ve kendi şutunu kuran bir guard —
doğru benzetmeler Kevin Punter ve Jordan Loyd.

---

## 10. Ana sayfa kartı vs profil sayfası

**Kart bir vitrindir, scouting raporu değil.** Kartta yalnızca:

takım + logo · oyuncu adı · pozisyon (kısaltma) · tek cümlelik özet · MtN Rating

İstatistikler, destekleyici veriler, güçlü/zayıf maddeleri, arketip → **profil sayfasında.**

- Özet **asla** üç nokta ile kesilmez. Cümle tam görünür.
- Kartlar eşit yükseklikte olur, rating alta hizalanır.

---

## 11. Tasarım

**Değiştirme.** Tasarım dili yerleşti; yeni özellik eklerken mevcut sınıfları kullan.

- Arka plan: soğuk siyaha yakın `#0A0A0B`
- Turuncu `#E0742F` yalnızca üç yerde: rating sayısı, `+` işaretleri, öne çıkan etiketi
- Takım rengi: kartın sol şeridi, kulüp adı, transfer bloğunun varış kulübü
- Monospace font yok
- Serif yalnızca rating sayısında
- İstatistiklerde `tabular-nums` kullanılır
- Mobil öncelikli

Yeni bir görsel eleman gerekirse mevcut bir sınıfı modifier ile genişlet
(`.tag` → `.tag--soft` gibi), sıfırdan yeni bileşen yazma.

Kart şeridi her kulüpte iki renkli (üst/alt split) olarak render edilir; renkler `takimlar` içindeki `renk1`/`renk2` alanlarından gelir. Bu artık istisna değil, standart.

Yeni kulüp eklerken rengi mevcut kulüplerle karşılaştır. Ton çok yakınsa (aynı "kırmızı-krem" ailesi gibi) resmi ton korunur ama `renk1`/`renk2` sırası tersine çevrilerek görsel ayrışma sağlanır.

Kulüp kimliği yalnızca takım rengi (şerit, kulüp adı) ile taşınır. Gerçek kulüp logosu kullanılmıyor — kararlı bir tercih, tekrar gündeme getirilmesin.

---

## 12. Teknik yapı

```
data/oyuncular.json       ← TÜM içerik burada
lib/players.js            ← veriyi okur, kulüp bilgisini ekler
components/PlayerCard.jsx ← ana sayfa kartı
app/page.js               ← ana sayfa
app/oyuncu/[slug]/page.js ← oyuncu profili
app/globals.css           ← tasarım sistemi
```

**Oyuncu eklemek = yalnızca `data/oyuncular.json`'a bir blok eklemek.**
Başka hiçbir dosyaya dokunulmaz. Kod değişikliği gerekmez.

Yeni kulüp gelirse: `takimlar` bölümüne slug + ad + `marka` + `vurgu` + `renk1` + `renk2` renkleri eklenir.

`marka` = kulübün asıl markası. `vurgu` = koyu zeminde okunan renk.
Arayüz `vurgu` kullanır. Örnek: Paris Basketball → marka `#1A1A1A`, vurgu `#00E5FF`.

---

## 13. Çalışma şekli

- **En küçük değişikliği yap.** İstenmeyen refactor yapma.
- İlgisiz dosyalara dokunma.
- Yapısal bir değişiklik önereceksen **önce sor**, sonra uygula.
- Kullanıcı yazılımcı değil. Teknik kararları sade Türkçe açıkla,
  jargonla boğma ama gerçeği de yumuşatma.
- Emin olmadığın bir veriyi doldurmaktansa boş bırakıp sor.
- İş bölümü: **basketbol ve editoryal karar kullanıcıya aittir, uygulama Claude'a.**

---

## 14. Yeni oyuncu eklerken kontrol listesi

- [ ] Pozisyon PG/SG/SF/PF/C mi, role göre mi seçilmiş?
- [ ] İsim taraftarın aradığı biçimde mi, `resmiAd` dolu mu?
- [ ] Boy / yaş / milliyet / lig formatları tablodaki gibi mi?
- [ ] `featuredStats` seçimi doğru mu? (EuroLeague / EuroCup / BCL öncelikli,
      rolü daha iyi temsil ediyorsa yerel lig)
- [ ] Özet 95-110 karakter, tek cümle, kalıp tekrarı yok?
- [ ] Maddeler isim öbeği mi, 3-6 kelime mi, noktasız mı?
- [ ] Destekleyici veri en fazla 2 madde mi?
- [ ] `arketip` 12'lik kapalı listeden mi seçilmiş, tek tane mi?
- [ ] Benzer oyuncular arketip eşleşmesi mi, 1-2 tane mi?
- [ ] `mtnRating` kullanıcıdan mı geldi? (Claude asla doldurmaz)
- [ ] `slug` benzersiz, Türkçe karaktersiz mi?
- [ ] Kulüp `takimlar` bölümünde tanımlı mı, logosu var mı?
