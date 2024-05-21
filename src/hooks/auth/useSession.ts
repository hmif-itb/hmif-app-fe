import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { z } from 'zod';
import { api, queryClient } from '~/api/client';
import { ApiError, User } from '~/api/generated';
import { setupNotification } from '~/lib/push';

const userSchema = z.object({
  id: z.string(),
  nim: z.string(),
  email: z.string(),
  fullName: z.string(),
  major: z.union([z.literal('IF'), z.literal('STI')]),
  region: z.union([z.literal('Ganesha'), z.literal('Jatinangor')]),
  angkatan: z.number(),
  gender: z.union([z.literal('F'), z.literal('M')]),
  membershipStatus: z.string(),
  picture: z.string(),
});

/**
 *
 * @param forceLogin force the session to be not null, if forceLogin true and user is not logged in, it will redirect to login page
 * @returns User not null if forceLogin is true, User | null if forceLogin is false
 */
export default function useSession<ForceLogin extends boolean = true>(
  forceLogin: ForceLogin = true as ForceLogin,
): ForceLogin extends true ? User : User | null {
  const navigate = useNavigate();
  const data = useSuspenseQuery<User | null>({
    queryKey: ['me'],
    queryFn: () =>
      api.auth.getMe().catch((error) => {
        if (error instanceof ApiError && error.status === 401) {
          invalidateSession();
          if (forceLogin) {
            navigate({ to: '/login' });
          } else {
            return null;
          }
        }
        throw error;
      }),
    initialData: () => {
      try {
        const user = localStorage.getItem('user');
        if (!user) return undefined;
        return userSchema.parse(JSON.parse(user));
      } catch (error) {
        return undefined;
      }
    },
    initialDataUpdatedAt: () => {
      return Date.now();
    },
  });

  // auto reregister subscription
  useQuery({
    queryKey: ['subscriptionsetup'],
    queryFn: () =>
      setupNotification().then(async (subs) => {
        if (subs) {
          return true;
        }
        return false;
      }),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: forceLogin,
  });

  useEffect(() => {
    if (data.data) {
      localStorage.setItem('user', JSON.stringify(data.data));
    }
  }, [data.data]);

  return data.data!;
}

export function invalidateSession() {
  localStorage.removeItem('user');
  queryClient.invalidateQueries({ queryKey: ['me'] });
}
