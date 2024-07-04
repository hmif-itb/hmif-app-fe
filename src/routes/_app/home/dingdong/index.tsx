import { createFileRoute } from '@tanstack/react-router';
import MobileView from './-components/mobile-view';
import DesktopView from './-components/desktop-view';
// import MyCourses from './-components/MyCourses';

export const Route = createFileRoute('/_app/home/dingdong/')({
  component: Dingdong,
});

function Dingdong() {
  return (
    <>
      {/* Show mobile view if the window size <= lg */}
      <MobileView />

      {/* Show desktop view if the window size > lg */}
      <DesktopView />
    </>
  );
}
