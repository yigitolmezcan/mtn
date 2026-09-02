import HubView from '@/components/HubView';
import { getAllPlayers } from '@/lib/players';
import { onesToWatch } from '@/data/onesToWatch';

// Bantlardaki dairesel fotoğraflar için gereken en küçük alan kümesi.
function preview(p) {
  return { slug: p.slug, ad: p.ad, foto: p.foto, halkaRenk: p.halkaRenk };
}

export default function Home() {
  const players = getAllPlayers();
  const newcomers = players.filter((p) => p.raporTuru === 'newcomer');
  const radar = players.filter((p) => p.raporTuru === 'radar');

  const owGroups = [onesToWatch.guards, onesToWatch.forwards, onesToWatch.bigs];
  const owTotal = owGroups.reduce((n, g) => n + g.length, 0);
  const owSlugs = owGroups.map((group) => group[0]?.slug).filter(Boolean);
  const owPlayers = owSlugs
    .map((slug) => players.find((p) => p.slug === slug))
    .filter(Boolean);

  const searchData = players.map((p) => ({
    slug: p.slug, ad: p.ad, takim: p.takim, takimEn: p.takimEn,
    pozisyon: p.pozisyon, digerDil: p.digerDil, foto: p.foto, halkaRenk: p.halkaRenk,
  }));

  return (
    <HubView
      searchData={searchData}
      classPreview={newcomers.slice(0, 3).map(preview)}
      owPreview={owPlayers.map(preview)}
      radarPreview={radar.slice(0, 3).map(preview)}
      counts={{ newcomer: newcomers.length, ow: owTotal, radar: radar.length }}
    />
  );
}
