import { createFileRoute } from '@tanstack/react-router';
import SettingsDekstop from './-components/settings-desktop';
import SettingsMobile from './-components/settings-mobile';
import useSpartaLock from '~/hooks/useSpartaLock';

export const Route = createFileRoute('/_app/_left-navbar/settings/')({
  component: SettingsIndex,
});

function SettingsIndex() {
  const isSpartaLocked = useSpartaLock();

  return (
    <>
      <SettingsMobile locked={isSpartaLocked} />
      <SettingsDekstop locked={isSpartaLocked} />
    </>
  );
}
