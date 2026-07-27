import './globals.css';
import { X } from 'lucide-react';
import { getAllPlayers } from '@/lib/players';
import TopbarSearch from '@/components/TopbarSearch';

export const metadata = {
  metadataBase: new URL('https://meetthenewcomers.com'),
  title: {
    default: "Meet the Newcomers — EuroLeague'in Yeni İsimleri",
    template: '%s — Meet the Newcomers',
  },
  description:
    "EuroLeague'e bu sezon katılan yeni oyuncuları kısa ve net bir scouting bakışıyla tanıyın.",
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Meet the Newcomers',
  },
};

export default function RootLayout({ children }) {
  const searchData = getAllPlayers().map((p) => ({
    slug: p.slug, ad: p.ad, takim: p.takim, pozisyon: p.pozisyon, mtnRating: p.mtnRating,
  }));

  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@85..115,300..800&family=Inter:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,600;8..60,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <header className="topbar">
          <div className="wrap topbar__inner">
            <TopbarSearch players={searchData} />
            <span className="topbar__season">2026-27</span>
          </div>
        </header>

        {children}

        <footer className="wrap sitefoot">
          <p className="sitefoot__disclaimer">Bu bağımsız bir editoryal projedir; EuroLeague veya kulüplerle resmi bir bağlantısı yoktur.</p>
          <div className="sitefoot__row">
            <span>Meet the Newcomers</span>
            <a href="https://x.com/yolmezcan" target="_blank" rel="noopener noreferrer" className="follow-btn">
              <X size={12} strokeWidth={2} />
              <span>Takip Et</span>
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
