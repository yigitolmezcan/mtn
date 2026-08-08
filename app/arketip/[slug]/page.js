import { getAllPlayers } from '@/lib/players';
import { archetypeDefs } from '@/lib/archetypeDefs';
import { archetypeSlug, archetypeFromSlug } from '@/lib/archetypeSlug';
import ArchetypePageView from '@/components/ArchetypePageView';

export async function generateStaticParams() {
  return Object.keys(archetypeDefs).map((name) => ({ slug: archetypeSlug(name) }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  const name = archetypeFromSlug(slug, archetypeDefs);
  if (!name) return null;
  const players = getAllPlayers().filter((p) => p.arketip === name);
  return <ArchetypePageView players={players} archetype={name} />;
}
