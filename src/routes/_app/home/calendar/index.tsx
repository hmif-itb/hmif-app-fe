import { createFileRoute } from '@tanstack/react-router';
// import MobileView from './-components/mobile-view';
import DesktopView from './-components/desktop-view';

export const Route = createFileRoute('/_app/home/calendar/')({
  component: Calendar,
});

function Calendar() {
  return (
    <>
      {/* Show mobile view if the window size <= lg */}
      {/* <MobileView /> */}

      {/* Show desktop view if the window size > lg */}
      <DesktopView />
    </>
  );
}
