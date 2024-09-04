import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { Course } from '~/api/generated';
import ArrowDownIcon from '~/assets/icons/course/ArrowDown.svg';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import CourseItem from './courseitem';

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
        className={`content flex items-center justify-between rounded-lg bg-white px-4 py-2 text-body-md`}
      >
        <div className="flex items-center gap-4">
          <div className="flex h-min flex-col items-center gap-1 rounded-md bg-[#305138] px-3 py-2">
            <p className="text-xs text-white">SKS</p>
            <p className="text-heading-sm font-medium leading-6 text-white">
              {course.credits}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold">{course.code}</p>
            <p className="">{course.name}</p>
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
