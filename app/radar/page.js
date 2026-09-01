import { getAllPlayers } from '@/lib/players';
import RadarView from '@/components/RadarView';

export const metadata = {
  title: 'Radar',
  description: "Henüz üst seviyede değiller. Ama olabilirler. Avrupa liglerinde takip ettiğimiz isimler.",
};

export default function Page() {
  const players = getAllPlayers().filter((p) => p.raporTuru === 'radar');
  return <RadarView players={players} />;
}
