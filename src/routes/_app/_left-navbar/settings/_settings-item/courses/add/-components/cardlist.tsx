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

  const { data: currentCourses } = useQuery({
    queryKey: ['currentCourses'],
    queryFn: () => api.course.getCurrentUserCourse(),
  });

  if (!data || !currentCourses) {
    return [...Array(5)].map((_, index) => (
      <Skeleton key={index} className="h-24 w-full" />
    ));
  }

  const filteredCourses = data.courses.filter(
    (course) =>
      !currentCourses.some(
        (currentCourse) => currentCourse.courseId === course.id, // Adjust property as per your structure
      ),
  );

  return (
    <Accordion
      type="multiple"
      className="no-scrollbar flex flex-col gap-4 overflow-y-auto rounded-lg"
    >
      {filteredCourses.length > 0 ? (
        filteredCourses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))
      ) : (
        <div>No courses available.</div>
      )}
    </Accordion>
  );
}
