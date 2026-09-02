import ClassView from '@/components/ClassView';
import { getAllPlayers } from '@/lib/players';

export const metadata = {
  title: '26-27 Newcomer Class',
  description:
    'EuroLeague seviyesinde ilk kez test edilecek oyuncuların detaylı scouting raporları.',
};

export default function NewcomerClass() {
  const players = getAllPlayers().filter((p) => p.raporTuru === 'newcomer');
  return <ClassView players={players} />;
}
