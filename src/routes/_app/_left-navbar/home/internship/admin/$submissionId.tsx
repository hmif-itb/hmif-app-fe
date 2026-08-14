import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import { api } from '~/api/client';
import { Button } from '~/components/ui/button';
import useSession from '~/hooks/auth/useSession';
import { isInRoles } from '~/lib/roles';
import { useInternshipDepartments } from '../-useInternshipData';

export const Route = createFileRoute(
  '/_app/_left-navbar/home/internship/admin/$submissionId',
)({
  component: InternshipAdminDetailPage,
});

function InternshipAdminDetailPage() {
  const router = useRouter();
  const { submissionId } = Route.useParams();
  const user = useSession();
  const isAdmin = isInRoles(user, ['peoplemanage']);

  const { data: departments, isLoading: isLoadingDepartments } =
    useInternshipDepartments();

  const { data: submission, isLoading: isLoadingSubmission } = useQuery({
    queryKey: ['internship', 'admin', 'submission', submissionId],
    queryFn: () =>
      api.internship.getInternshipSubmissionById({ id: submissionId }),
    enabled: isAdmin,
  });

  const isLoading = isLoadingDepartments || isLoadingSubmission;

  const findDivision = (id: string) => {
    for (const dept of departments?.departments ?? []) {
      const div = dept.divisions?.find((d) => d.id === id);
      if (div) return { division: div, department: dept };
    }
    return undefined;
  };

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

        {isLoading || !submission ? (
          <p className="px-4">Memuat data...</p>
        ) : (
          <div className="flex w-full flex-col gap-6 px-4 pb-24 lg:px-0">
            <div>
              <h1 className="text-3xl font-bold">{submission.fullName}</h1>
              <p className="text-neutral-darker">
                {submission.nim} &middot; {submission.jurusan} &middot;{' '}
                {submission.kelas}
              </p>
              <p className="text-neutral-darker">
                ID Line: {submission.idLine}
              </p>
              <p className="mt-2">
                Status:{' '}
                {submission.isLocked ? (
                  <span className="rounded-full bg-green-200 px-2 py-1 text-xs">
                    Terkunci
                  </span>
                ) : (
                  <span className="rounded-full bg-yellow-200 px-2 py-1 text-xs">
                    Draft
                  </span>
                )}
              </p>
            </div>

            {submission.pengalamanOrganisasi && (
              <div>
                <p className="font-semibold">Pengalaman Organisasi</p>
                <p className="whitespace-pre-wrap text-sm text-neutral-darker">
                  {submission.pengalamanOrganisasi}
                </p>
              </div>
            )}

            {submission.kesibukan.length > 0 && (
              <div>
                <p className="font-semibold">Kesibukan Saat Ini</p>
                <ul className="flex flex-col gap-1 text-sm text-neutral-darker">
                  {submission.kesibukan.map((k, idx) => (
                    <li key={idx}>
                      {k.jabatan} - {k.organisasi} ({k.periode})
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <p className="font-semibold">Pilihan Divisi</p>
              {(submission.choices ?? [])
                .slice()
                .sort((a, b) => a.priorityOrder - b.priorityOrder)
                .map((choice) => {
                  const found = findDivision(choice.divisionId);
                  return (
                    <div
                      key={choice.id}
                      className="flex flex-col gap-3 rounded-xl border border-gray-300 p-4"
                    >
                      <div>
                        <p className="font-semibold">
                          Prioritas {choice.priorityOrder}:{' '}
                          {found?.division.name ?? 'Divisi tidak ditemukan'}
                        </p>
                        <p className="text-xs text-neutral-darker">
                          {found?.department.name}
                        </p>
                      </div>

                      {found?.division.questions.map((q) => {
                        const answer = choice.answers.find(
                          (a) => a.questionId === q.id,
                        );
                        return (
                          <div key={q.id}>
                            <p className="text-sm font-medium">{q.label}</p>
                            <p className="whitespace-pre-wrap text-sm text-neutral-darker">
                              {answer?.answer || '-'}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
