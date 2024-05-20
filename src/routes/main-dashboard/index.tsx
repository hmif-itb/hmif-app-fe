import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { api } from '~/api/client';
import infos from './-dummy/info';
import MobileView from './-components/mobile-view';
import DesktopView from './-components/desktop-view';

function MainDashboard() {
  const usersQuery = useQuery({
    queryKey: ['me'],
    queryFn: () => api.auth.getMe(),
  });

  if (usersQuery.isFetching) {
    return <div>Loading...</div>;
  }

  const user = usersQuery.data;

  if (!user || !infos) {
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
