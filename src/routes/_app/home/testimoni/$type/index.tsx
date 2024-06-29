import { createFileRoute } from '@tanstack/react-router';
import TestiListMain from '../-components/TestiListMain';
import TestiListItem from '../-components/TestiListItem';
import BookMarkIcon from '~/assets/icons/testimoni/bookmark.svg';

export const Route = createFileRoute('/_app/home/testimoni/$type/')({
  component: TestimoniSemesterPage,
});

const SEMESTER = [
  'Semester 3',
  'Semester 4',
  'Semester 5',
  'Semester 6',
  'Mata Kuliah Pilihan',
];

function TestimoniSemesterPage(): JSX.Element {
  return (
    <TestiListMain linkFrom={Route.fullPath}>
      {SEMESTER.map((semester, idx) => (
        <TestiListItem
          linkFrom={Route.fullPath}
          linkTo={`./${semester === 'Mata Kuliah Pilihan' ? 'other' : semester.split(' ')[1]}`}
          icon={BookMarkIcon}
          title={semester}
          key={idx}
        />
      ))}
    </TestiListMain>
  );
}
