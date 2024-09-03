import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '~/api/client';
import { UserCourse } from '~/api/generated';
import { Button } from '~/components/ui/button';
import { useUserAcademic } from '~/hooks/useUserAcademic';
import { isMobile } from '~/lib/device';
import CourseCard from './CourseCard';

export default function MyCourses() {
  const [isEditing, setIsEditing] = useState(false);
  const [swipedCourse, setSwipedCourse] = useState<string | null>(null);
  const [currCourses, setCurrCourses] = useState<UserCourse[]>([]);
  const [deletedCourses, setDeletedCourses] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const handleSwipe = (courseId: string) => {
    setSwipedCourse(courseId);
  };
  const { userAcademic } = useUserAcademic();

  const handleReset = () => {
    setSwipedCourse(null);
  };

  const deleteCourseMutation = useMutation({
    mutationFn: api.course.deleteUserCourse.bind(api.course),
    onSuccess: () => {
      setSwipedCourse(null);
      queryClient.invalidateQueries({ queryKey: ['currentCourses'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { data: currentCourses } = useQuery({
    queryKey: ['currentCourses'],
    queryFn: () => api.course.getCurrentUserCourse(),
  });

  useEffect(() => {
    if (currentCourses) {
      setCurrCourses(currentCourses);
    }
  }, [currentCourses]);

  if (!currentCourses) {
    return <div></div>;
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div className="">
          <h1 className="text-heading-lg font-bold text-white antialiased">
            {isEditing ? 'Edit Courses' : 'Your Courses'}
          </h1>
          {isEditing && isMobile() && (
            <p className="text-body-md text-neutral-normal">
              Swipe left to delete course
            </p>
          )}
        </div>
        <p className="text-sm text-[#D4D6D4]">
          {userAcademic?.semester ? `SEMESTER ${userAcademic.semester}` : ''}
        </p>
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
                setDeletedCourses((prev) => [...prev, course.courseId]);
                setCurrCourses((prev) =>
                  prev.filter((c) => c.courseId !== course.courseId),
                );
                setSwipedCourse(null);
              }}
            />
          ))}
        </div>
        <div className="flex justify-between rounded-2xl bg-[#fbfbfb] px-6 py-4 text-heading-sm font-bold">
          <span>Jumlah SKS</span>
          <span className="font-medium">
            {currCourses.reduce(
              (acc, curr) => acc + (curr.course?.credits || 0),
              0,
            )}
          </span>
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
                onClick={() => {
                  setCurrCourses(currentCourses);
                  setDeletedCourses([]);
                  setIsEditing(false);
                }}
                variant="outlined"
                className="w-1/2 border-2 border-[#E8C55F] font-medium text-[#E8C55F]"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  deleteCourseMutation.mutate({
                    requestBody: { courseIds: deletedCourses },
                  });
                  setIsEditing(false);
                }}
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
