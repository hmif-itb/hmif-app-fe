import { createFileRoute, Outlet } from '@tanstack/react-router';
import UserInfo from '~/components/user/user-info';
import useSession from '~/hooks/auth/useSession';

export const Route = createFileRoute('/_app/_left-navbar/home/testimoni')({
  component: TestimoniLayout,
});

function TestimoniLayout(): JSX.Element {
  const user = useSession();

  return (
    <main className="flex h-full flex-col gap-3 overflow-hidden pt-3 lg:pt-0">
      <UserInfo
        name={user.fullName}
        email={user.email}
        imageURL={user.picture}
        className="flex w-full items-center gap-4 px-5 py-4 lg:hidden lg:gap-9"
      />
      <Outlet />
    </main>
  );
}
