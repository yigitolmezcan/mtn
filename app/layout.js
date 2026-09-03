import './globals.css';
import { Space_Grotesk, Inter } from 'next/font/google';
import { SITE_URL } from '@/lib/site';

// next/font fontları build sırasında self-host ediyor: Google Fonts'a
// harici istek yok, render-blocking stylesheet yok.
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});
import { Analytics } from '@vercel/analytics/react';
import { LanguageProvider } from '@/lib/LanguageContext';
import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';

export const metadata = {
  metadataBase: new URL(SITE_URL),
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
    <html lang="tr" className={`${spaceGrotesk.variable} ${inter.variable}`}>
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
