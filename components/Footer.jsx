'use client';
import { X } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="wrap sitefoot">
      <p className="sitefoot__disclaimer">{t.disclaimer}</p>
      <div className="sitefoot__row">
        <a href="https://x.com/meetnewcomers" target="_blank" rel="noopener noreferrer">Meet the Newcomers</a>
        <a href="https://x.com/yolmezcan" target="_blank" rel="noopener noreferrer" className="follow-btn">
          <X size={12} strokeWidth={2} />
          <span>@yolmezcan</span>
        </a>
      </div>
    </footer>
  );
}
