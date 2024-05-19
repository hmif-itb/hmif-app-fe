import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { api } from '~/api/client';
import { ApiError } from '~/api/generated';

export default function useLogin() {
  const navigate = useNavigate();

  const loginCallbackMutation = useMutation({
    mutationFn: api.auth.loginAccessToken.bind(api.auth),
    onSuccess: () => {
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
