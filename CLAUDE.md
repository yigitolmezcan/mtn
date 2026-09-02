# Meet the Newcomers — Proje Kuralları

Bu dosya, projede çalışan her Claude oturumu için bağlayıcıdır.
Kod yazmadan veya içerik üretmeden önce buradaki kuralları oku.

---

## Proje nedir

Türkçe bir EuroLeague scouting sitesi. Yeni transfer olan oyuncuları tanıtır.

**Ürün vaadi:** "Yeni bir EuroLeague oyuncusunu 10 saniyede anla, istersen 3 dakika derinleş."

**Hedef kitle:** Türk EuroLeague taraftarı, basketbol meraklısı, transfer takipçisi.

**BSL ayrı bir lig modu DEĞİLDİR.** Oyuncu kayıtlarındaki `lig` alanı
(`euroleague` / `bsl`) yalnızca bir etikettir; site tek bir havuz olarak
çalışır. Lig seçici arayüzden kaldırıldı, oyuncular lige göre ayrı
listelere bölünmez.

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

Rating değerleri yalnızca 0.5'in katları olabilir (6.5, 7.0, 7.5, 8.0, 8.5, 9.0
gibi). Onluk basamak (8.1, 8.2, 7.7 gibi) kullanılmaz — bu, sahte bir hassasiyet
hissi yaratıyordu. Yarım puan, editoryal bir karar gibi durur, hesaplanmış bir
sayı gibi değil.

---

## 2. Rapor Türleri

Sitede iki tür rapor var, her oyuncu kaydında `raporTuru` alanıyla ayrılır:

- `newcomer` — bir lige yeni gelen oyuncu. Bugüne kadarki standart yapı.
  MtN Rating, istatistikler ve transfer bloğu bu türe özeldir.

- `radar` — henüz üst seviyede olmayan, ya hiç oynamamış ya da oynayıp
  tutunamamış oyuncu. Daha kompakt bir yapı kullanır:
  * MtN Rating YOK → yerine `euroleaguePotansiyeli` ("Yüksek"/"Orta"/"Uzak")
  * İstatistik bloğu VAR — ama haftalık güncellenmez; tek sezonluk sabit
    kayıt olarak durur. `featuredStats` ve `digerIstatistikler` korunur.
  * Transfer bloğu YOK — `transferNotu`/`transferNotuEn` veride kalabilir
    ama Radar profilinde render EDİLMEZ
  * Anahtar Soru kutusu YOK — `anahtarSoru`/`anahtarSoruEn` alanları
    Radar kaydında hiç bulunmaz
  * `nedenRadarda`/`nedenRadardaEn` — bu türün can damarı, neden takip
    ettiğimizi anlatan paragraf
  * `neOlmasiLazim`/`neOlmasiLazimEn` — sıçraması için neyin değişmesi
    gerektiği, tek cümle (Anahtar Soru kutusunun yerini alır)
  Özet, güçlü/zayıf yönler, benzer oyuncular ve video aynen kalır.

---

## 3. Uydurma yok

- Doğrulanmamış hiçbir istatistik, boy, yaş veya transfer bilgisi yazma.
- Kaynak bulamadıysan alanı boş bırak ve kullanıcıya bunu **açıkça söyle**.
- Bir sayıdan emin değilsen, sayıyı yazma. "Yaklaşık" değer üretme.
- Kaynaklar çelişiyorsa ikisini de kullanıcıya bildir, sen seçme.

---

## 4. Pozisyonlar

Yalnızca şu kısaltmalar: **PG, SG, SF, PF, C**

- Türkçeleştirme yok. "Kısa Forvet", "KF", "Şutör Guard" yazılmaz.
- İki pozisyon varsa ayraç: `SG / PG` (boşluklu eğik çizgi)
- Pozisyon **rolü** tarif eder, boyu değil. 2.03 m bir oyuncu, oyun tarzı
  kanat forvetiyse `SF / PF` olur — uzunluğuna bakılarak `PF / C` yazılmaz.
- Ana sayfa kartında kısaltma kalır. Tam isim yalnızca profil sayfasında görünür.

---

## 5. Arketipler

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


## 6. İsimler

