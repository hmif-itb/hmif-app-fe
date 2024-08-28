import { createFileRoute, Outlet } from '@tanstack/react-router';
import LeftNavbar from '~/components/navbar/left-navbar';

export const Route = createFileRoute('/_app/_left-navbar')({
  component: LeftNavbarLayout,
});

function LeftNavbarLayout() {
  return (
    <>
      <LeftNavbar />
      <div className="flex h-full flex-1 flex-col lg:block">
        <Outlet />
      </div>
    </>
  );
}
