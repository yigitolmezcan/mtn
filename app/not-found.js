import NotFoundView from '@/components/NotFoundView';

// Next.js not-found sayfasına <meta name="robots" content="noindex"> etiketini
// kendisi ekliyor (production'da da doğrulandı), o yüzden burada tekrarlanmıyor.
// Canonical bilerek yok: layout'taki kök canonical app/page.js'e taşındı ki
// 404 onu miras almasın.
export default function NotFound() {
  return <NotFoundView />;
}
