import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { ChevronLeft, ClipboardList, GraduationCap } from 'lucide-react';
import { Button } from '~/components/ui/button';
import useSession from '~/hooks/auth/useSession';
import { isInRoles } from '~/lib/roles';

export const Route = createFileRoute('/_app/_left-navbar/home/admin/')({
  component: AdminHubPage,
});

function AdminHubPage() {
  const router = useRouter();
  const user = useSession();
  const isAdmin = isInRoles(user, ['admin']);
  const isPeopleManage = isInRoles(user, ['peoplemanage']);

  if (!isAdmin && !isPeopleManage) {
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
          <h1 className="break-words text-2xl font-bold lg:text-3xl">Admin</h1>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {isAdmin && (
              <Link
                to="/home/admin/forms"
                className="flex w-full flex-col gap-3 break-words rounded-xl bg-white p-5"
              >
                <ClipboardList className="size-8 shrink-0 text-green-950" />
                <div>
                  <h2 className="font-semibold">Live Counting & Rekap Form</h2>
                  <p className="text-xs text-neutral-darker">
                    Pantau jumlah pengisi form secara realtime, rekap, dan lihat
                    analitik jawaban.
                  </p>
                </div>
              </Link>
            )}

            {(isAdmin || isPeopleManage) && (
              <Link
                to="/home/internship/admin"
                className="flex w-full flex-col gap-3 break-words rounded-xl bg-white p-5"
              >
                <GraduationCap className="size-8 shrink-0 text-green-950" />
                <div>
                  <h2 className="font-semibold">Data SPARTA Magang</h2>
                  <p className="text-xs text-neutral-darker">
                    Lihat dan kelola data pilihan divisi magang SPARTA.
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
