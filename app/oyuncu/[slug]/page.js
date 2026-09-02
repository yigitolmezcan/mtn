import { notFound } from 'next/navigation';
import { getPlayer, getAllSlugs } from '@/lib/players';
import { buildPlayerMetadata } from '@/lib/playerMetadata';
import PlayerProfile from '@/components/PlayerProfile';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return buildPlayerMetadata(slug, 'tr');
}

export default async function PlayerPage({ params }) {
  const { slug } = await params;
  const p = getPlayer(slug);
  if (!p) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: p.ad,
        jobTitle: 'Basketball Player',
        memberOf: { '@type': 'SportsTeam', name: p.takim },
        nationality: p.milliyet,
      }) }} />
      <PlayerProfile p={p} />
    </>
  );
}
