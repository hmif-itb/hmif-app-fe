import {
  Link,
  Outlet,
  createFileRoute,
  useRouter,
  useRouterState,
} from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import { Button } from '~/components/ui/button';
import useLogout from '~/hooks/auth/useLogout';
import {
  desktopSettingsOptions,
  settingsOptions,
} from './settings/-config/settings-options';

export const Route = createFileRoute('/_app/_left-navbar/settings')({
  component: SettingsLayout,
});

function SettingsLayout() {
  const router = useRouter();
  const routerState = useRouterState();
  const selectedSettings = settingsOptions.find((option) =>
    routerState.location.pathname.startsWith(option.href),
  );
  const { logout } = useLogout();
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto bg-green-50">
        <div className="mx-auto mb-10 flex h-full max-w-screen-lg flex-col lg:px-8">
          <h1 className="my-6 hidden items-center space-x-12 text-heading-lg font-bold lg:flex">
            {selectedSettings && (
              <button
                onClick={() => {
                  router.history.back();
                }}
              >
                <ChevronLeft className="size-8" />
              </button>
            )}
            <span>{selectedSettings?.title ?? 'Settings'}</span>
          </h1>
          <div className="flex flex-1 overflow-hidden lg:rounded-xl lg:bg-white lg:shadow-lg">
            <div className="hidden w-72 flex-col border-r border-neutral-normal-active py-9 lg:flex">
              {desktopSettingsOptions.map((option) => (
                <Link
                  to={option.href}
                  className="flex items-center gap-9 p-3 pl-6 text-body-lg font-bold"
                  activeProps={{
                    className: 'bg-green-50',
                  }}
                  activeOptions={{
                    exact: option.href === '/settings',
                  }}
                  key={option.title}
                >
                  <img
                    src={option.icon}
                    alt={option.title}
                    aria-hidden="true"
                  />
                  <span>{option.title}</span>
                </Link>
              ))}
              <div className="flex-1" />
              <Button
                variant={'link'}
                className="w-full text-[#FF3B30]"
                onClick={() => logout()}
              >
                Log out
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
