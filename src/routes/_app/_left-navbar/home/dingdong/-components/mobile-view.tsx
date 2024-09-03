import { useQuery } from '@tanstack/react-query';
import { api } from '~/api/client';
import UserInfo from '~/components/user/user-info';
import useSession from '~/hooks/auth/useSession';
import { useUserAcademic } from '~/hooks/useUserAcademic';
import CourseCard from './course-card';

function MobileView() {
  const user = useSession();
  const { userAcademic } = useUserAcademic();

  const { data: currCourses } = useQuery({
    queryKey: ['currentCourses'],
    queryFn: () => api.course.getCurrentUserCourse(),
  });

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden pt-3 lg:hidden">
      <UserInfo
        name={user.fullName}
        email={user.email}
        imageURL={user.picture}
        className="flex w-full items-center gap-4 px-5 py-4 lg:hidden lg:gap-9"
      />
      <div className="flex-1 overflow-y-auto rounded-t-2xl bg-[url('/images/courses/gradient.png')] bg-cover bg-no-repeat px-4 py-10 lg:rounded-none">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-[30px] font-bold text-white antialiased">
            Dingdong
          </h1>
          <p className="text-sm text-[#D4D6D4]">
            {user.major} SEMESTER {userAcademic?.semester}
          </p>
        </div>
        <div className="flex flex-col justify-between gap-4">
          <div className={`flex flex-col gap-4`}>
            {currCourses?.map((course) => (
              <CourseCard key={course.courseId} courseData={course.course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileView;
