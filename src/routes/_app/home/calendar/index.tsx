import { createFileRoute } from '@tanstack/react-router';
import DesktopView from './-components/dekstop-view';

export const Route = createFileRoute('/_app/home/calendar/')({
  component: CalendarHome,
});

function CalendarHome() {
  return (
    <>
      <DesktopView />
    </>
  );
}
