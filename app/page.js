import PlayerCard from '@/components/PlayerCard';
import { getAllPlayers, sezon } from '@/lib/players';

export default function Home() {
  const players = getAllPlayers();

  return (
    <main className="wrap">
      <section className="hero">
        <h1 className="hero__h1">
          <span className="hero__a">Meet the</span>
          <span className="hero__b">Newcomers</span>
        </h1>
        <p className="hero__p">
          EuroLeague&apos;e bu sezon katılan yeni isimleri, kısa ve net bir scouting bakışıyla
          tanıyın.
        </p>
        <div className="rail">
          <b>{sezon} Sezonu</b>
          <span>·</span>
          <span>{players.length} Oyuncu</span>
        </div>
      </section>

      <section className="grid">
        {players.map((p) => (
          <PlayerCard key={p.slug} player={p} />
        ))}
      </section>

      <section className="explain">
        <div className="eyebrow">Değerlendirme</div>
        <h2 className="explain__h2">MtN Rating nedir?</h2>
        <p className="explain__p">Formüllerden ziyade sezgiye dayanır.</p>
        <p className="explain__p">
          Oyuncunun istatistiğini değil; rolünü, takımının ihtiyacını ve EuroLeague&apos;in
          gerçekliğine ne kadar hazır olduğunu tartan 10 üzerinden editoryal bir skor.
        </p>
      </section>
    </main>
  );
}
