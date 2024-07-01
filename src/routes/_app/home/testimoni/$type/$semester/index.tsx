import { createFileRoute } from '@tanstack/react-router';
import TestiListMain from '../../-components/TestiListMain';
import { useQuery } from '@tanstack/react-query';
import { api } from '~/api/client';
import TestiListItem from '../../-components/TestiListItem';
import FolderIcon from '~/assets/icons/testimoni/folder.svg';
import { majorMap } from '../../-constants';

export const Route = createFileRoute('/_app/home/testimoni/$type/$semester/')({
  component: TestimoniCoursesPage,
});

function TestimoniCoursesPage(): JSX.Element {
  const { type, semester: semString } = Route.useParams();

  const major = majorMap.get(type);
  const semester = semString === 'other' ? undefined : parseInt(semString, 10);
  const { data } = useQuery({
    queryKey: ['courses', { major, semester }],
    queryFn: () =>
      api.course.getlistCourses({
        major,
        semester,
        type: semString === 'other' ? 'Elective' : 'Mandatory',
      }),
  });

  return (
    <TestiListMain
      linkFrom={Route.fullPath}
      major={
        major !== 'OTHER'
          ? `${major} / ${semester ? 'Semester ' + semString : 'Mata Kuliah Pilihan'}`
          : undefined
      }
      showSearchbar
    >
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
