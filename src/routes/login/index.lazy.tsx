import { createLazyFileRoute } from '@tanstack/react-router';
import GoogleLogo from '~/assets/icons/login/google.svg';
import { Button } from '~/components/ui/button';
import useLogin from '../../hooks/auth/useLogin';
import LoginLayout from './-components/LoginLayout';

export const Route = createLazyFileRoute('/login/')({
  component: LoginPage,
});

function LoginPage(): JSX.Element {
  const { login, devLogin } = useLogin();

  return (
    <LoginLayout>
      <h1 className="italic text-white lg:text-black">
        <span className="text-heading-lg not-italic">
          Hello, <span className="font-bold italic">Pips!</span>
        </span>
        <br />
        Log in with your std email to get you in
      </h1>

      <Button
        onClick={() => login()}
        className="flex w-full items-center gap-3 bg-white font-medium text-black lg:hidden"
        size="icon-md"
      >
        <img src={GoogleLogo} className="size-5" alt="" />
        Log in with Google
      </Button>
      <Button
        onClick={() => login()}
        variant="outlined"
        className="hidden w-full items-center gap-3 font-medium lg:flex"
        size="icon-md"
      >
        <img src={GoogleLogo} className="size-5" alt="" />
        Log in with Google
      </Button>
      {import.meta.env.DEV && (
        <form
          className="flex w-full flex-col gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            devLogin.mutate({
              email: String(data.get('email')),
              password: String(data.get('password')),
            });
          }}
        >
          <p className="text-white lg:text-black">Development test login</p>
          <input
            className="rounded border p-3 text-black"
            name="email"
            type="email"
            placeholder="Email"
            aria-label="Email"
            autoComplete="username"
            required
          />
          <input
            className="rounded border p-3 text-black"
            name="password"
            type="password"
            placeholder="Password"
            aria-label="Password"
            autoComplete="current-password"
            required
            maxLength={256}
          />
          {devLogin.error && (
            <p role="alert" className="text-red-500">
              {devLogin.error.message}
            </p>
          )}
          <Button type="submit" disabled={devLogin.isPending}>
            {devLogin.isPending
              ? 'Logging in…'
              : 'Log in with test credentials'}
          </Button>
        </form>
      )}
    </LoginLayout>
  );
}
