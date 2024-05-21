import { isiOS } from '~/lib/device';

export default function AskForInstall() {
  const iOS = isiOS();
  return (
    <div className="flex h-screen w-full items-center justify-center">
      Install the app to use it.
    </div>
  );
}
