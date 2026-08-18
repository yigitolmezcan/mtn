import { getAllPlayers } from '@/lib/players';
import RakamlarlaView from '@/components/RakamlarlaView';

export const metadata = {
  title: 'Rakamlarla',
  description: 'EuroLeague ve BSL\'e transfer olan oyuncuların rating, yaş, boy ve arketip dağılımına göre sıralandığı istatistik sayfası.',
};

export default function Page() {
  const players = getAllPlayers();
  return <RakamlarlaView players={players} />;
}
