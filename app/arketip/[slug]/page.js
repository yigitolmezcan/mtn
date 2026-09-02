import { notFound } from 'next/navigation';
import ArchetypePageView from '@/components/ArchetypePageView';
import { getAllPlayers } from '@/lib/players';
import { archetypeDefs } from '@/lib/archetypeDefs';
import { archetypeSlug, archetypeFromSlug } from '@/lib/archetypeSlug';

export function generateStaticParams() {
  return Object.keys(archetypeDefs).map((ad) => ({ slug: archetypeSlug(ad) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const arketip = archetypeFromSlug(slug, archetypeDefs);
  if (!arketip) return {};
  return {
    title: arketip,
    description: archetypeDefs[arketip].tr,
    alternates: { canonical: `/arketip/${slug}` },
  };
}

export default async function ArchetypePage({ params }) {
  const { slug } = await params;
  const arketip = archetypeFromSlug(slug, archetypeDefs);
  if (!arketip) notFound();

  // Lig ayrımı yok; newcomer ve radar birlikte listeleniyor.
  const players = getAllPlayers().filter((p) => p.arketip === arketip);

  return (
    <ArchetypePageView
      arketip={arketip}
      def={archetypeDefs[arketip]}
      players={players}
    />
  );
}
