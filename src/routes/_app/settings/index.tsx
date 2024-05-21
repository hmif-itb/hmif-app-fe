import { createFileRoute } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import useLogout from '~/hooks/auth/useLogout';

export const Route = createFileRoute('/_app/settings/')({
  component: SettingsPage,
});

function SettingsPage() {
  const { logout } = useLogout();

  return <Button onClick={() => logout()}>Logout</Button>;
}
