import { createFileRoute } from '@tanstack/react-router';
import MyCourses from './-components/MyCourses';
import Profile from './-components/Profile';

function Courses() {
  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden pt-3 lg:pt-0">
      <Profile className="lg:hidden" />
      <MyCourses />
    </div>
  );
}

export const Route = createFileRoute('/_app/settings/courses/')({
  component: Courses,
});
