import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '~/components/ui/button';
import UserInfo from '~/components/user/user-info';
import TestiContent from './-components/TestiContent';
import { cn } from '~/lib/utils';
import { z } from 'zod';

const testiSearchSchema = z.object({
  page: z.number().optional(),
});

export const Route = createFileRoute(
  '/_app/home/testimoni/$type/$semester/$courseId/',
)({
  component: TestimoniListPage,
  validateSearch: (search) => testiSearchSchema.parse(search),
});

function TestimoniListPage(): JSX.Element {
  const { type } = Route.useParams();
  const { page } = Route.useSearch();

  const testiLength = 3;
  const pages =
    testiLength <= 5
      ? [...Array(testiLength).keys()].map((i) => (i + 1).toString())
      : ['1', '2', '...', (testiLength - 1).toString(), testiLength.toString()];
  const currentPage = page ?? 1;

  return (
    <main className="h-screen w-full overflow-auto bg-[url('/images/courses/gradient.png')] p-8 pb-12">
      <header className="text-white">
        <Link from={Route.fullPath} to="..">
          <Button
            variant="link"
            size="icon-md"
            className="gap-1 px-0 text-white"
          >
            <ChevronLeft className="size-4" />
            <span className="text-sm">Back</span>
          </Button>
        </Link>
        <h1 className="text-3xl font-semibold">
          II2220 Manajemen Sumber Daya STI
        </h1>
      </header>

      <section className="mt-9 w-full rounded-lg bg-white p-6">
        <UserInfo
          name="Michael"
          email="2021"
          imageURL=""
          avatarClassName="size-11"
        />

        <div className="mt-6 flex w-full flex-col gap-4">
          <TestiContent
            title={type === 'teknik-informatika' ? 'Overview' : 'Kesan'}
            content="Belajar COBIT COBIT trus kita itu harus mikirin bisnis dlu baru ke it nya. Intinya gimana it mendukung bisnis lah ya. Tapi pembawaan bapaknya oke banget sih trus banyak cerita pengamannya juga jadi ga ngantuk. Bapaknya sering banget cerita di 1 slide itu 30 menit lebih trus slide lainnya di skip (tapi bakal masuk ujian)"
          />

          <TestiContent
            title={type === 'teknik-informatika' ? 'Tugas' : 'Tantangan'}
            content="Bapaknya sering banget ngasih tugas tapi deadline nya mepet banget atau ngasih tugas tapi instruksi nya ga jelas gitu, trus bakal upload instruksinya tuh biasanya di hari pengumpulan waktu bapaknya assign tugas di edunex. Trus ujiannya juga agak gws sih karna harus bener2 ngapal gitu untuk pilgan nya (karna rasanya di beberapa pilihan itu bener tapi harus sesuai ppt atau cobit)."
          />

          <TestiContent
            title={type === 'teknik-informatika' ? 'Dosen' : 'Saran'}
            content="Baca dan hapal cobit trus tubes nya jangan ngilang karna tubesnya tuh bergantung gitu dari bagian atas sampai bagian bawah"
          />

          <p className="text-sm text-[#2F754A]">
            <span className="font-semibold">Dosen:</span> Windy Gambetta
          </p>
        </div>
      </section>

      <div className="mt-10 flex w-full items-center justify-between">
        <Link
          search={(prev) => ({
            ...prev,
            page: currentPage > 1 ? currentPage - 1 : currentPage,
          })}
        >
          <Button className="rounded-md bg-[#AAB8AD]" size="icon-md">
            <ChevronLeft className="size-4" />
          </Button>
        </Link>

        <div className="flex items-center justify-center gap-1">
          {pages.map((page) =>
            page === '...' ? (
              <div
                key={page}
                className={cn(
                  'flex size-10 items-center justify-center rounded-md text-white',
                )}
              >
                {page}
              </div>
            ) : (
              <Link
                search={{
                  page: page !== '...' ? parseInt(page) : currentPage,
                }}
              >
                <Button
                  size="icon-md"
                  key={page}
                  className={cn(
                    'flex size-10 items-center justify-center rounded-md',
                    currentPage === parseInt(page)
                      ? 'bg-[#E2C66F] text-black'
                      : 'bg-none!',
                  )}
                >
                  {page}
                </Button>
              </Link>
            ),
          )}
        </div>

        <Link
          search={(prev) => ({
            ...prev,
            page: currentPage < testiLength ? currentPage + 1 : currentPage,
          })}
        >
          <Button className="rounded-md bg-[#AAB8AD]" size="icon-md">
            <ChevronRight className="size-4" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
