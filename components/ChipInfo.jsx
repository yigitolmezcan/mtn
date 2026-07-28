'use client';
import { useState } from 'react';
import { Info } from 'lucide-react';

export default function ChipInfo({ text }) {
  const [open, setOpen] = useState(false);
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
