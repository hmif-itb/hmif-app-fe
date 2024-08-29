import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '~/api/client';
import { setupNotification } from '~/lib/push';
import { invalidateSession } from '~/lib/session';

export default function useLogout() {
  const queryClient = useQueryClient();
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const subscription = await setupNotification();
      if (subscription) {
        await api.push.logoutPush({
          requestBody: { endpoint: subscription.endpoint },
        });
      }
      await api.auth.logout();
    },
    onSuccess() {
      invalidateSession(null);
      queryClient.invalidateQueries({ predicate: () => true });
    },
  });

  return {
    logout: logoutMutation.mutate,
    logoutAsync: logoutMutation.mutateAsync,
    isPending: logoutMutation.isPending,
  };
}
