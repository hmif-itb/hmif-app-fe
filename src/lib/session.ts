import { z } from 'zod';
import { queryClient } from '~/api/client';
import { User, UserWithRoles } from '~/api/generated';

export function invalidateSession(user?: User | null) {
  if (user === undefined) {
    localStorage.removeItem('user');
    queryClient.invalidateQueries({ queryKey: ['me'] });
  } else if (user === null) {
    localStorage.setItem('user', 'null');
    queryClient.setQueryData(['me'], null);
  } else {
    localStorage.setItem('user', JSON.stringify(user));
    queryClient.setQueryData(['me'], user);
  }
}

const userSchema = z
  .object({
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
    roles: z.array(z.string()),
  })
  .nullable();

export function loadUserCache() {
  const queryClientUser = queryClient.getQueryData<UserWithRoles | null>([
    'me',
  ]);
  if (queryClientUser !== undefined) {
    return queryClientUser;
  }
  try {
    const user = localStorage.getItem('user');
    if (!user) return undefined;
    return userSchema.parse(JSON.parse(user)) as UserWithRoles;
  } catch (error) {
    return undefined;
  }
}

export function saveUserCache(user: User | null) {
  localStorage.setItem('user', JSON.stringify(user));
}
