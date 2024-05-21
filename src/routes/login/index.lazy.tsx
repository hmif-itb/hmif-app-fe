import { createLazyFileRoute } from '@tanstack/react-router';
import GoogleLogo from '~/assets/icons/login/google.svg';
import { Button } from '~/components/ui/button';
import useLogin from '../../hooks/auth/useLogin';
import LoginLayout from './-components/LoginLayout';

export const Route = createLazyFileRoute('/login/')({
  component: LoginPage,
});

function LoginPage(): JSX.Element {
  const { login } = useLogin();

  return (
    <LoginLayout>
      <h1 className="italic text-white lg:text-black">
        <span className="text-heading-2 not-italic">
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
    </LoginLayout>
  );
}
