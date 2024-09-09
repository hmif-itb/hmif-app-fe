import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Navigate } from '@tanstack/react-router';
import { createContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { api } from '~/api/client';
import { UserWithRoles } from '~/api/generated';
import { isMobile } from '~/lib/device';
import { setupNotification } from '~/lib/push';
import { saveUserCache, tryToLoadUserLocalStorage } from '~/lib/session';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription } from './ui/dialog';

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
    queryFn: () =>
      api.auth
        .getMe()
        .catch(() => tryToLoadUserLocalStorage())
        .catch(() => null),
  });

  const { data: subs, isPending } = useQuery({
    queryKey: ['pushsubs'],
    queryFn: () => setupNotification(),
    enabled: !!data,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const queryClient = useQueryClient();

  const askForNotif = Boolean(isMobile() && data && !subs && !isPending);

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
    <SessionContext.Provider value={data}>
      <Dialog open={askForNotif}>
        <DialogContent hideCloseButton>
          <DialogDescription className="text-black">
            You cannot use this app because notification permission is not
            granted. Please allow first by clicking the button below or from
            device settings.
          </DialogDescription>
          <div className="flex justify-center">
            <Button
              onClick={async () => {
                const promise = setupNotification().then((result) => {
                  if (result) {
                    queryClient.setQueryData(['pushsubs'], result);
                  } else {
                    throw new Error('Permission denied!');
                  }
                });

                toast.promise(promise, {
                  loading: 'Requesting permission...',
                  success: 'Permission granted',
                  error:
                    'Failed to ask permission. If the popup did not appear, please allow directly from settings or reinstall the app.',
                });
              }}
              className="bg-green-400"
              size={'sm'}
            >
              Ask Permission
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {children}
    </SessionContext.Provider>
  );
}
