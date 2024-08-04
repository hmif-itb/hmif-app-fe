import { createFileRoute } from '@tanstack/react-router';
import DesktopAddEvent from './-components/DesktopAddEvent';

export const Route = createFileRoute('/_app/dummy-cal/')({
  component: DummyCal,
});

function DummyCal() {
  return (
    <>
      <DesktopAddEvent />
    </>
  );
}
