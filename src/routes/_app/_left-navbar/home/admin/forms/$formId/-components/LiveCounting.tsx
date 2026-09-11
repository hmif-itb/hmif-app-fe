import { useState } from 'react';
import dayjs from 'dayjs';
import { Users } from 'lucide-react';
import AdminResponsiveTable from '~/components/admin/AdminResponsiveTable';
import { Pagination } from '~/components/ui/pagination';
import {
  useFormLiveCounting,
  useFormResponsesCount,
  useFormResponsesList,
} from '../-useFormAdminData';

type ComponentProps = {
  formId: string;
};

export default function LiveCounting(props: Readonly<ComponentProps>) {
  const { formId } = props;
  const [page, setPage] = useState(1);

  const { data: countData } = useFormResponsesCount(formId);
  const { liveTotal, latestEvents } = useFormLiveCounting(formId);
  const { data: listData, isLoading } = useFormResponsesList(formId, page, '');

  const total = liveTotal ?? countData?.total ?? 0;
  const totalPages = listData ? Math.ceil(listData.total / listData.limit) : 1;

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col items-center gap-2 rounded-xl bg-green-950 p-8 text-center text-white">
        <Users className="size-8" />
        <span className="text-5xl font-bold tabular-nums lg:text-6xl">
          {total}
        </span>
        <span className="text-sm opacity-80">orang sudah mengisi form</span>
      </div>

      {latestEvents.length > 0 && (
        <div className="flex flex-col gap-2 rounded-xl border border-green-200 bg-green-50 p-4">
          <p className="text-sm font-semibold text-green-900">
            Baru saja mengisi
          </p>
          <ul className="flex flex-col gap-1">
            {latestEvents.map((e, idx) => (
              <li
                key={`${e.nim}-${e.submittedAt}-${idx}`}
                className="flex items-center justify-between gap-2 break-words text-xs text-green-900"
              >
                <span>
                  {e.fullName} ({e.nim})
                </span>
                <span className="shrink-0 opacity-70">
                  {dayjs(e.submittedAt).format('HH:mm:ss')}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <AdminResponsiveTable
          columns={[
            { key: 'nim', header: 'NIM', render: (r) => r.nim },
            { key: 'fullName', header: 'Nama', render: (r) => r.fullName },
            {
              key: 'submittedAt',
              header: 'Waktu',
              render: (r) => dayjs(r.submittedAt).format('DD/MM HH:mm'),
            },
          ]}
          rows={listData?.responses ?? []}
          rowKey={(r) => r.id}
          isLoading={isLoading}
          emptyMessage="Belum ada yang mengisi form ini."
        />
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
