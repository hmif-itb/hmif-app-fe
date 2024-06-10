import { Outlet, createFileRoute } from '@tanstack/react-router';
import Profile from './courses/-components/Profile';

export const Route = createFileRoute('/_app/settings/courses')({
  component: CoursesLayout,
});

function CoursesLayout() {
  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden pt-3 lg:pt-0">
      <Profile className="lg:hidden" />
      <div className="flex-1 overflow-y-auto rounded-t-2xl bg-[url('/images/courses/gradient.png')] bg-cover bg-no-repeat px-4 py-10 lg:rounded-none">
        <Outlet />
      </div>
    </div>
  );
}
