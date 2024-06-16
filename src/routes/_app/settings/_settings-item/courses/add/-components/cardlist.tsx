import { Accordion } from '~/components/ui/accordion';
import CourseCard from './coursecard';

export default function CardList() {
  return (
    <Accordion
      type="multiple"
      className="no-scrollbar flex flex-col gap-4 overflow-y-auto rounded-lg"
    >
      <CourseCard id={'1'} />
      <CourseCard id={'2'} />
      <CourseCard id={'3'} />
    </Accordion>
  );
}
