import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { api } from '~/api/client';
import FolderIcon from '~/assets/icons/testimoni/folder.svg';
import TestiListItem from '../../-components/TestiListItem';
import TestiListItemLoader from '../../-components/TestiListItemLoader';
import TestiListMain from '../../-components/TestiListMain';
import { majorMap } from '../../-constants';

export const Route = createFileRoute(
  '/_app/_left-navbar/home/testimoni/$type/$semester/',
)({
  component: TestimoniCoursesPage,
});

function TestimoniCoursesPage(): JSX.Element {
  const { type, semester: semString } = Route.useParams();

  const major = majorMap.get(type);
  const semester = semString === 'other' ? undefined : parseInt(semString, 10);
  const [search, setSearch] = useState('');
  const lowerSearch = search.toLowerCase();
  const { data } = useQuery({
    queryKey: [
      'courses',
      {
        major,
        semester,
        type: semString === 'other' ? 'Elective' : 'Mandatory',
      },
    ],
    queryFn: () =>
      api.course.getlistCourses({
        major,
        semester,
        type: semString === 'other' ? 'Elective' : 'Mandatory',
      }),
  });

  const courses =
    search.length > 2
      ? data?.courses.filter(
          (course) =>
            course.name.toLowerCase().includes(lowerSearch) ||
            course.code.includes(lowerSearch),
        )
      : data?.courses;

  return (
    <TestiListMain
      linkFrom={Route.fullPath}
      major={
        major !== 'OTHER'
          ? `${major} / ${semester ? 'Semester ' + semString : 'Mata Kuliah Pilihan'}`
          : undefined
      }
      onSearchChange={setSearch}
    >
      {courses
        ? courses.map((course) => (
            <TestiListItem
              linkFrom={Route.fullPath}
              linkTo={`./${course.id}`}
              icon={FolderIcon}
              title={course.name}
              key={course.id}
            />
          ))
        : [
            <TestiListItemLoader key={1} />,
            <TestiListItemLoader key={2} />,
            <TestiListItemLoader key={3} />,
            <TestiListItemLoader key={4} />,
            <TestiListItemLoader key={5} />,
          ]}
    </TestiListMain>
  );
}
