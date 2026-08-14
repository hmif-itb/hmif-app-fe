import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { ChevronLeft, Download } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '~/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import useSession from '~/hooks/auth/useSession';
import { isInRoles } from '~/lib/roles';
import {
  useAllInternshipSubmissions,
  useInternshipDepartments,
} from '../-useInternshipData';
import { InternshipStatsCharts } from './-components/InternshipStatsCharts';
import { exportSubmissionsToCsv } from './-exportSubmissions';

export const Route = createFileRoute(
  '/_app/_left-navbar/home/internship/admin/',
)({
  component: InternshipAdminPage,
});

const PRIORITY_OPTIONS = [1, 2, 3, 4] as const;

function InternshipAdminPage() {
  const router = useRouter();
  const user = useSession();
  const isAdmin = isInRoles(user, ['peoplemanage']);

  const [divisionId, setDivisionId] = useState<string>('all');
  const [locked, setLocked] = useState<'all' | 'true' | 'false'>('all');
  const [priority, setPriority] = useState<string>('all');

  const { data: departmentsData } = useInternshipDepartments();
  const departments = departmentsData?.departments ?? [];
  const divisions = departments.flatMap((d) =>
    (d.divisions ?? []).map((div) => ({
      id: div.id,
      name: div.name,
      departmentId: div.departmentId,
      departmentName: d.name,
    })),
  );
  const divisionById = new Map(divisions.map((d) => [d.id, d]));
  const divisionEntityById = new Map(
    departments.flatMap((d) =>
      (d.divisions ?? []).map((div) => [div.id, div] as const),
    ),
  );

  const { data: allSubmissions, isLoading } = useAllInternshipSubmissions(
    locked,
    isAdmin,
  );

  const filteredSubmissions = useMemo(() => {
    const submissions = allSubmissions ?? [];
    const priorityNum = priority === 'all' ? undefined : Number(priority);

    return submissions.filter((sub) => {
      if (priorityNum !== undefined) {
        const choiceAtPriority = sub.choices?.find(
          (c) => c.priorityOrder === priorityNum,
        );
        if (!choiceAtPriority) return false;
        if (
          divisionId !== 'all' &&
          choiceAtPriority.divisionId !== divisionId
        ) {
          return false;
        }
      } else if (divisionId !== 'all') {
        if (!sub.choices?.some((c) => c.divisionId === divisionId))
          return false;
      }
      return true;
    });
  }, [allSubmissions, divisionId, priority]);

  if (!isAdmin) {
    return (
      <div className="flex size-full h-screen flex-col items-center justify-center gap-2 bg-green-50">
        <p className="text-lg font-semibold">Akses ditolak</p>
        <p className="text-sm text-neutral-darker">
          Halaman ini hanya untuk tim People Management.
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
          <h1 className="text-3xl font-bold">Data Pilihan Magang SPARTA</h1>

          <InternshipStatsCharts
            submissions={allSubmissions ?? []}
            divisions={divisions}
            departments={departments.map((d) => ({ id: d.id, name: d.name }))}
          />

          <div className="flex flex-wrap items-center gap-3">
            <Select value={divisionId} onValueChange={setDivisionId}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Filter divisi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Divisi</SelectItem>
                {divisions.map((div) => (
                  <SelectItem key={div.id} value={div.id}>
                    {div.departmentName} - {div.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Filter pilihan ke-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Pilihan</SelectItem>
                {PRIORITY_OPTIONS.map((p) => (
                  <SelectItem key={p} value={String(p)}>
                    Pilihan {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={locked}
              onValueChange={(v) => setLocked(v as typeof locked)}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="true">Sudah Terkunci</SelectItem>
                <SelectItem value="false">Draft</SelectItem>
              </SelectContent>
            </Select>

            <span className="text-sm text-neutral-darker">
              {filteredSubmissions.length} submission
            </span>

            <Button
              type="button"
              variant="outlined"
              size="sm"
              className="ml-auto gap-2"
              disabled={filteredSubmissions.length === 0}
              onClick={() =>
                exportSubmissionsToCsv(
                  filteredSubmissions,
                  divisions,
                  divisionEntityById,
                )
              }
            >
              <Download className="size-4" />
              Export CSV
            </Button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-300">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Nama</th>
                  <th className="p-3">NIM</th>
                  <th className="p-3">Jurusan</th>
                  <th className="p-3">Kelas</th>
                  <th className="p-3">Status</th>
                  {PRIORITY_OPTIONS.map((p) => (
                    <th key={p} className="p-3">
                      Pilihan {p}
                    </th>
                  ))}
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.map((sub) => (
                  <tr key={sub.id} className="border-t border-gray-200">
                    <td className="p-3">{sub.fullName}</td>
                    <td className="p-3">{sub.nim}</td>
                    <td className="p-3">{sub.jurusan}</td>
                    <td className="p-3">{sub.kelas}</td>
                    <td className="p-3">
                      {sub.isLocked ? (
                        <span className="rounded-full bg-green-200 px-2 py-1 text-xs">
                          Terkunci
                        </span>
                      ) : (
                        <span className="rounded-full bg-yellow-200 px-2 py-1 text-xs">
                          Draft
                        </span>
                      )}
                    </td>
                    {PRIORITY_OPTIONS.map((p) => {
                      const choice = sub.choices?.find(
                        (c) => c.priorityOrder === p,
                      );
                      const division = choice
                        ? divisionById.get(choice.divisionId)
                        : undefined;
                      return (
                        <td
                          key={p}
                          className="p-3 text-xs"
                          title={
                            division
                              ? `${division.departmentName} - ${division.name}`
                              : undefined
                          }
                        >
                          {division ? division.name : '-'}
                        </td>
                      );
                    })}
                    <td className="p-3">
                      <Link
                        to="/home/internship/admin/$submissionId"
                        params={{ submissionId: sub.id }}
                        className="text-blue-600 underline"
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!isLoading && filteredSubmissions.length === 0 && (
              <p className="p-4 text-center text-sm text-neutral-darker">
                Belum ada submission.
              </p>
            )}
            {isLoading && (
              <p className="p-4 text-center text-sm text-neutral-darker">
                Memuat data...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
