'use client';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { archetypeSlug } from '@/lib/archetypeSlug';

// Gruplar CLAUDE.md'deki kapalı listeyle birebir. Arketip adları gibi
// grup adları da İngilizce kalır, çevrilmez.
const GROUPS = [
  { ad: 'Guards', arketipler: ['Floor General', 'Combo Guard', 'Scoring Point Guard', 'Slasher', 'Sharpshooter'] },
  { ad: 'Wings', arketipler: ['3&D Wing', 'Scoring Wing', 'Point Forward', 'Athletic Forward'] },
  { ad: 'Bigs', arketipler: ['Stretch Big', 'Athletic Center', 'Rim Protector', 'Post Scorer'] },
];

export default function ArchetypesView({ defs }) {
  const { lang, t } = useLang();

  return (
    <main className="wrap">
      <Link href="/" className="back">{t.backHome}</Link>
      <div className="bhead" style={{ marginTop: 20 }}>
        <h2>{t.menuArchetypes}</h2>
      </div>
      <p className="cintro">{t.archetypesIntro}</p>

      {GROUPS.map((g) => (
        <div key={g.ad}>
          <div className="ogrp" lang="en">{g.ad}</div>
          <div className="arkgrid">
            {g.arketipler.map((ark) => (
              <Link key={ark} href={`/arketip/${archetypeSlug(ark)}`} className="acard">
                <div className="anm" lang="en">{ark}</div>
                <div className="adsc">{defs[ark]?.[lang] ?? ''}</div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
