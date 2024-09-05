import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from '@tanstack/react-router';
import { Toaster } from 'react-hot-toast';
import { queryClient } from '~/api/client';
import Sentry from '~/instrument';
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
          <Sentry.ErrorBoundary fallback={<div>Something went wrong</div>}>
            <>
              <Toaster />
              <Outlet />
            </>
          </Sentry.ErrorBoundary>
        </GoogleOAuthProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
      {import.meta.env.VITE_ANALYTICS_ID && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_ANALYTICS_ID}`}
          ></script>
          <script>
            {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${import.meta.env.VITE_ANALYTICS_ID}');`}
          </script>
        </>
      )}
      {/* <TanStackRouterDevtools /> */}
    </>
  );
}
