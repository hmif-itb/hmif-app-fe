import { createFileRoute, Outlet } from '@tanstack/react-router';
import LeftNavbar from '~/components/navbar/left-navbar';

export const Route = createFileRoute('/_app/_left-navbar')({
  component: LeftNavbarLayout,
});

function LeftNavbarLayout() {
  return (
    <>
      <LeftNavbar />
      <div className="flex h-full flex-auto flex-col overflow-x-hidden lg:block">
        <Outlet />
      </div>
    </>
  );
}
