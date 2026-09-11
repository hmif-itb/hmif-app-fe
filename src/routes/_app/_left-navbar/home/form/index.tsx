import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { CheckCircle2, ChevronLeft, Clock } from 'lucide-react';
import { FormListItem } from '~/api/generated';
import { Button } from '~/components/ui/button';
import { useFormsList } from './-useFormData';

export const Route = createFileRoute('/_app/_left-navbar/home/form/')({
  component: FormListPage,
});

function StatusBadge(props: Readonly<{ status: FormListItem['status'] }>) {
  const { status } = props;
  if (status === 'already_responded') {
    return (
      <span className="flex w-fit items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-[11px] font-semibold text-green-800">
        <CheckCircle2 className="size-3" /> Sudah diisi
      </span>
    );
  }
  if (status === 'not_opened') {
    return (
      <span className="flex w-fit items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-[11px] font-semibold text-yellow-800">
        <Clock className="size-3" /> Belum dibuka
      </span>
    );
  }
  return (
    <span className="flex w-fit items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-[11px] font-semibold text-blue-800">
      Isi Sekarang
    </span>
  );
}

function FormListPage() {
  const router = useRouter();
  const { data, isLoading } = useFormsList();
  const forms = data?.forms ?? [];

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
              <p className="font-semibold">Belum ada form untuk kamu</p>
              <p className="text-sm text-neutral-darker">
                Saat ini tidak ada form yang perlu kamu isi. Cek lagi nanti, ya!
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {forms.map((form) => (
              <Link
                key={form.id}
                to="/home/form/$formId"
                params={{ formId: form.id }}
                className="flex w-full flex-col gap-2 break-words rounded-xl bg-white p-4"
              >
                <StatusBadge status={form.status} />
                <h2 className="break-words font-semibold">{form.title}</h2>
                {form.description && (
                  <p className="line-clamp-2 break-words text-xs text-neutral-darker">
                    {form.description}
                  </p>
                )}
                <p className="text-xs text-neutral-darker">
                  {form.status === 'not_opened'
                    ? `Dibuka ${dayjs(form.opensAt).format('DD MMM YYYY, HH.mm')} WIB`
                    : `Sejak ${dayjs(form.opensAt).format('DD MMM YYYY')}`}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
