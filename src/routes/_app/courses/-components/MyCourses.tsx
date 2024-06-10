import { useState } from 'react';
import CourseCard, { CourseData } from './CourseCard';
import { Button } from '~/components/ui/button';
import { Plus } from 'lucide-react';

export default function MyCourses() {
  const [isEditing, setIsEditing] = useState(false);
  const [swipedCourse, setSwipedCourse] = useState<string | null>(null);
  const handleSwipe = (courseId: string) => {
    setSwipedCourse(courseId);
  };

  const handleReset = () => {
    setSwipedCourse(null);
  };

  const currCourses: CourseData[] = [
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

  return (
    <div className="h-full rounded-t-2xl bg-[url('/images/courses/gradient.png')] px-7 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[30px] font-bold text-white antialiased">
          Your Courses
        </h1>
        <p className="text-sm text-[#D4D6D4]">SEMESTER 4</p>
      </div>
      <div className="flex h-full flex-col justify-between gap-4">
        <div
          className={`flex ${isEditing ? 'h-[45vh]' : 'h-[55vh]'} flex-col gap-4 overflow-y-scroll`}
        >
          {currCourses.map((course) => (
            <CourseCard
              key={course.courseId}
              courseData={course}
              onReset={handleReset}
              onSwipe={handleSwipe}
              isSwiped={swipedCourse === course.courseId}
              deleteable={isEditing}
            />
          ))}
        </div>
        {isEditing ? (
          <div className="flex h-[30vh] flex-col gap-10">
            <Button className="w-full rounded-xl bg-white py-3">
              <Plus size={25} className="text-[#8E8E93]" />
            </Button>
            <div className="flex gap-3">
              <Button
                onClick={() => setIsEditing(false)}
                variant="outlined"
                className="w-1/2 border-2 border-[#E8C55F] text-[#E8C55F]"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setIsEditing(true)}
                className="w-1/2 bg-[#E8C55F] text-[#30764B]"
              >
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="h-[20vh]">
            <Button
              onClick={() => setIsEditing(true)}
              className="w-full bg-[#E8C55F] text-[#30764B]"
            >
              Edit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
