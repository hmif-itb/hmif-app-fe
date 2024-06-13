import { createFileRoute, Outlet } from '@tanstack/react-router';
import Profile from './../../settings/courses/-components/Profile';
import MyCourses from './-components/my-courses';
// import MyCourses from './-components/MyCourses';

export const Route = createFileRoute('/_app/home/dingdong/')({
  component: Dingdong,
});

function Dingdong() {
  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden pt-3 lg:pt-0">
      <Profile className="lg:hidden" />
      <div className="flex-1 overflow-y-auto rounded-t-2xl bg-[url('/images/courses/gradient.png')] bg-cover bg-no-repeat px-4 py-10 lg:rounded-none">
        {/* <Outlet /> */}
        <MyCourses />
      </div>
    </div>
  );
}
