import { createFileRoute } from '@tanstack/react-router';
import DesktopView from './-components/desktop-view';
import MobileView from './-components/mobile-view';
import infos from './-dummy/info';

function MainDashboard() {
  if (!infos) {
    return <div>Error</div>;
  }

  return (
    <>
      {/* Show mobile view if the window size <= lg */}
      <MobileView />

      {/* Show desktop view if the window size > lg */}
      <DesktopView />
    </>
  );
}

export const Route = createFileRoute('/_app/home/')({
  component: MainDashboard,
});
