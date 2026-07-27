import { notFound } from 'next/navigation';
import { getPlayer, getAllSlugs } from '@/lib/players';
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

  return <PlayerProfile p={p} />;
}
