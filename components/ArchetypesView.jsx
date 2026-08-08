'use client';
import Link from 'next/link';
import { useLang } from '@/lib/LanguageContext';
import { archetypeDefs } from '@/lib/archetypeDefs';
import { ARCHETYPE_ICONS } from '@/lib/archetypeIcons';
import { archetypeSlug } from '@/lib/archetypeSlug';

export default function ArchetypesView() {
  const { lang, t } = useLang();
  return (
    <div className="wrap ow">
      <h1 className="ow__title">{t.menuArchetypes}</h1>
      <p className="ow__intro">{t.archetypesIntro}</p>
      <div className="ow__cards" style={{ marginTop: 28 }}>
        {Object.entries(archetypeDefs).map(([name, def]) => {
          const Icon = ARCHETYPE_ICONS[name];
          return (
            <Link key={name} href={`/arketip/${archetypeSlug(name)}`} className="ow__card">
              {Icon && <Icon size={32} color="var(--court)" />}
              <div className="ow__cname">{name}</div>
              <p className="ow__ctext" style={{ textAlign: 'center' }}>{lang === 'en' ? def.en : def.tr}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
