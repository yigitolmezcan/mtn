'use client';
import Link from 'next/link';
import PCard from './PCard';
import { useLang } from '@/lib/LanguageContext';

export default function ArchetypePageView({ arketip, def, players }) {
  const { lang, t } = useLang();

  return (
    <main className="wrap">
      <Link href="/arketipler" className="back">← {t.menuArchetypes}</Link>
      <div className="bhead" style={{ marginTop: 20 }}>
        <h2 lang="en">{arketip}</h2>
      </div>
      <p className="cintro">{def?.[lang] ?? ''}</p>
      <div className="ctools">
        <span className="ccount">{t.playerCountLabel(players.length)}</span>
      </div>

      <section style={{ padding: '26px 0 40px' }}>
        <div className="cgrid">
          {players.map((p) => <PCard key={p.slug} player={p} />)}
        </div>
      </section>
    </main>
  );
}
