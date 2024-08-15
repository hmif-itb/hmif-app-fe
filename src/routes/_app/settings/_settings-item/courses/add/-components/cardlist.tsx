import { Accordion } from '~/components/ui/accordion';
import CourseCard from './coursecard';
import { useQuery } from '@tanstack/react-query';
import { api } from '~/api/client';
import { Skeleton } from '~/components/ui/skeleton';

export default function CardList({ search }: { search: string }) {
  const { data } = useQuery({
    queryKey: ['courses'],
    queryFn: () => api.course.getlistCourses({}),
  });

  if (!data) {
    return [...Array(5)].map((_, index) => (
      <Skeleton key={index} className="h-24 w-full" />
    ));
  }

  const courses =
    search.length >= 3
      ? data.courses.filter((course) => {
          return [
            course.name,
            course.code,
            course.curriculumYear,
            course.major,
          ].some((field) =>
            field.toString().toLowerCase().includes(search.toLowerCase()),
          );
        })
      : data.courses;

  return (
    <Accordion
      type="multiple"
      className="no-scrollbar flex flex-col gap-4 overflow-y-auto rounded-lg"
    >
      {courses.map((course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </Accordion>
  );
}
