import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_navbar')({
  component: Navbar,
});

function Navbar() {
  return (
    <div>
      <div className="w-full bg-green-300 py-2">
        <h1>Navbar</h1>
      </div>
      <Outlet />
    </div>
  );
}
