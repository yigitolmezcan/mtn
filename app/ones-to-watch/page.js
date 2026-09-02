import OtwView from '@/components/OtwView';
import { getAllPlayers } from '@/lib/players';
import { onesToWatch } from '@/data/onesToWatch';

export const metadata = {
  title: 'Ones to Watch',
  description: "Avrupa'nın yeni isimleri arasından editör gözüyle dikkat çekenler.",
  alternates: { canonical: '/ones-to-watch' },
};

const GROUPS = [
  { key: 'guards', labelKey: 'owGuards' },
  { key: 'forwards', labelKey: 'owForwards' },
  { key: 'bigs', labelKey: 'owBigs' },
];

export default function OnesToWatch() {
  const players = getAllPlayers();

  const groups = GROUPS.map((g) => ({
    ...g,
    entries: (onesToWatch[g.key] || [])
      .map((entry) => {
        const player = players.find((p) => p.slug === entry.slug);
        return player ? { player, metin: entry.metin, metinEn: entry.metinEn } : null;
      })
      .filter(Boolean),
  })).filter((g) => g.entries.length > 0);

  return <OtwView groups={groups} />;
}
