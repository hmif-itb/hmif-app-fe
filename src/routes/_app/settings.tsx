import {
  Link,
  Outlet,
  createFileRoute,
  useRouter,
  useRouterState,
} from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import HeaderTitle from '~/components/header-title';
import {
  desktopSettingsOptions,
  settingsOptions,
} from './settings/-config/settings-options';

export const Route = createFileRoute('/_app/settings')({
  component: SettingsLayout,
});

function SettingsLayout() {
  const router = useRouter();
  const routerState = useRouterState();
  const selectedSettings = settingsOptions.find((option) =>
    routerState.location.pathname.startsWith(option.href),
  );
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="hidden lg:block">
        <HeaderTitle />
      </div>
      <div className="flex-1 overflow-y-auto bg-green-50">
        <div className="mx-auto flex h-full max-w-screen-lg flex-col lg:px-8">
          <h1 className="my-8 hidden items-center space-x-12 text-heading-lg font-bold lg:flex">
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
            <ul className="hidden w-72 flex-col border-r border-neutral-normal-active py-9 lg:flex">
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
            </ul>
            <div className="flex-1 overflow-y-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
