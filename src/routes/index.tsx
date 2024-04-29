import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { api } from '~/api/client';
import { ApiError } from '~/api/generated';
import { Button } from '~/components/ui/button';
import { TextField } from '~/components/ui/textfield';
import { setupNotification } from '~/lib/push';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const loginCallbackMutation = useMutation({
    mutationFn: api.auth.loginAccessToken.bind(api.auth),
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

  return (
    <div className="">
      <h3 className="p-2 text-2xl font-bold">Welcome Home!</h3>
      <div className="flex flex-col items-start space-y-2">
        <Button onClick={() => login()}>Login google</Button>
        <button onClick={setupNotification} className="rounded bg-blue-400 p-2">
          Subscribe to push notif
        </button>
        <a className="rounded bg-blue-400 p-2" href="/sparta">
          SPARTA
        </a>
        <TextField />
        <TextField error={'Required'} />
        <TextField variant={'search'} />
        <TextField variant={'default'} success />
      </div>
    </div>
  );
}
