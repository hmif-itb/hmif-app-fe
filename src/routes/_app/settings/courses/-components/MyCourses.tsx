import { Link } from '@tanstack/react-router';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import CourseCard, { CourseData } from './CourseCard';
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
export default function MyCourses() {
  const [isEditing, setIsEditing] = useState(false);
  const [swipedCourse, setSwipedCourse] = useState<string | null>(null);
  const handleSwipe = (courseId: string) => {
    setSwipedCourse(courseId);
  };

  const handleReset = () => {
    setSwipedCourse(null);
  };

  const [currCourses, setCurrCourses] = useState(coursesData);
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[30px] font-bold text-white antialiased">
          Your Courses
        </h1>
        <p className="text-sm text-[#D4D6D4]">SEMESTER 4</p>
      </div>
      <div className="flex flex-col justify-between gap-4">
        <div className={`flex flex-col gap-4`}>
          {currCourses.map((course) => (
            <CourseCard
              key={course.courseId}
              courseData={course}
              onReset={handleReset}
              onSwipe={handleSwipe}
              isSwiped={swipedCourse === course.courseId}
              deleteable={isEditing}
              onDelete={() => {
                setCurrCourses((prev) =>
                  prev.filter((c) => c.courseId !== course.courseId),
                );
              }}
            />
          ))}
        </div>
        {isEditing ? (
          <div className="flex flex-col gap-10">
            <Button className="w-full rounded-xl bg-white py-3" asChild>
              <Link to="/settings/courses/add">
                <Plus size={25} className="text-[#8E8E93]" />
              </Link>
            </Button>
            <div className="flex gap-3">
              <Button
                onClick={() => setIsEditing(false)}
                variant="outlined"
                className="w-1/2 border-2 border-[#E8C55F] font-medium text-[#E8C55F]"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setIsEditing(true)}
                className="w-1/2 bg-[#E8C55F] font-medium text-[#30764B]"
              >
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="">
            <Button
              onClick={() => setIsEditing(true)}
              className="w-full bg-[#E8C55F] font-medium text-[#30764B]"
            >
              Edit
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
