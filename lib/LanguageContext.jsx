'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { strings } from './i18n';

const LangCtx = createContext({ lang: 'tr', toggle: () => {}, t: strings.tr });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('tr');

  useEffect(() => {
    const saved = localStorage.getItem('mtn-lang');
    if (saved === 'en' || saved === 'tr') {
      setLang(saved);
    } else if (typeof navigator !== 'undefined' && !navigator.language?.toLowerCase().startsWith('tr')) {
      setLang('en');
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function toggle() {
    setLang((l) => {
      const next = l === 'tr' ? 'en' : 'tr';
      localStorage.setItem('mtn-lang', next);
      return next;
    });
  }

  return (
    <LangCtx.Provider value={{ lang, toggle, t: strings[lang] }}>
      {children}
    </LangCtx.Provider>
  );
}

export const useLang = () => useContext(LangCtx);
