import { createFileRoute } from '@tanstack/react-router';
import TestiListMain from './-components/TestiListMain';
import TestiListItem from './-components/TestiListItem';
import BookMarkIcon from '~/assets/icons/testimoni/bookmark.svg';

export const Route = createFileRoute('/_app/home/testimoni/')({
  component: TestimoniPage,
});

const TYPES = [
  'Teknik Informatika',
  'Sistem dan Teknologi Informasi',
  'Mata Kuliah Umum',
];

function TestimoniPage(): JSX.Element {
  return (
    <TestiListMain linkFrom={Route.fullPath}>
      {TYPES.map((type, idx) => (
        <TestiListItem
          linkFrom={Route.fullPath}
          linkTo={`./${type.toLowerCase().split(' ').join('-')}`}
          icon={BookMarkIcon}
          title={type}
          key={idx}
        />
      ))}
    </TestiListMain>
  );
}
