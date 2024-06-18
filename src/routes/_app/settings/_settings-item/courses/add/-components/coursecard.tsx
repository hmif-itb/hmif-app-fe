import ArrowDownIcon from '~/assets/icons/course/ArrowDown.svg';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import CourseItem from './courseitem';
import { Course } from '~/api/generated';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

export const SelectedClassContext = createContext<{
  selectedClass: number;
  setSelectedClass: Dispatch<SetStateAction<number>>;
}>({
  selectedClass: 0,
  setSelectedClass: (() => {}) as Dispatch<SetStateAction<number>>,
});

export default function CourseCard({ course }: { course: Course }) {
  const [selectedClass, setSelectedClass] = useState(0);

  return (
    <AccordionItem
      value={course.id}
      className="[&[data-state=open]>.content]:rounded-b-none"
    >
      <div
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className={`content flex items-center justify-between rounded-lg bg-white p-5`}
      >
        <div className="flex gap-5">
          <div className="flex size-12 flex-col items-center justify-center rounded-md bg-green-900 text-neutral-light">
            <p className="pt-1 text-[8px] leading-none">SKS</p>
            <p className="text-xl font-bold leading-6">{course.credits}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-bold">{course.code}</p>
            <p className="text-sm">{course.name}</p>
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
          <SelectedClassContext.Provider
            value={{
              selectedClass: selectedClass,
              setSelectedClass: setSelectedClass,
            }}
          >
            <CourseItem kelas={1} courseId={course.id} />
            <CourseItem kelas={2} courseId={course.id} />
            <CourseItem kelas={3} courseId={course.id} />
          </SelectedClassContext.Provider>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
