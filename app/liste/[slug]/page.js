import { getAllPlayers } from '@/lib/players';
import { curatedLists } from '@/data/curatedLists';
import CuratedListView from '@/components/CuratedListView';

export async function generateStaticParams() {
  return Object.keys(curatedLists).map((slug) => ({ slug }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  const list = curatedLists[slug];
  if (!list) return null;
  const allPlayers = getAllPlayers();
  const players = list.players.map((s) => allPlayers.find((p) => p.slug === s)).filter(Boolean);
  return <CuratedListView title={list.title} intro={list.intro} introEn={list.introEn} players={players} />;
}
