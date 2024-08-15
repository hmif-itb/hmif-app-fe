import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '~/components/ui/button';
import UserInfo from '~/components/user/user-info';
import TestiContent from './-components/TestiContent';
import { cn } from '~/lib/utils';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { api } from '~/api/client';

const testiSearchSchema = z.object({
  page: z.number().optional(),
});

export const Route = createFileRoute(
  '/_app/home/testimoni/$type/$semester/$courseId/',
)({
  component: TestimoniListPage,
  validateSearch: (search) => testiSearchSchema.parse(search),
});

function generatePageArray(currentPage: number, maxPage: number) {
  if (maxPage <= 5) {
    return [...Array(maxPage).keys()].map((i) => (i + 1).toString());
  } else if (currentPage > 2 && currentPage < maxPage - 1) {
    return ['1', '...', currentPage.toString(), '...', maxPage.toString()];
  } else {
    return ['1', '2', '...', (maxPage - 1).toString(), maxPage.toString()];
  }
}

function TestimoniListPage(): JSX.Element {
  const { type, courseId } = Route.useParams();
  const { page } = Route.useSearch();
  const currentPage = page ?? 1;

  const { data } = useQuery({
    queryKey: ['testimoni', courseId],
    queryFn: () => api.testimoni.getTestimoniByCourseId({ courseId }),
    select: (data) => ({
      content: data[currentPage - 1],
      length: data.length,
    }),
  });
  const { data: courseData } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => api.course.getCourseById({ courseId }),
    select: ({ name, code }) => ({
      name,
      code,
    }),
  });

  const testiLength = data?.length ?? 0;
  const pages = generatePageArray(currentPage, testiLength);

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
          {courseData?.code} {courseData?.name}
        </h1>
      </header>

      <section className="mt-9 w-full rounded-lg bg-white p-6">
        <UserInfo
          name={data?.content?.userName ?? ''}
          email=""
          imageURL=""
          avatarClassName="size-11"
        />

        <div className="mt-6 flex w-full flex-col gap-4">
          <TestiContent
            title={type === 'teknik-informatika' ? 'Overview' : 'Kesan'}
            content={
              (type === 'teknik-informatika'
                ? data?.content?.overview
                : data?.content?.impressions) ?? ''
            }
          />

          <TestiContent
            title={type === 'teknik-informatika' ? 'Tugas' : 'Tantangan'}
            content={
              (type === 'teknik-informatika'
                ? data?.content?.assignments
                : data?.content?.challenges) ?? ''
            }
          />

          <TestiContent
            title={type === 'teknik-informatika' ? 'Dosen' : 'Saran'}
            content={
              (type === 'teknik-informatika'
                ? data?.content?.lecturer_review
                : data?.content?.advice) ?? ''
            }
          />

          <p className="text-sm text-[#2F754A]">
            <span className="font-semibold">Dosen:</span>{' '}
            {data?.content?.lecturer}
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
          <Button
            disabled={currentPage === 1}
            className="rounded-md bg-[#AAB8AD]"
            size="icon-md"
          >
            <ChevronLeft className="size-4" />
          </Button>
        </Link>

        <div className="flex items-center justify-center gap-1">
          {pages.map((page, idx) =>
            page === '...' ? (
              <div
                key={idx}
                className={cn(
                  'flex size-10 items-center justify-center rounded-md text-white',
                )}
              >
                {page}
              </div>
            ) : (
              <Link
                key={idx}
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
          <Button
            disabled={currentPage === testiLength}
            className="rounded-md bg-[#AAB8AD]"
            size="icon-md"
          >
            <ChevronRight className="size-4" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
