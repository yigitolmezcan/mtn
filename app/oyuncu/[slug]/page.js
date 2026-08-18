import { notFound } from 'next/navigation';
import { getPlayer, getAllSlugs, getAllPlayers } from '@/lib/players';
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

  const allPlayers = getAllPlayers().map((pl) => ({
    slug: pl.slug, ad: pl.ad, takim: pl.takim, takimSlug: pl.takimSlug,
    takimRenk: pl.takimRenk, pozisyon: pl.pozisyon, mtnRating: pl.mtnRating, lig: pl.lig,
  }));

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
      <PlayerProfile p={p} allPlayers={allPlayers} />
    </>
  );
}
