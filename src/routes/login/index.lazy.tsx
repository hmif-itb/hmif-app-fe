import { createLazyFileRoute } from '@tanstack/react-router';
import useLogin from './-hooks/useLogin';
import { Button } from '~/components/ui/button';
import GoogleLogo from '~/assets/icons/login/google.svg';

export const Route = createLazyFileRoute('/login/')({
  component: LoginPage,
});

function LoginPage(): JSX.Element {
  const { flow, setFlow, login } = useLogin();

  return (
    <main className="h-screen w-full overflow-hidden bg-[url(/images/login/login-bg.png)] bg-cover font-inter lg:flex lg:bg-none">
      <aside className="hidden h-full w-[65%] bg-[url(/images/login/login-bg-desktop.png)] bg-cover lg:block" />

      <section className="flex h-full flex-auto flex-col justify-between px-10 pb-[95px] pt-[112px] lg:px-14">
        {flow === 0 ? (
          <h1 className="text-3xl text-white lg:text-black">
            Welcome to <br />{' '}
            <span className="text-4xl font-bold">HMIF Super App</span>
          </h1>
        ) : (
          <h1 className="italic text-white lg:text-black">
            <span className="text-heading-2 not-italic">
              Hello, <span className="font-bold italic">Pips!</span>
            </span>
            <br />
            Log in with your std email to get you in
          </h1>
        )}

        {flow === 0 ? (
          <div className="flex w-full flex-col gap-4">
            <Button
              onClick={() => setFlow(1)}
              variant="solid"
              className="w-full font-medium max-lg:bg-white  max-lg:text-black"
            >
              Log in
            </Button>

            <div className="flex flex-col gap-1">
              <p className="w-full text-center text-xs font-light max-lg:text-white">
                Are you a SPARTAN?
              </p>
              <Button
                variant="outlined"
                className="w-full max-lg:border-white max-lg:text-white"
                asChild
              >
                <a href="/sparta">LOGO SPARTA</a>
              </Button>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </section>
    </main>
  );
}
