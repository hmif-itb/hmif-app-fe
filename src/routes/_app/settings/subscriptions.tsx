import { Outlet, createFileRoute } from '@tanstack/react-router';
import UserInfo from '~/components/user/user-info';
import useSession from '~/hooks/auth/useSession';

export const Route = createFileRoute('/_app/settings/subscriptions')({
  component: SubscriptionLayout,
});

function SubscriptionLayout() {
  const user = useSession();

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden pt-3 lg:pt-0">
      <UserInfo
        name={user.fullName}
        email={user.email}
        imageURL={user.picture}
        className="flex w-full items-center gap-4 px-5 py-4 lg:hidden lg:gap-9"
      />
      <div className="flex-1 overflow-y-auto rounded-t-2xl bg-[url('/images/courses/gradient.png')] bg-cover bg-no-repeat px-4 py-10 lg:rounded-none">
        <Outlet />
      </div>
    </div>
  );
}
