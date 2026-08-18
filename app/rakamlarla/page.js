import { getAllPlayers } from '@/lib/players';
import RakamlarlaView from '@/components/RakamlarlaView';

export default function Page() {
  const players = getAllPlayers();
  return <RakamlarlaView players={players} />;
}
