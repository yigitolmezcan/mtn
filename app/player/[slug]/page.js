import { buildPlayerMetadata } from '@/lib/playerMetadata';

export { generateStaticParams, default } from '../../oyuncu/[slug]/page';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return buildPlayerMetadata(slug, 'en');
}
