import { createFileRoute } from '@tanstack/react-router';
import TestiListMain from './-components/TestiListMain';
import TestiListItem from './-components/TestiListItem';
import BookMarkIcon from '~/assets/icons/testimoni/bookmark.svg';

export const Route = createFileRoute('/_app/_left-navbar/home/testimoni/')({
  component: TestimoniPage,
});

const TYPES = ['Teknik Informatika', 'Sistem dan Teknologi Informasi'];

function TestimoniPage(): JSX.Element {
  return (
    <TestiListMain linkFrom={Route.fullPath}>
      {[
        ...TYPES.map((type, idx) => (
          <TestiListItem
            linkFrom={Route.fullPath}
            linkTo={`./${type.toLowerCase().split(' ').join('-')}`}
            icon={BookMarkIcon}
            title={type}
            key={idx}
          />
        )),
        <TestiListItem
          key={3}
          linkFrom={Route.fullPath}
          linkTo="./mata-kuliah-umum/other"
          icon={BookMarkIcon}
          title="Mata Kuliah Umum"
        />,
      ]}
    </TestiListMain>
  );
}
