import { Accordion } from '~/components/ui/accordion';
import CourseCard from './coursecard';
import { useQuery } from '@tanstack/react-query';
import { api } from '~/api/client';

export default function CardList() {
  const { data } = useQuery({
    queryKey: ['courses'],
    queryFn: () => api.course.getlistCourses({}),
  });

  if (!data) {
    return <div>Loading...</div>;
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
