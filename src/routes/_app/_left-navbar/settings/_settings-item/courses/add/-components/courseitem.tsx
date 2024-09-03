import { useContext } from 'react';
import MinusIcon from '~/assets/icons/course/Minus.svg';
import PlusIcon from '~/assets/icons/course/Plus.svg';
import { CourseContext, TakeCourseBody } from '..';
import { SelectedClassContext } from './coursecard';

export default function CourseItem({
  kelas,
  courseId,
}: {
  kelas: number;
  courseId: string;
}) {
  const { selectedClass, setSelectedClass } = useContext(SelectedClassContext);
  const { selectedCourses, setSelectedCourses } = useContext(CourseContext);

  const isSelected =
    selectedClass === kelas &&
    selectedCourses.some((course) => course.courseId === courseId);

  const handleSelect = () => {
    if (isSelected) {
      setSelectedClass(0);
      setSelectedCourses((prev: TakeCourseBody[]) =>
        prev.filter((course) => course.courseId !== courseId),
      );
    } else {
      setSelectedClass(kelas);
      // Check if the course is already selected
      if (selectedCourses.some((course) => course.courseId === courseId)) {
        // Update the class of the selected course
        setSelectedCourses((prev: TakeCourseBody[]) =>
          prev.map((course) =>
            course.courseId === courseId ? { ...course, class: kelas } : course,
          ),
        );
      } else {
        // Add the course to the selected courses
        setSelectedCourses((prev: TakeCourseBody[]) => [
          ...prev,
          { courseId, class: kelas },
        ]);
      }
    }
  };

  return (
    <div className="flex items-center justify-between rounded-b-lg border-t-2 border-neutral-300 bg-white p-5">
      <div className="flex flex-col">
        <p className="text-lg font-bold">K{kelas}</p>
        {/* <p className="text-sm">Dr. tech. Wikan Danar Sunindyo, S.T, M.Sc.</p> */}
      </div>
      <button type="button" onClick={handleSelect}>
        <img
          alt="Dropdown Button"
          src={isSelected ? MinusIcon : PlusIcon}
          className="m-auto"
        />
      </button>
    </div>
  );
}
