import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { api } from '~/api/client';
import { ApiError, User } from '~/api/generated';
import { invalidateSession } from '~/lib/session';

export default function useLogin() {
  const navigate = useNavigate();

  const loginCallbackMutation = useMutation({
    mutationFn: api.auth.loginAccessToken.bind(api.auth),
    onSuccess(data: User) {
      invalidateSession(data);
      navigate({ to: '/home' });
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

  const devLogin = useMutation<User, Error, DevCredentials>({
    // Production builds set __TEST_LOGIN_ENABLED__ to false, so the request below is compiled out of them.
    mutationFn: __TEST_LOGIN_ENABLED__ ? requestDevLogin : testLoginUnavailable,
    onSuccess(data) {
      invalidateSession(data);
      navigate({ to: '/home' });
    },
  });

  return { login, devLogin };
}

interface DevCredentials {
  email: string;
  password: string;
}

async function requestDevLogin(credentials: DevCredentials): Promise<User> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL || ''}/api/auth/login/dev`,
    {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    },
  );
  if (!response.ok)
    throw new Error(
      response.status === 401
        ? 'Invalid email or password'
        : 'Development login unavailable',
    );
  return response.json();
}

function testLoginUnavailable(): Promise<User> {
  return Promise.reject(new Error('Test login is off in this build'));
}
