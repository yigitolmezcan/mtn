'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLang } from '@/lib/LanguageContext';

// Geri hedefi normalde raporTuru'ndan gelir. Ones to Watch'taki oyuncular
// newcomer olduğu için oradan girişte yanlış yere dönüyordu; o sayfa
// linklerine ?from=ones-to-watch ekliyor ve burada okunuyor.
// searchParams istemcide okunuyor, böylece profil sayfası statik kalıyor
// ve canonical URL parametreden etkilenmiyor.
export default function ProfileBackLink({ isRadar }) {
  const { t } = useLang();
  const from = useSearchParams().get('from');

  const hedef =
    from === 'ones-to-watch'
      ? { href: '/ones-to-watch', label: t.onesToWatch }
      : isRadar
        ? { href: '/radar', label: t.radar }
        : { href: '/newcomer-class-26-27', label: t.classTitle };

  return <Link href={hedef.href} className="back">← {hedef.label}</Link>;
}
