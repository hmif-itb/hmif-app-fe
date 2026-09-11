import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { ChevronLeft } from 'lucide-react';
import { api } from '~/api/client';
import { Button } from '~/components/ui/button';
import useSession from '~/hooks/auth/useSession';
import { isInRoles } from '~/lib/roles';

export const Route = createFileRoute('/_app/_left-navbar/home/admin/forms/')({
  component: FormAdminListPage,
});

function useAllForms() {
  return useQuery({
    queryKey: ['form', 'admin', 'list'],
    queryFn: () => api.form.listAllForms(),
  });
}

function FormAdminListPage() {
  const router = useRouter();
  const user = useSession();
  const isAdmin = isInRoles(user, ['admin']);
  const { data, isLoading } = useAllForms();
  const forms = data?.forms ?? [];

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
          <h1 className="break-words text-2xl font-bold lg:text-3xl">Form</h1>

          {isLoading && (
            <p className="text-sm text-neutral-darker">Memuat data...</p>
          )}

          {!isLoading && forms.length === 0 && (
            <div className="flex w-full flex-col items-center gap-2 rounded-xl bg-white p-8 text-center">
              <p className="font-semibold">Belum ada form</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {forms.map((form) => (
              <Link
                key={form.id}
                to="/home/admin/forms/$formId"
                params={{ formId: form.id }}
                className="flex w-full flex-col gap-2 break-words rounded-xl bg-white p-4"
              >
                <h2 className="break-words font-semibold">{form.title}</h2>
                {form.description && (
                  <p className="line-clamp-2 break-words text-xs text-neutral-darker">
                    {form.description}
                  </p>
                )}
                <p className="text-xs text-neutral-darker">
                  Dibuka {dayjs(form.opensAt).format('DD MMM YYYY, HH.mm')} WIB
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
