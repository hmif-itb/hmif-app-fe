import { useInfiniteQuery } from '@tanstack/react-query';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { InView } from 'react-intersection-observer';
import { api } from '~/api/client';
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
import { useInternshipDepartments } from '../-useInternshipData';

export const Route = createFileRoute(
  '/_app/_left-navbar/home/internship/admin/',
)({
  component: InternshipAdminPage,
});

const PAGE_SIZE = 20;

function InternshipAdminPage() {
  const router = useRouter();
  const user = useSession();
  const isAdmin = isInRoles(user, ['peoplemanage']);

  const [divisionId, setDivisionId] = useState<string>('all');
  const [locked, setLocked] = useState<'all' | 'true' | 'false'>('all');

  const { data: departments } = useInternshipDepartments();
  const divisions = (departments?.departments ?? []).flatMap((d) =>
    (d.divisions ?? []).map((div) => ({ ...div, departmentName: d.name })),
  );

  const {
    data: submissions,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['internship', 'admin', 'submissions', divisionId, locked],
    queryFn: ({ pageParam }) =>
      api.internship
        .listInternshipSubmissions({
          offset: pageParam,
          divisionId: divisionId === 'all' ? undefined : divisionId,
          locked: locked === 'all' ? undefined : locked,
        })
        .then((res) => res.submissions),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _pages, lastOffset) =>
      lastPage.length < PAGE_SIZE ? undefined : lastOffset + PAGE_SIZE,
    enabled: isAdmin,
  });

  const fetchWhenInView = () => !isFetchingNextPage && fetchNextPage();

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

  const flatSubmissions = submissions?.pages.flatMap((p) => p) ?? [];

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
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {flatSubmissions.map((sub, idx) => {
                  const cells = (
                    <>
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
                      <td className="p-3">
                        <Link
                          to="/home/internship/admin/$submissionId"
                          params={{ submissionId: sub.id }}
                          className="text-blue-600 underline"
                        >
                          Detail
                        </Link>
                      </td>
                    </>
                  );

                  if (idx === flatSubmissions.length - 1) {
                    return (
                      <InView
                        key={sub.id}
                        as="tr"
                        className="border-t border-gray-200"
                        onChange={(inView) => inView && fetchWhenInView()}
                      >
                        {cells}
                      </InView>
                    );
                  }
                  return (
                    <tr key={sub.id} className="border-t border-gray-200">
                      {cells}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {flatSubmissions.length === 0 && (
              <p className="p-4 text-center text-sm text-neutral-darker">
                Belum ada submission.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
