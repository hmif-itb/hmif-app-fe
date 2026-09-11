import { createFileRoute, useParams, useRouter } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import useSession from '~/hooks/auth/useSession';
import { isInRoles } from '~/lib/roles';
import { useFormDetail } from '../../../form/-useFormData';
import Analytics from './-components/Analytics';
import LiveCounting from './-components/LiveCounting';
import RekapExport from './-components/RekapExport';

export const Route = createFileRoute(
  '/_app/_left-navbar/home/admin/forms/$formId/',
)({
  component: FormAdminDetailPage,
});

const TABS = [
  { key: 'live', label: 'Live Counting' },
  { key: 'rekap', label: 'Rekap & Export' },
  { key: 'analytics', label: 'Analytics' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

function FormAdminDetailPage() {
  const router = useRouter();
  const user = useSession();
  const { formId } = useParams({
    from: '/_app/_left-navbar/home/admin/forms/$formId/',
  });
  const [tab, setTab] = useState<TabKey>('live');

  const isAdmin = isInRoles(user, ['admin']);
  const { data: form, isLoading } = useFormDetail(formId);

  if (!isAdmin) {
    return (
      <div className="flex size-full h-screen flex-col items-center justify-center gap-2 bg-green-50">
        <p className="text-lg font-semibold">Akses ditolak</p>
        <p className="text-sm text-neutral-darker">
          Halaman ini hanya untuk admin.
        </p>
      </div>
    );
  }

  return (
    <div className="flex size-full h-screen flex-col overflow-hidden bg-green-50">
      <div className="relative mx-auto flex max-h-screen w-full flex-col items-center overflow-auto lg:max-w-screen-lg lg:px-8">
        <Button
          variant="link"
          className="my-6 w-full justify-start gap-8 p-0 text-2xl font-medium lg:text-3xl"
          onClick={() => router.history.back()}
        >
          <ChevronLeft className="size-8" />
          <span>Back</span>
        </Button>

        <div className="flex w-full flex-col gap-4 px-4 pb-24 lg:px-0">
          <h1 className="break-words text-2xl font-bold lg:text-3xl">
            {isLoading ? 'Memuat...' : form?.title}
          </h1>

          <div className="flex w-full gap-2 overflow-x-auto rounded-xl bg-white p-1">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={cn(
                  'shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                  tab === t.key
                    ? 'bg-green-950 text-white'
                    : 'text-neutral-darker hover:bg-green-50',
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'live' && <LiveCounting formId={formId} />}
          {tab === 'rekap' && form && (
            <RekapExport
              formId={formId}
              formTitle={form.title}
              sections={form.sections ?? []}
            />
          )}
          {tab === 'analytics' && <Analytics formId={formId} />}
        </div>
      </div>
    </div>
  );
}