- Görünen isim = taraftarın aradığı ve tanıdığı isim → `DJ Stewart`
- Resmî tam isim `resmiAd` alanında saklanır, sayfada görünmez → `D.J. Stewart Jr.`
- Yabancı isimler Türkçeleştirilmez. Aksanlar korunur: `Xabi López-Arostegui`
- Kulüp adları sponsorsuz yazılır: `Anadolu Efes`, `Beşiktaş`, `Baskonia`,
  `Fenerbahçe`, `Paris Basketball`

---

## 7. Format tutarlılığı

| Alan | Format | Örnek |
|---|---|---|
| `boy` | iki ondalık + boşluk + m | `1.97 m` |
| `yas` | yalnızca sayı, metin olarak | `"27"` |
| `milliyet` | Türkçe ülke adı, çift uyruk ` / ` ile | `ABD / Kuzey Makedonya` |
| `geldigiLig` | Lig (Bölge) | `Liga Endesa (İspanya)` |
| `mtnRating` | tek ondalık, metin | `"7.5"` |
| `slug` | küçük harf, tire, Türkçe karakter yok | `tyson-etienne` |
| `el` / `elEn` | Sağ/Sol veya Right/Left | `Sağ` |
| `lig` | `euroleague` veya `bsl` — yalnızca etiket, ayrı bir lig modu değil | `euroleague` |
| `kariyerYolu` | `{kulup, yil}` dizisi, kulüp adları KISA form | `[{"kulup":"Wizards","yil":"2019-22"}]` |
| `anahtarSoru` / `anahtarSoruEn` | tek soru cümlesi, EuroLeague'de standart, BSL'de henüz uygulanmıyor | — |

İstatistik kısaltmaları İngilizce: **PPG, RPG, APG, BPG, SPG, FG, 3PT, FT**

### `kariyerYolu`

Oyuncunun kariyer duraklarını sırayla tutan dizi. Her eleman
`{"kulup": "...", "yil": "..."}` biçimindedir. Boşsa `[]` bırakılır.

```json
"kariyerYolu": [
  {"kulup":"Wizards","yil":"2019-22"},
  {"kulup":"Knicks","yil":"2023-24"},
  {"kulup":"Milano","yil":"2026-"}
]
```

Kurallar:

- **Kulüp adları kısa form yazılır.** `Washington Wizards` değil `Wizards`,
  `Olimpia Milano` değil `Milano`, `Anadolu Efes` değil `Efes`.
  Sebep tasarımsal: 12 duraklı bir kariyerde tam adlar sığmıyor.
- **Son eleman her zaman mevcut kulüptür**, `yil` alanı açık uçlu
  yazılır (`2026-`).
- Sıralama eskiden yeniye.

`ozet`/`ozetEn` kart için tek cümle olarak kalır. Profildeki Değerlendirme bölümü ayrı bir alan olan `ozetDetay`/`ozetDetayEn` kullanır (2-3 cümle, ilk cümlesi genelde `ozet` ile aynı başlar). Yeni oyuncu eklerken dört alanı da doldur.

---

## 8. Scouting dili

Türk basketbol scoutunun konuştuğu gibi yaz. Google Translate Türkçesi değil.

**Kullan:** Off-ball, Off-screen, Spot-up, Pull-up, Step-back, Drive, Pick-and-roll,
PnR, Roll finisher, Rim protection, Spacing, Self-creation, Playmaking,
Transition, Switch, Help defense, Combo guard, Size, İkinci top yönlendirici

**Kullanma:** "atak yönlü guard", "potaya kesmelerde sıçrama gücü",
"topsuz oyun hacmi", "çember çevresi etkinliği" gibi zorlama çeviriler.

**Yasak kelimeler:** "elit" (gerçekten hak edilmedikçe), abartılı pazarlama dili.
Ton sakin ve profesyoneldir; heyecanlı değil.

"Teknik direktör" bir futbol terimidir. Basketbolda her zaman "başantrenör" veya "koç" kullanılır, asla "teknik direktör" değil.

Özet ve madde metinlerinde pozisyon isimleri Türkçeye çevrilmez (ör. "power forward" → "güç forvet" yazılmaz). Genel terimler ("forvet", "uzun", "pivot") serbesttir, İngilizce kısaltmanın birebir çevirisi yazılmaz.

Solaklık gibi fiziksel detaylar yalnızca gerçekten ayırt edici olduğunda güçlü yön olarak yazılır, her solak oyuncuda otomatik belirtilmez.

