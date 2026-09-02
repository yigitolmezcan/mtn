import { notFound } from 'next/navigation';
import { getPlayer, getAllSlugs } from '@/lib/players';
import { buildPlayerMetadata } from '@/lib/playerMetadata';
import PlayerProfile from '@/components/PlayerProfile';
import PlayerJsonLd from '@/components/PlayerJsonLd';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return buildPlayerMetadata(slug, 'en');
}

export default async function PlayerPageEn({ params }) {
  const { slug } = await params;
  const p = getPlayer(slug);
  if (!p) notFound();

  return (
    <>
      <PlayerJsonLd p={p} lang="en" />
      <PlayerProfile p={p} />
    </>
  );
}
