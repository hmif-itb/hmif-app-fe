import { useState } from 'react';
import CourseCard, { CourseData } from './course-card';

export default function MyCourses() {
  const coursesData: CourseData[] = [
    {
      courseId: '1',
      code: 'IF4031',
      name: 'Manajemen Perangkat Lunak',
      class: 3,
      credits: 3,
    },
    {
      courseId: '2',
      code: 'IF4050',
      name: 'Pemrograman Web',
      class: 1,
      credits: 5,
    },
    {
      courseId: '3',
      code: 'IF4031',
      name: 'Manajemen Perangkat Lunak',
      class: 3,
      credits: 3,
    },
    {
      courseId: '4',
      code: 'IF4050',
      name: 'Pemrograman Web',
      class: 1,
      credits: 5,
    },
    {
      courseId: '5',
      code: 'IF4031',
      name: 'Manajemen Perangkat Lunak',
      class: 3,
      credits: 3,
    },
    {
      courseId: '6',
      code: 'IF4050',
      name: 'Pemrograman Web',
      class: 1,
      credits: 5,
    },
  ];

  const [currCourses] = useState(coursesData);

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[30px] font-bold text-white antialiased">
          Dingdong
        </h1>
        <p className="text-sm text-[#D4D6D4]">STI-SEMESTER 4</p>
      </div>
      <div className="flex flex-col justify-between gap-4">
        <div className={`flex flex-col gap-4`}>
          {currCourses.map((course) => (
            <CourseCard key={course.courseId} courseData={course} />
          ))}
        </div>
      </div>
    </>
  );
}
