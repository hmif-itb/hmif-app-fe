import { createFileRoute } from '@tanstack/react-router';
import TestiListMain from '../-components/TestiListMain';
import TestiListItem from '../-components/TestiListItem';
import BookMarkIcon from '~/assets/icons/testimoni/bookmark.svg';
import { majorMap } from '../-constants';

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
  const { type } = Route.useParams();

  const major = majorMap.get(type);

  return (
    <TestiListMain linkFrom={Route.fullPath} major={major}>
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
