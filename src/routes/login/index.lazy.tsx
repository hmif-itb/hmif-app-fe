import { createLazyFileRoute } from '@tanstack/react-router';
import useLogin from './-hooks/useLogin';
import { Button } from '~/components/ui/button';
import GoogleLogo from '~/assets/icons/login/google.svg';

export const Route = createLazyFileRoute('/login/')({
  component: LoginPage,
});

function LoginPage(): JSX.Element {
  const { flow, setFlow } = useLogin();

  return (
    <main className="w-full h-screen bg-cover bg-[url(/images/login/login-bg.png)] overflow-hidden font-inter px-10 pt-[112px] pb-[95px] flex flex-col justify-between">
      {flow === 0 ? (
        <h1 className="text-white text-3xl">
          Welcome to <br />{' '}
          <span className="text-4xl font-bold">HMIF Super App</span>
        </h1>
      ) : (
        <h1 className="text-white italic">
          <span className="text-heading-2 not-italic">
            Hello, <span className="font-bold italic">Pips!</span>
          </span>
          <br />
          Log in with your std email to get you in
        </h1>
      )}

      {flow === 0 ? (
        <div className="flex flex-col gap-4 w-full">
          <Button
            onClick={() => setFlow(1)}
            variant="solid"
            className="w-full bg-white text-black font-medium"
          >
            Log in
          </Button>

          <div className="flex flex-col gap-1">
            <p className="text-white text-xs font-light w-full text-center">
              Are you a SPARTAN?
            </p>
            <Button
              variant="outlined"
              className="w-full border-white text-white"
            >
              LOGO SPARTA
            </Button>
          </div>
        </div>
      ) : (
        <Button
          className="w-full bg-white text-black font-medium flex items-center gap-3"
          size="icon-md"
        >
          <img src={GoogleLogo} className="size-5" alt="" />
          Log in with Google
        </Button>
      )}
    </main>
  );
}
