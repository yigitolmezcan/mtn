import { getAllPlayers } from '@/lib/players';
import TeamPageView from '@/components/TeamPageView';

export async function generateStaticParams() {
  const slugs = new Set(getAllPlayers().map(p => p.takimSlug));
  return [...slugs].map(slug => ({ slug }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  const players = getAllPlayers().filter(p => p.takimSlug === slug);
  return <TeamPageView players={players} teamSlug={slug} />;
}
