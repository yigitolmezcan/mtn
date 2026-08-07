import { getPlayer } from '@/lib/players';
import { onesToWatch } from '@/data/onesToWatch';
import OnesToWatchView from '@/components/OnesToWatchView';

function resolve(list) {
  return list.map((item) => ({ ...item, player: getPlayer(item.slug) })).filter((x) => x.player);
}

export default function Page() {
  return (
    <OnesToWatchView
      guards={resolve(onesToWatch.guards)}
      forwards={resolve(onesToWatch.forwards)}
      bigs={resolve(onesToWatch.bigs)}
    />
  );
}
