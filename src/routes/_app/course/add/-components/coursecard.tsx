import ArrowDownIcon from '~/assets/icons/course/ArrowDown.svg';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import CourseItem from './courseitem';

export default function CourseCard({ id }: { id: string }) {
  return (
    <AccordionItem
      value={id}
      className="[&[data-state=open]>.content]:rounded-b-none"
    >
      <div
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className={`content flex items-center justify-between rounded-lg bg-white p-5`}
      >
        <div className="flex gap-5">
          <div className="flex size-12 flex-col items-center justify-center rounded-md bg-green-900 text-neutral-light">
            <p className="pt-1 text-[8px] leading-none">SKS</p>
            <p className="text-xl font-bold leading-6">3</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-bold">II2220</p>
            <p className="text-sm">Manajemen Sumber Daya STI</p>
          </div>
        </div>
        <AccordionTrigger type="button">
          <img
            alt="Dropdown Button"
            src={ArrowDownIcon}
            className="m-auto shrink-0 transition-transform duration-200"
          />
        </AccordionTrigger>
      </div>
      <AccordionContent>
        <div className="rounded-b-lg bg-neutral-light">
          {/* data.map */}
          <CourseItem kelas={1} />
          <CourseItem kelas={2} />
          <CourseItem kelas={3} />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
