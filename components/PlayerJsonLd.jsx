// schema.org Person — TR ve EN route'ları aynı yapıyı kendi dilindeki
// kulüp adıyla basar.
export default function PlayerJsonLd({ p, lang }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: p.ad,
    jobTitle: 'Basketball Player',
    memberOf: { '@type': 'SportsTeam', name: lang === 'en' ? (p.takimEn || p.takim) : p.takim },
    nationality: p.milliyet,
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
