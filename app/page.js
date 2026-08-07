import HomeView from '@/components/HomeView';
import { getAllPlayers, sezon } from '@/lib/players';

export default function Home() {
  const players = getAllPlayers();
  const latestEuroleague = players.filter(p => p.lig === 'euroleague')[0] || null;
  const latestBsl = players.filter(p => p.lig === 'bsl')[0] || null;

  return (
    <HomeView
      players={players}
      sezon={sezon}
      latestEuroleague={latestEuroleague}
      latestBsl={latestBsl}
    />
  );
}
