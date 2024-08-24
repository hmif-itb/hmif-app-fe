import { useContext } from 'react';
import { UserWithRoles } from '~/api/generated';
import { SessionContext } from '~/components/session';

export default function useSession(): UserWithRoles {
  const user = useContext(SessionContext);
  if (!user) {
    throw new Error('User is not logged in');
  }
  return user!;
}
