import { createFileRoute } from '@tanstack/react-router';
import TestiListMain from '../../-components/TestiListMain';
import { useQuery } from '@tanstack/react-query';
import { api } from '~/api/client';
import TestiListItem from '../../-components/TestiListItem';
import FolderIcon from '~/assets/icons/testimoni/folder.svg';

export const Route = createFileRoute('/_app/home/testimoni/$type/$semester/')({
  component: TestimoniCoursesPage,
});

type Major = 'IF' | 'STI' | 'OTHER';
const majorMap = new Map<string, Major>([
  ['teknik-informatika', 'IF'],
  ['sistem-dan-teknologi-informasi', 'STI'],
  ['mata-kuliah-umum', 'OTHER'],
]);

function TestimoniCoursesPage(): JSX.Element {
  const { type, semester: semString } = Route.useParams();

  const major = majorMap.get(type);
  const semester = semString === 'other' ? undefined : parseInt(semString, 10);
  const { data } = useQuery({
    queryKey: ['courses', { major, semester }],
    queryFn: () => api.course.getlistCourses({ major, semester }),
  });

  return (
    <TestiListMain linkFrom={Route.fullPath}>
      {data?.courses.map((course, idx) => (
        <TestiListItem
          linkFrom={Route.fullPath}
          linkTo={`./${course.id}`}
          icon={FolderIcon}
          title={course.name}
          key={idx}
        />
      ))}
    </TestiListMain>
  );
}
