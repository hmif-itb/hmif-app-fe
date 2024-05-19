import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { api } from '~/api/client';
import { ApiError, PushSubscription } from '~/api/generated';
import { setupNotification } from '~/lib/push';

export default function useLogin() {
  const navigate = useNavigate();
  const pushNotifMutation = useMutation({
    mutationFn: async () => {
      const subscription = await setupNotification();
      if (subscription) {
        return await api.push.registerPush({
          requestBody: subscription.toJSON() as PushSubscription,
        });
      }
    },
  });

  const loginCallbackMutation = useMutation({
    mutationFn: api.auth.loginAccessToken.bind(api.auth),
    onSuccess: () => {
      pushNotifMutation.mutate();
      navigate({ to: '/' });
    },
    onError(error) {
      if (error instanceof ApiError && error.status === 401) {
        alert('User not registered in HMIF.');
      }
    },
  });
  const login = useGoogleLogin({
    onSuccess(tokenResponse) {
      loginCallbackMutation.mutate({
        requestBody: { accessToken: tokenResponse.access_token },
      });
    },
  });

  return { login };
}
