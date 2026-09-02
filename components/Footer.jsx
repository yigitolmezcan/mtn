'use client';
import { useLang } from '@/lib/LanguageContext';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer>
      <div className="wrap">
        <p className="fdisc">{t.disclaimer}</p>
        <div className="frow">
          <span>Meet the Newcomers</span>
          <a
            className="fx"
            href="https://x.com/yolmezcan"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-6.9L4.5 22H1.4l8.2-9.3L1 2h7.1l4.9 6.3L18.9 2zm-1.2 18h1.9L7.4 4H5.3l12.4 16z" />
            </svg>
            @yolmezcan
          </a>
        </div>
      </div>
    </footer>
  );
}
