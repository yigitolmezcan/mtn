import './globals.css';
import { SITE_URL } from '@/lib/site';
import { Analytics } from '@vercel/analytics/react';
import { LanguageProvider } from '@/lib/LanguageContext';
import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
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
  twitter: {
    card: 'summary_large_image',
    title: 'Meet the Newcomers',
    description: "EuroLeague'in yeni transferlerini kısa ve net bir gözle anlatıyoruz.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>
          <Topbar />
          {children}
          <Footer />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
