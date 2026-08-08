'use client';
import { useLang } from '@/lib/LanguageContext';
import { archetypeDefs } from '@/lib/archetypeDefs';
import { ARCHETYPE_ICONS } from '@/lib/archetypeIcons';

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
            <div key={name} className="ow__card" style={{ cursor: 'default' }}>
              {Icon && <Icon size={32} color="var(--court)" />}
              <div className="ow__cname">{name}</div>
              <p className="ow__ctext" style={{ textAlign: 'center' }}>{lang === 'en' ? def.en : def.tr}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
