import clsx from 'clsx';
import { useRef } from 'react';
import { UserCourse } from '~/api/generated';
import { Button } from '~/components/ui/button';
import TrashIcon from '~/assets/icons/course/trash.svg';

interface CourseCardProps {
  deleteable?: boolean;
  courseData: UserCourse;
  isSwiped: boolean;
  onSwipe: (courseId: string) => void;
  onReset: () => void;
  onDelete?: () => void;
}

export default function CourseCard({
  courseData,
  isSwiped,
  onSwipe,
  onReset,
  deleteable,
  onDelete,
}: CourseCardProps) {
  // Track user horizontal touch movement
  const touchStart = useRef(0);
  const touchCurr = useRef(0);
  const touchDist = useRef(0);

  const MIN_TOUCH_DIST = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!deleteable) return;
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!deleteable) return;
    touchCurr.current = e.touches[0].clientX;
    touchDist.current = touchCurr.current - touchStart.current;
  };

  const handleTouchEnd = () => {
    if (!deleteable) return;
    if (touchDist.current < -MIN_TOUCH_DIST) {
      // Swipe left
      onSwipe(courseData.courseId);
    } else {
      onReset();
    }
  };

  const formatClass = (cls: number) =>
    cls.toLocaleString(undefined, { minimumIntegerDigits: 2 });

  return (
    <div
      className="relative flex w-full items-center rounded-xl"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={clsx(
          `z-10 flex items-center justify-between rounded-xl bg-white px-5 transition-all duration-300 ease-out`,
          isSwiped ? 'w-[85%]' : 'w-full',
        )}
      >
        <div className="flex items-center gap-4 py-4">
          <div className="flex h-min flex-col items-center gap-1 rounded-md bg-[#305138] px-3 py-2">
            <p className="text-xs text-white">SKS</p>
            <p className="text-2xl font-medium leading-6 text-white">
              {courseData.course?.credits}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <p className="font-bold leading-5">{courseData.course?.code}</p>
              <p className="leading-5">{courseData.course?.name}</p>
            </div>
            <p className="text-xs text-[#6A6B6A]">
              Kelas: {formatClass(courseData.class)}
            </p>
          </div>
        </div>

        <Button
          onClick={onDelete}
          className="hidden rounded-full bg-[#B01212] p-2 lg:block"
        >
          <img src={TrashIcon} alt="Delete" className="size-4" />
        </Button>
      </div>
      {isSwiped && (
        <button
          onClick={onDelete}
          className={clsx(
            `absolute inset-y-0 right-0 flex items-center justify-center rounded-r-xl bg-[#B01212] text-xs text-white transition-all duration-300 ease-out`,
            isSwiped ? 'w-1/4 pl-[10%] opacity-100' : 'w-0 opacity-0',
          )}
        >
          Delete
        </button>
      )}
    </div>
  );
}
