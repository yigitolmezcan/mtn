import './globals.css';
import { getAllPlayers } from '@/lib/players';
import { LanguageProvider } from '@/lib/LanguageContext';
import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';

export const metadata = {
  metadataBase: new URL('https://meetnewcomers.com'),
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
        <LanguageProvider>
          <Topbar players={searchData} />

          {children}

          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
