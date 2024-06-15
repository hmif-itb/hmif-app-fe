import { Link } from '@tanstack/react-router';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import CourseCard from './CourseCard';
import { api } from '~/api/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UserCourse } from '~/api/generated';

export default function MyCourses() {
  const [isEditing, setIsEditing] = useState(false);
  const [swipedCourse, setSwipedCourse] = useState<string | null>(null);
  const [currCourses, setCurrCourses] = useState<UserCourse[]>([]);
  const handleSwipe = (courseId: string) => {
    setSwipedCourse(courseId);
  };

  const handleReset = () => {
    setSwipedCourse(null);
  };

  const deleteCourseMutation = useMutation({
    mutationFn: api.course.deleteUserCourse.bind(api.course),
    onSuccess: () => {
      setSwipedCourse(null);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { data: currentCourses } = useQuery({
    queryKey: ['currentCourses'],
    queryFn: () => api.course.getCurrentUserCourse(),
  });

  if (!currentCourses) {
    return <div>Loading...</div>;
  }

  if (currCourses.length === 0) {
    setCurrCourses(currentCourses);
  }

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
                deleteCourseMutation.mutate({ courseId: course.courseId });
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
