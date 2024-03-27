import { QueryClient } from '@tanstack/react-query';
import { ApiClient, ApiError } from './generated';

export const api = new ApiClient({
  BASE: import.meta.env.VITE_API_URL,
  WITH_CREDENTIALS: true,
  CREDENTIALS: 'include',
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry(failureCount, error) {
        if (failureCount >= 3) return false;
        if (error instanceof ApiError) {
          if (error.status >= 400 && error.status < 500) return false;
        }
        return true;
      },
    },
  },
});
