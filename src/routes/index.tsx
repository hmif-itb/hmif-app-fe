import { Link, createFileRoute, redirect } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import { loadUserCache } from '~/lib/session';
import LoginLayout from './login/-components/LoginLayout';

export const Route = createFileRoute('/')({
  component: Index,
  loader: () => {
    if (loadUserCache()) {
      throw redirect({ to: '/home' });
    }
  },
});

function Index() {
  return (
    <LoginLayout>
      <h1 className="text-3xl text-white lg:text-black">
        Welcome to <br />{' '}
        <span className="text-4xl font-bold">HMIF Super App</span>
      </h1>
      <div className="flex w-full flex-col gap-4">
        <Button
          asChild
          variant="solid"
          className="w-full font-medium max-lg:bg-white  max-lg:text-black"
        >
          <Link to="/login">Log in</Link>
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
    </LoginLayout>
  );
}
