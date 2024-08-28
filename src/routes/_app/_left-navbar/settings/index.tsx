import { createFileRoute } from '@tanstack/react-router';
import SettingsDekstop from './-components/settings-desktop';
import SettingsMobile from './-components/settings-mobile';

export const Route = createFileRoute('/_app/_left-navbar/settings/')({
  component: SettingsIndex,
});

function SettingsIndex() {
  return (
    <>
      <SettingsMobile />
      <SettingsDekstop />
    </>
  );
}
