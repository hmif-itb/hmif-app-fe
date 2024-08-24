import { useQuery } from '@tanstack/react-query';
import { Navigate } from '@tanstack/react-router';
import { createContext, useEffect } from 'react';
import { api } from '~/api/client';
import { UserWithRoles } from '~/api/generated';
import { setupNotification } from '~/lib/push';
import { saveUserCache } from '~/lib/session';

export const SessionContext = createContext<UserWithRoles>(
  null as unknown as UserWithRoles,
);

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.auth.getMe().catch(() => null),
  });

  useQuery({
    queryKey: ['pushsubs'],
    queryFn: () => setupNotification(),
    enabled: !!data,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data !== undefined) {
      saveUserCache(data);
    }
  }, [data]);

  if (data === null) {
    return <Navigate to="/login" />;
  }

  if (!data) {
    // TODO: loading UI
    return <div>Loading...</div>;
  }
  return (
    <SessionContext.Provider value={data}>{children}</SessionContext.Provider>
  );
}
