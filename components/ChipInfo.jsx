'use client';
import { useState, useEffect } from 'react';
import { Info } from 'lucide-react';

export default function ChipInfo({ text }) {
  const [open, setOpen] = useState(false);

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
  return (
    <span className="rinfo">
      <button
        className="rinfo__btn"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        aria-label="Neden benzer?"
      >
        <Info size={11} strokeWidth={2} />
      </button>
      {open && <span className="rinfo__pop">{text}</span>}
    </span>
  );
}
