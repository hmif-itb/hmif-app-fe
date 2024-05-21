import { GoogleOAuthProvider } from '@react-oauth/google';
import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { queryClient } from '~/api/client';
import { ApiError } from '~/api/generated';

export const Route = createRootRoute({
  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          {/* error boundary for tanstack router suspense error */}
          <QueryErrorResetBoundary>
            {({ reset }) => (
              // error boundary for react suspense
              <ErrorBoundary
                onReset={reset}
                fallbackRender={({ resetErrorBoundary, error }) => {
                  if (error instanceof ApiError) {
                    resetErrorBoundary();
                    return null;
                  }
                  return <div>Something went wrong</div>;
                }}
              >
                {/* TODO: implement loading. suspense will fallback if something is using useSuspenseQuery and currently loading */}
                <Suspense fallback={<div>Loading...</div>}>
                  <Outlet />
                </Suspense>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </GoogleOAuthProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
