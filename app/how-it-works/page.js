import HowItWorksView from '@/components/HowItWorksView';
import { SITE_URL } from '@/lib/site';

const TR = `${SITE_URL}/nasil-calisiyoruz`;
const EN = `${SITE_URL}/how-it-works`;

export const metadata = {
  title: 'How It Works',
  description:
    'The MtN Rating, the EuroLeague Potential and archetype scales, plus the rules we follow when writing reports.',
  alternates: {
    canonical: '/how-it-works',
    languages: { tr: TR, en: EN, 'x-default': TR },
  },
};

export default function HowItWorks() {
  return <HowItWorksView />;
}
