import { createFileRoute } from '@tanstack/react-router';
import useSessionForce from '~/hooks/auth/useSession';
import DesktopView from './-components/desktop-view';
import MobileView from './-components/mobile-view';
import infos from './-dummy/info';

function MainDashboard() {
  const user = useSessionForce();

  if (!infos) {
    return <div>Error</div>;
  }

  return (
    <main className="h-full min-h-screen">
      {/* Show mobile view if the window size <= lg */}
      <MobileView user={user} />

      {/* Show desktop view if the window size > lg */}
      <DesktopView user={user} />
    </main>
  );
}

export const Route = createFileRoute('/main-dashboard/')({
  component: MainDashboard,
});
