import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';
import { queryClient } from '~/api/client';
import LeftNavbar from '~/components/navbar/left-navbar';
import Navbar from '~/components/navbar/navbar';
import SessionProvider from '~/components/session';
import { loadUserCache } from '~/lib/session';

const appSearchSchema = z.object({
  showAnnounce: z.boolean().optional(),
});

export const Route = createFileRoute('/_app')({
  component: AppLayout,
  validateSearch: (search) => appSearchSchema.parse(search),
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
          <Outlet />
          <Navbar />
        </div>
      </main>
    </SessionProvider>
  );
}
