import { createFileRoute } from '@tanstack/react-router';
import MyCourses from './-components/MyCourses';
import useSpartaLock from '~/hooks/useSpartaLock';
import LockedFeature from '~/components/locked-feature';

function Courses() {
  const isSpartaLocked = useSpartaLock();

  return (
    <LockedFeature locked={isSpartaLocked}>
      <MyCourses />
    </LockedFeature>
  );
}

export const Route = createFileRoute(
  '/_app/_left-navbar/settings/_settings-item/courses/',
)({
  component: Courses,
});
