import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { api } from '~/api/client';
import { setupNotification } from '~/lib/push';
import { invalidateSession } from './useSession';

export default function useLogout() {
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const subscription = await setupNotification();
      if (subscription) {
        return await api.push.logoutPush({
          requestBody: { endpoint: subscription.endpoint },
        });
      }
      await api.auth.logout();
    },
    onSuccess() {
      invalidateSession();
      navigate({ to: '/login' });
    },
  });

  return {
    logout: logoutMutation.mutate,
    logoutAsync: logoutMutation.mutateAsync,
    isPending: logoutMutation.isPending,
  };
}
