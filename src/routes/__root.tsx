import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Suspense } from 'react';
import { queryClient } from '~/api/client';

export const Route = createRootRoute({
  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </GoogleOAuthProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
