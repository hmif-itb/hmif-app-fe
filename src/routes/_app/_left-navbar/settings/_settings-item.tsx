import { createFileRoute, Outlet } from '@tanstack/react-router';
import UserInfo from '~/components/user/user-info';
import useSession from '~/hooks/auth/useSession';

export const Route = createFileRoute(
  '/_app/_left-navbar/settings/_settings-item',
)({
  component: SettingsItemLayout,
});

function SettingsItemLayout(): JSX.Element {
  const user = useSession();

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden pt-3 lg:pt-0">
      <UserInfo
        name={user.fullName}
        email={user.email}
        imageURL={user.picture}
        className="flex w-full items-center gap-4 px-5 py-4 lg:hidden lg:gap-9"
      />
      <div className="relative flex flex-1 flex-col overflow-y-auto rounded-t-2xl bg-[url('/images/courses/gradient.png')] bg-cover bg-no-repeat px-4 pb-28 pt-6 lg:rounded-none lg:pb-6">
        <Outlet />
      </div>
    </div>
  );
}
