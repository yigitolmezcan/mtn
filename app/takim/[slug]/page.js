import { getAllPlayers } from '@/lib/players';
import { genitiveSuffix } from '@/lib/turkishGenitive';
import TeamPageView from '@/components/TeamPageView';

export async function generateStaticParams() {
  const slugs = new Set(getAllPlayers().map(p => p.takimSlug));
  return [...slugs].map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const players = getAllPlayers().filter((p) => p.takimSlug === slug);
  if (!players.length) return {};
  const teamName = players[0].takim;
  return {
    title: teamName,
    description: `${teamName}${genitiveSuffix(teamName)} yenileri.`,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const players = getAllPlayers().filter(p => p.takimSlug === slug);
  return <TeamPageView players={players} teamSlug={slug} />;
}
