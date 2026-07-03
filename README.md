# Yasin Aktas - Portfolio Website

Premium, ultra-minimalist portfolio sitesi. Next.js 14, Tailwind CSS ve Framer Motion ile gelistirildi.

## Tasarim Ozellikleri

- **Dark Mode** - Profesyonel karbon tonlari
- **Swiss Design** - Temiz tipografi, asimetrik layout
- **Glassmorphism** - Buzlu cam efektleri
- **Micro-interactions** - Sofistike hover ve scroll animasyonlari
- **Grain Texture** - Film benzeri doku overlay
- **Responsive** - Tum cihazlarda mukemmel gorunum

## Teknolojiler

- **Next.js 14** - App Router
- **TypeScript** - Tip guvenligi
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animasyonlar
- **Geist Font** - Modern tipografi
- **Bebas Neue** - Display basliklar

## Kurulum

```bash
# Repository'yi klonla
git clone <repo-url>
cd yasin-portfolio

# Bagimliliklari yukle
npm install

# Gelistirme sunucusunu baslat
npm run dev
```

Tarayicida `http://localhost:3000` adresini ac.

## Video Scraper

yasinfilms.com.tr/work sayfasindan video verilerini cekmek icin:

```bash
# Python bagimliliklarini yukle
pip install requests beautifulsoup4

# Scraper'i calistir
npm run scrape
# veya
cd scraper && python video_scraper.py
```

Cikti: `data/projects.json`

## Proje Yapisi

```
yasin-portfolio/
├── src/
│   └── app/
│       ├── layout.tsx      # Root layout, fontlar, meta
│       ├── page.tsx        # Ana sayfa (tum section'lar)
│       └── globals.css     # Global stiller, animasyonlar
├── data/
│   └── projects.json       # Proje verileri
├── scraper/
│   └── video_scraper.py    # Video scraping scripti
├── public/
│   └── projects/           # Video ve thumbnail'lar
├── tailwind.config.js      # Tailwind konfigurasyonu
└── package.json
```

## Section'lar

1. **Hero** - Bas dondurucu giris, parallax efekti
2. **Stats** - Canli sayaclar (1000+ Brands, 5+ Years, vb.)
3. **Work** - Video portfolio grid, hover play, modal
4. **About** - Hikaye, yetenekler, hizli bilgiler
5. **Experience** - Zaman cizelgesi, milestone kutusu
6. **Contact** - Iletisim bilgileri, sosyal medya

## Video Ekleme

1. Video dosyalarini `public/projects/` klasorune ekle
2. Thumbnail'lari ayni klasore ekle
3. `src/app/page.tsx` icindeki `projects` dizisini guncelle

```typescript
const projects = [
  {
    id: 1,
    title: 'Proje Adi',
    category: 'Kategori',
    thumbnail: '/projects/thumb.jpg',
    videoUrl: '/projects/video.mp4',
  },
  // ...
]
```

## Yayinlama

### Vercel (Onerilen)

```bash
npm install -g vercel
vercel
```

### Statik Export

```bash
npm run build
```

`out/` klasorundeki dosyalari herhangi bir hosting'e yukle.

## Ozellestirme

### Renkler

`tailwind.config.js` ve `src/app/globals.css` dosyalarindaki CSS degiskenlerini duzenle:

```css
:root {
  --color-bg: #0a0a0b;
  --color-text-primary: #fafafa;
  /* ... */
}
```

### Icerik

`src/app/page.tsx` dosyasindaki veri dizilerini guncelle:

- `stats` - Istatistikler
- `experience` - Is deneyimi
- `projects` - Portfolyo
- `skills` - Yetenekler

## Performans

- Lighthouse skoru: 95+
- Core Web Vitals optimize
- Lazy loading videolar
- Optimized fontlar

## Lisans

MIT

---

**Yasin Aktas** | Creative Director  
[yasinfilms.com.tr](https://yasinfilms.com.tr) | [LinkedIn](https://linkedin.com/in/yasinakkts)
