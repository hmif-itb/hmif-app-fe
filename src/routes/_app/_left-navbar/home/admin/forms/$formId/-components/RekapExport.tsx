import { useEffect, useState } from 'react';
import { Download, Search } from 'lucide-react';
import dayjs from 'dayjs';
import AdminResponsiveTable from '~/components/admin/AdminResponsiveTable';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Pagination } from '~/components/ui/pagination';
import { AdminFormResponseItem, FormSection } from '~/api/generated';
import { AdminTableColumn } from '~/components/admin/AdminResponsiveTable';
import {
  useFormResponsesList,
  fetchAllFormResponses,
} from '../-useFormAdminData';
import { exportFormResponsesToCsv } from '../-exportResponses';

type ComponentProps = {
  formId: string;
  formTitle: string;
  sections: FormSection[];
};

export default function RekapExport(props: Readonly<ComponentProps>) {
  const { formId, formTitle, sections } = props;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timeout);
  }, [search]);

  const { data: listData, isLoading } = useFormResponsesList(
    formId,
    page,
    debouncedSearch,
  );
  const totalPages = listData ? Math.ceil(listData.total / listData.limit) : 1;
  const questions = sections.flatMap((s) => s.questions);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const all = await fetchAllFormResponses(formId, debouncedSearch);
      exportFormResponsesToCsv(formTitle, sections, all);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-darker" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari NIM atau nama..."
            className="pl-9"
          />
        </div>
        <Button
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-2"
        >
          <Download className="size-4" />
          {isExporting ? 'Mengekspor...' : 'Export CSV'}
        </Button>
      </div>

      <AdminResponsiveTable
        columns={
          [
            { key: 'nim', header: 'NIM', render: (r) => r.nim },
            { key: 'fullName', header: 'Nama', render: (r) => r.fullName },
            { key: 'major', header: 'Jurusan', render: (r) => r.major },
            {
              key: 'angkatan',
              header: 'Angkatan',
              render: (r) => String(r.angkatan),
            },
            ...questions.map((q) => ({
              key: q.id,
              header: q.label,
              render: (r: AdminFormResponseItem) => {
                const answer = r.answers.find(
                  (a) => a.questionId === q.id,
                )?.answer;
                if (answer === undefined) return '';
                return Array.isArray(answer) ? answer.join('; ') : answer;
              },
            })),
            {
              key: 'submittedAt',
              header: 'Waktu Submit',
              render: (r) => dayjs(r.submittedAt).format('DD/MM/YYYY HH:mm'),
            },
          ] satisfies AdminTableColumn<AdminFormResponseItem>[]
        }
        rows={listData?.responses ?? []}
        rowKey={(r) => r.id}
        isLoading={isLoading}
        emptyMessage="Tidak ada respon yang cocok."
      />
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
