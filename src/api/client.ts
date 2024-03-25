import { ApiClient } from './generated';

export const api = new ApiClient({
  BASE: import.meta.env.VITE_API_URL,
  WITH_CREDENTIALS: true,
  CREDENTIALS: 'include',
});
