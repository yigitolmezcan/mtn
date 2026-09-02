import ArchetypesView from '@/components/ArchetypesView';
import { archetypeDefs } from '@/lib/archetypeDefs';

export const metadata = {
  title: 'Arketipler',
  description: 'Sitede kullandığımız 13 arketip ve her birinin ne anlama geldiği.',
  alternates: { canonical: '/arketipler' },
};

export default function Archetypes() {
  return <ArchetypesView defs={archetypeDefs} />;
}
