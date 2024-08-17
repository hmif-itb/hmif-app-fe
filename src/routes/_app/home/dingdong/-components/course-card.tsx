import { Link } from '@tanstack/react-router';
import { Course } from '~/api/generated';

interface CourseCardProps {
  courseData?: Course;
}

export default function CourseCard({ courseData }: CourseCardProps) {
  return (
    <Link to={courseData?.dingdongUrl ?? ''} target="_blank">
      <div className="relative flex w-full items-center rounded-xl">
        <div className="z-10 flex w-full items-center rounded-xl bg-white transition-all duration-300 ease-out">
          <div className="flex items-center gap-4 px-5 py-4">
            <div className="flex items-center gap-4">
              <img src="/img/home/folder.svg" className="size-6" alt="Folder" />
              <p className="w-full truncate text-base font-bold leading-5">
                {courseData?.code} {courseData?.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
