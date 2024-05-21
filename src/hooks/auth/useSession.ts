import { useContext } from 'react';
import { User } from '~/api/generated';
import { SessionContext } from '~/components/session';

export default function useSession(): User {
  const user = useContext(SessionContext);
  if (!user) {
    throw new Error('User is not logged in');
  }
  return user!;
}
