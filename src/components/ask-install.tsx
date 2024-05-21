import { isiOS } from '~/lib/device';

export default function AskForInstall() {
  const iOS = isiOS();
  return (
    <div className="flex size-full items-center justify-center">
      Install the app to use it.
    </div>
  );
}
