import './globals.css';

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
            <a className="topbar__mark" href="/">Meet the Newcomers</a>
            <span className="topbar__season">2026-27</span>
          </div>
        </header>

        {children}

        <footer className="wrap sitefoot">
          <span>Meet the Newcomers</span>
          <span>2026-27 EuroLeague</span>
          <a href="https://x.com/yolmezcan" target="_blank" rel="noopener noreferrer">@yolmezcan</a>
        </footer>
      </body>
    </html>
  );
}
