import HomeView from '@/components/HomeView';
import { getAllPlayers, sezon } from '@/lib/players';

export default function Home() {
  const players = getAllPlayers();

  return <HomeView players={players} sezon={sezon} />;
}