İngilizce özetlerde de açılış kalıbı çeşitlendirilir — her profilin "A/An" ile başlaması tekdüze ve yapay durur. Mevcut oyuncularda bu kalıba düşülmüş durumlar var; ayrı bir revizyon turunda ele alınacak, yeni eklenen oyuncularda uygulanır.

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

## 9. Tek maç hikâyesi yok

Profil bir haber yazısı değil. "Son saniyede üç sayılık attı" gibi
anlatılar girmez. Tekrarlanabilir özellikler yazılır:

şut profili · karar alma · topsuz hareket · savunma kapasitesi · rol projeksiyonu

Sezonluk başarı (şampiyonluk, MVP) transfer notu olarak yazılabilir —
tek maç anısı yazılamaz.

---

## 10. Benzer oyuncular

Pozisyon eşleşmesi **yeterli değil.** Şunlara bakılır:

rol · hücum tarzı · fiziksel profil · kendi şutunu yaratma · savunma rolü

**Her oyuncu için 1 ila 2 benzer oyuncu yazılır. 3 veya daha fazla yazılmaz. Karşılaştırma çok net ve güçlüyse tek isim yeterlidir.** Sayı doldurmak için isim ekleme.

Veri yapısı: `benzerOyuncular` düz isim dizisi değil, her eleman
`{isim, neden, nedenEn}` objesidir. Gerekçesiz isim eklenmez.

Örnek hata: Tyson Etienne için TJ Shorts ve Markquis Nowell yazmak.
İkisi de 1.80 altı, değerleri oyun kurmaktan gelen oyunculardır.
Etienne yüksek volümlü skorer ve kendi şutunu kuran bir guard —
doğru benzetmeler Kevin Punter ve Jordan Loyd.

---

## 11. Ana sayfa kartı vs profil sayfası

**Kart bir vitrindir, scouting raporu değil.** Kartta yalnızca:

takım rengi şeridi · dairesel oyuncu fotoğrafı (varsa) · oyuncu adı · pozisyon (kısaltma) · tek cümlelik özet · MtN Rating

İstatistikler, destekleyici veriler, güçlü/zayıf maddeleri, arketip → **profil sayfasında.**

- Özet **asla** üç nokta ile kesilmez. Cümle tam görünür.
- Kartlar eşit yükseklikte olur, rating alta hizalanır.

---

## 12. Tasarım

**Değiştirme.** Tasarım dili yerleşti; yeni özellik eklerken mevcut sınıfları kullan.

