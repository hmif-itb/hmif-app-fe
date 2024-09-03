import { useQuery } from '@tanstack/react-query';
import { api } from '~/api/client';
import { Accordion } from '~/components/ui/accordion';
import { Skeleton } from '~/components/ui/skeleton';
import CourseCard from './coursecard';

export default function CardList({ search }: { search: string }) {
  const { data } = useQuery({
    queryKey: ['courses', search],
    queryFn: () =>
      api.course.getlistCourses({
        search: search || undefined,
      }),
  });

  if (!data) {
    return [...Array(5)].map((_, index) => (
      <Skeleton key={index} className="h-24 w-full" />
    ));
  }

  return (
    <Accordion
      type="multiple"
      className="no-scrollbar flex flex-col gap-4 overflow-y-auto rounded-lg"
    >
      {data.courses.map((course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </Accordion>
  );
}
