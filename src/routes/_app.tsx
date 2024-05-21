import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { queryClient } from '~/api/client';
import LeftNavbar from '~/components/left-navbar';
import SessionProvider from '~/components/session';
import { loadUserCache } from '~/lib/session';

export const Route = createFileRoute('/_app')({
  component: AppLayout,
  loader: () => {
    const user = loadUserCache();
    // not logged in based on local storage
    if (user === null) {
      queryClient.setQueryData(['me'], null);
      throw redirect({ to: '/login' });
    }
    if (user) {
      queryClient.setQueryData(['me'], user);
    }
  },
});

function AppLayout() {
  return (
    <SessionProvider>
      <main className="lg:flex lg:size-full lg:overflow-y-auto">
        <LeftNavbar />
        <Outlet />
      </main>
    </SessionProvider>
  );
}
