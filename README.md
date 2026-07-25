# Meet the Newcomers — Next.js

## Çalıştırma

Bilgisayarınızda **Node.js** kurulu olmalı (nodejs.org → LTS sürümü).

Terminalde bu klasöre girip sırayla:

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini açın.

Yayına almak için: proje klasörünü GitHub'a yükleyin, [vercel.com](https://vercel.com)
üzerinden bağlayın. Başka ayar gerekmez.

---

## Oyuncu eklemek / düzenlemek

Tek dosya: **`data/oyuncular.json`**

Mevcut bir oyuncu bloğunu kopyalayıp değerleri değiştirin. Sayfa kendiliğinden oluşur.

| Alan | Kural |
|---|---|
| `slug` | URL adresi. Türkçe karakter ve boşluk yok: `tyson-etienne` |
| `ad` | Oyuncunun tanındığı isim |
| `resmiAd` | Resmî tam isim — sayfada görünmez, yalnızca kayıt |
| `takimSlug` | `takimlar` bölümündeki anahtarlardan biri |
| `pozisyon` | Yalnızca PG / SG / SF / PF / C — boyu değil, rolü tarif eder |
| `boy` | `"0.00 m"` |
| `mtnRating` | Metin olarak `"7.5"`. `null` yazarsanız `—` görünür |
| `gucluYonler` | `{ "t": "scouting görüşü", "v": "destekleyici veri" }` — `v` isteğe bağlı |
| `youtubeUrl` | `null` ise buton pasif görünür |

**Yeni kulüp eklemek:** `takimlar` bölümüne slug, ad, marka rengi ve vurgu rengi girin;
logoyu aynı slug adıyla `public/logos/` klasörüne koyun.

---

## Logolar

`public/logos/` klasörüne şu adlarla ekleyin:

```
anadolu-efes.svg   besiktas.svg   baskonia.svg
paris-basketball.svg   fenerbahce-beko.svg
```

Kod bunları otomatik olarak `/logos/<takimSlug>.svg` yolundan okur — kartlarda 22px,
profil sayfalarında 32px. Dosya yoksa veya yüklenemezse logo sessizce gizlenir,
sayfa bozulmaz.

---

## Renkler

Her kulübün iki rengi var:

- `marka` — kulübün asıl markası (ör. Paris Basketball `#1A1A1A`)
- `vurgu` — koyu zeminde kullanılan renk: şerit, kulüp adı, transfer bloğu
  (ör. Paris Basketball `#00E5FF`)

Koyu arka planda `marka` rengi okunmayacağı için arayüz `vurgu` rengini kullanır.

---

## Dosya haritası

```
data/oyuncular.json          ← tüm içerik burada
lib/players.js               ← veriyi okur, kulüp bilgisini ekler
components/PlayerCard.jsx    ← ana sayfa kartı + MtN Rating
components/ClubLogo.jsx      ← logo, dosya yoksa gizlenir
app/page.js                  ← ana sayfa
app/oyuncu/[slug]/page.js    ← oyuncu profili (her oyuncu için ayrı adres)
app/globals.css              ← tüm tasarım sistemi
```
