import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { z } from 'zod';
import { api, queryClient } from '~/api/client';
import { User } from '~/api/generated';
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

export default function useSession() {
  const data = useSuspenseQuery<User>({
    queryKey: ['me'],
    queryFn: () => api.auth.getMe(),
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
  });

  useEffect(() => {
    if (data.data) {
      localStorage.setItem('user', JSON.stringify(data.data));
    }
  }, [data.data]);

  return data.data;
}

export function invalidateSession() {
  localStorage.removeItem('user');
  queryClient.invalidateQueries({ queryKey: ['me'] });
}
