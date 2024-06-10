import { createFileRoute } from '@tanstack/react-router';
import MyCourses from './-components/MyCourses';

function Courses() {
  return <MyCourses />;
}

export const Route = createFileRoute('/_app/settings/courses/')({
  component: Courses,
});
