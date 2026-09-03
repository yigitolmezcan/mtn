import HowItWorksView from '@/components/HowItWorksView';
import { SITE_URL } from '@/lib/site';

const TR = `${SITE_URL}/nasil-calisiyoruz`;
const EN = `${SITE_URL}/how-it-works`;

export const metadata = {
  title: 'Nasıl Çalışıyoruz',
  description:
    'MtN Rating, EuroLeague Potansiyeli ve arketip ölçekleri; raporları yazarken uyduğumuz kurallar.',
  alternates: {
    canonical: '/nasil-calisiyoruz',
    languages: { tr: TR, en: EN, 'x-default': TR },
  },
};

export default function NasilCalisiyoruz() {
  return <HowItWorksView />;
}
