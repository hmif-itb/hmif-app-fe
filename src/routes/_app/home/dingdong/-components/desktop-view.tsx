import HeaderTitle from '~/components/header-title';
import Timeline from './../../-components/timeline';
import { useState } from 'react';
import CourseCard, { CourseData } from './course-card';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from '@tanstack/react-router';

function DesktopView() {
  const router = useRouter();

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
    <div className="hidden size-full max-h-full flex-col overflow-hidden lg:flex">
      <HeaderTitle />
      <div className="flex h-0 flex-1">
        <div className="flex flex-1 flex-col items-center self-stretch overflow-y-auto border-r border-gray-300 py-8">
          <div className="flex-1 bg-white">
            <div className="mb-6 flex items-center justify-start">
              <button
                onClick={() => {
                  router.history.back();
                }}
              >
                <ChevronLeft className="mr-5 size-5" />
              </button>
              <h1 className="text-[30px] font-bold text-black antialiased">
                Dingdong
              </h1>
            </div>
            <div className="flex flex-col justify-between gap-4">
              <div className={`flex flex-col gap-4`}>
                {currCourses.map((course) => (
                  <CourseCard key={course.courseId} courseData={course} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Section */}
        <div className="flex flex-1 flex-col self-stretch overflow-y-auto py-8">
          <Timeline />
        </div>
      </div>
    </div>
  );
}

export default DesktopView;
