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
            <a className="topbar__mark" href="/" aria-label="Meet the Newcomers">
              <svg width="24" height="24" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <circle cx="95" cy="88" r="58" fill="none" stroke="#E0742F" strokeWidth="9" />
                <circle cx="95" cy="88" r="37" fill="#E0742F" />
                <line x1="95" y1="55" x2="95" y2="121" stroke="#0A0A0B" strokeWidth="4" />
                <line x1="62" y1="88" x2="128" y2="88" stroke="#0A0A0B" strokeWidth="4" />
                <path d="M95 55 Q57 88 95 121" fill="none" stroke="#0A0A0B" strokeWidth="4" />
                <path d="M95 55 Q133 88 95 121" fill="none" stroke="#0A0A0B" strokeWidth="4" />
                <line x1="138" y1="123" x2="172" y2="157" stroke="#E0742F" strokeWidth="15" strokeLinecap="round" />
                <circle cx="172" cy="157" r="9" fill="#E0742F" />
              </svg>
            </a>
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