- Arka plan: soğuk siyaha yakın `#0A0A0B`
- Turuncu `#E0742F` kıt tutulur — vurgu veya "seçili/aktif" durumunu göstermek için kullanılır (rating sayısı, `+` işaretleri, öne çıkan etiketi, aktif dil/lig seçici, filtre chip'i, Anahtar Soru kutusu gibi). Yeni bir öğede "bu gerçekten vurgu mu taşıyor" diye sorulur, dekoratif kullanılmaz.
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

Koyu renkli kulüplerde (Beşiktaş, Partizan, Virtus Bologna gibi siyah veya
çok koyu lacivert markalar) `renk1` neredeyse zemine karışıyor. Bu
kulüplerde fotoğraf halkası ve kart şeridi için kulübün **ikinci** rengi
(`renk2`) kullanılır. Kural görsel okunabilirlik içindir, marka tercihi
değildir — kulüp adı metni yine kendi vurgu rengini kullanır.

Yabancı kulüp adları Türkçe büyük harf kuralından muaftır. `text-transform:
uppercase` uygulanan bir kulüp adı Türkçe locale'de `i` harfini `İ` yapıyor
(`Virtus` → `VİRTUS`). Bunu önlemek için ilgili elemana `lang="en"` verilir;
kaynağı `takimlar` içindeki `digerDil` bayrağıdır. Türk kulüpleri bayrak
taşımaz, `lang="tr"` miras alır.

---

## 13. Teknik yapı

```
data/oyuncular.json           ← TÜM oyuncu içeriği burada
data/onesToWatch.js           ← "Ones to Watch" editoryal seçkisi
lib/players.js                ← veriyi okur, kulüp bilgisini ekler
lib/i18n.js                   ← TR/EN arayüz metinleri
lib/archetypeDefs.js          ← 13 arketipin tanımları
components/PlayerCard.jsx     ← ana sayfa kartı
components/PlayerProfile.jsx  ← oyuncu profili
components/HeroSpotlight.jsx  ← ana sayfa üstü carousel
components/MainMenu.jsx       ← sol üst hamburger menü
app/oyuncu/[slug]/opengraph-image.js ← paylaşım görseli (kilitli şablon)
app/globals.css               ← tasarım sistemi

(Bu liste kapsayıcı değil, projenin ana giriş noktalarıdır.)
```

**Oyuncu eklemek = yalnızca `data/oyuncular.json`'a bir blok eklemek.**
Başka hiçbir dosyaya dokunulmaz. Kod değişikliği gerekmez.

Yeni kulüp gelirse: `takimlar` bölümüne slug + ad + `marka` + `vurgu` + `renk1` + `renk2` renkleri eklenir.

Oyuncu fotoğrafları `public/players/<slug>.png` (veya `.jpg`) konumundan okunur, sadece ana sayfa kartlarında kullanılır. Dosya yoksa sessizce gizlenir, kart metin-only haline döner. Bu, kaldırılan kulüp logosu mekanizmasından farklı ve ayrı bir özelliktir — kulüp logosu kuralı hâlâ geçerli, bu yalnızca oyuncu fotoğrafı için.

`marka` = kulübün asıl markası. `vurgu` = koyu zeminde okunan renk.
Arayüz `vurgu` kullanır. Örnek: Paris Basketball → marka `#1A1A1A`, vurgu `#00E5FF`.

---

## 14. Çalışma şekli

- **En küçük değişikliği yap.** İstenmeyen refactor yapma.
- İlgisiz dosyalara dokunma.
- Yapısal bir değişiklik önereceksen **önce sor**, sonra uygula.
- Kullanıcı yazılımcı değil. Teknik kararları sade Türkçe açıkla,
  jargonla boğma ama gerçeği de yumuşatma.
- Emin olmadığın bir veriyi doldurmaktansa boş bırakıp sor.
- İş bölümü: **basketbol ve editoryal karar kullanıcıya aittir, uygulama Claude'a.**

---

## 15. İngilizce İçerik Kuralları

- Her metin alanının (ozet, gucluYonler[].t, gelisimAlanlari[].t,
  transferNotu, milliyetNotu, ratingNotu) İngilizce karşılığı aynı
  isimle + "En" son ekiyle tutulur (ozetEn, ratingNotuEn gibi).
- Çeviri birebir değil, doğal bir Avrupalı scout'un yazacağı
  gibi olur. Basketbol terimleri (pick-and-roll, combo guard,
  floor general vb.) zaten İngilizce, değiştirilmez.
- Pozisyon kısaltmaları (PG/SG/SF/PF/C), arketipler, istatistik
  kısaltmaları (PPG/RPG/APG) zaten İngilizce — ayrı çeviri gerekmez.
- Benzer oyuncu isimleri ve kulüp isimleri çevrilmez.
- Yeni oyuncu eklerken artık İngilizce alanlar da doldurulur —
  bu kalıcı bir kural, tek seferlik değil.

---

## 16. Yeni oyuncu eklerken kontrol listesi

- [ ] Pozisyon PG/SG/SF/PF/C mi, role göre mi seçilmiş?
- [ ] İsim taraftarın aradığı biçimde mi, `resmiAd` dolu mu?
- [ ] Boy / yaş / milliyet / lig formatları tablodaki gibi mi?
- [ ] `featuredStats` seçimi doğru mu? (EuroLeague / EuroCup / BCL öncelikli,
      rolü daha iyi temsil ediyorsa yerel lig)
- [ ] Özet 95-110 karakter, tek cümle, kalıp tekrarı yok?
- [ ] Maddeler isim öbeği mi, 3-6 kelime mi, noktasız mı?
- [ ] Destekleyici veri en fazla 2 madde mi?
- [ ] `arketip` 13'lük kapalı listeden mi seçilmiş, tek tane mi?
- [ ] Benzer oyuncular arketip eşleşmesi mi, 1-2 tane mi?
- [ ] `mtnRating` kullanıcıdan mı geldi? (Claude asla doldurmaz)
- [ ] `slug` benzersiz, Türkçe karaktersiz mi?
- [ ] Kulüp `takimlar` bölümünde tanımlı mı, logosu var mı?
- [ ] `el`/`elEn` dolduruldu mu?
- [ ] `lig` alanı (`euroleague` veya `bsl`) doğru mu?
- [ ] Benzer oyuncuların her birinde `neden`/`nedenEn` gerekçesi var mı (sadece isim değil)?
