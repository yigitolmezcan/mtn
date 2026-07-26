'use client';
import { useState } from 'react';
import { Share2, Check } from 'lucide-react';

export default function ShareButton({ url }) {
  const [copied, setCopied] = useState(false);
  async function handleClick() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }
  return (
    <button className="share-btn" onClick={handleClick} aria-label="Profil linkini kopyala">
      {copied ? <Check size={14} strokeWidth={2} /> : <Share2 size={14} strokeWidth={2} />}
      <span>{copied ? 'Kopyalandı' : 'Paylaş'}</span>
    </button>
  );
}
