import { createFileRoute } from '@tanstack/react-router';
import MyCourses from './-components/MyCourses';

function Courses() {
  return <MyCourses />;
}

export const Route = createFileRoute(
  '/_app/_left-navbar/settings/_settings-item/courses/',
)({
  component: Courses,
});
