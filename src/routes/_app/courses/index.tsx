import { createFileRoute } from '@tanstack/react-router';
import MyCourses from './-components/MyCourses';
import Profile from './-components/Profile';

function Courses() {
  return (
    <div className="flex h-full flex-col gap-3 pt-3">
      <Profile />
      <MyCourses />
    </div>
  );
}

export const Route = createFileRoute('/_app/courses/')({
  component: Courses,
});
