import { notFound } from 'next/navigation';
import { getPlayer, getAllSlugs, getAllPlayers } from '@/lib/players';
import PlayerProfile from '@/components/PlayerProfile';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getPlayer(slug);
  if (!p) return {};

  return {
    title: `${p.ad} — ${p.takim}`,
    description: p.ozet,
    openGraph: {
      title: `${p.ad} — ${p.takim}`,
      description: p.ozet,
      type: 'profile',
    },
  };
}

export default async function PlayerPage({ params }) {
  const { slug } = await params;
  const p = getPlayer(slug);
  if (!p) notFound();

  const allPlayers = getAllPlayers().map((pl) => ({
    slug: pl.slug, ad: pl.ad, takim: pl.takim, takimSlug: pl.takimSlug,
    takimRenk: pl.takimRenk, pozisyon: pl.pozisyon, mtnRating: pl.mtnRating, lig: pl.lig,
  }));

  return <PlayerProfile p={p} allPlayers={allPlayers} />;
}
