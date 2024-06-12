import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from '@tanstack/react-router';
import { queryClient } from '~/api/client';
import { isMobile, isPWA } from '~/lib/device';
import AskForInstall from '../components/ask-install';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  if (import.meta.env.PROD && isMobile() && !isPWA()) {
    return <AskForInstall />;
  }
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <ScrollRestoration getKey={(location) => location.pathname} />
          <Outlet />
        </GoogleOAuthProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
      {/* <TanStackRouterDevtools /> */}
    </>
  );
}
