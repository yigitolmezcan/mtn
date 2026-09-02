import RadarListView from '@/components/RadarListView';
import { getAllPlayers } from '@/lib/players';

export const metadata = {
  title: 'Radar',
  description:
    "Avrupa'nın çeşitli liglerinden, bir üst seviyeye atlamaya aday oyuncuları takip ediyoruz.",
  alternates: { canonical: '/radar' },
};

export default function Radar() {
  const players = getAllPlayers().filter((p) => p.raporTuru === 'radar');
  return <RadarListView players={players} />;
}
