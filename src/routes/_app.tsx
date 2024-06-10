import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { queryClient } from '~/api/client';
import LeftNavbar from '~/components/left-navbar';
import Navbar from '~/components/navbar';
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
      <main className="mx-auto size-full max-w-screen-md lg:flex lg:max-w-none lg:overflow-y-auto">
        <LeftNavbar />
        <div className="flex h-full flex-1 flex-col lg:block">
          <div className="h-0 flex-1">
            <Outlet />
          </div>
          <Navbar />
        </div>
      </main>
    </SessionProvider>
  );
}
