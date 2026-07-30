'use client';
import { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

export default function RatingInfo() {
  const [open, setOpen] = useState(false);
  const { lang } = useLang();

  useEffect(() => {
    if (!open) return;
    function handleOutside(e) {
      if (!e.target.closest('.rinfo')) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);
  const text = lang === 'tr'
    ? 'Formüllerden ziyade sezgiye dayanan, 10 üzerinden editoryal bir skor.'
    : 'An editorial score out of 10, built on judgment rather than formulas.';
  return (
    <span className="rinfo">
      <button
        className="rinfo__btn"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        aria-label="Rating nedir?"
      >
        <Info size={12} strokeWidth={2} />
      </button>
      {open && <span className="rinfo__pop">{text}</span>}
    </span>
  );
}
