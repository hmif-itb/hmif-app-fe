import { createFileRoute } from '@tanstack/react-router';
import Subscriptions from './-components/Subscriptions';
import useSpartaLock from '~/hooks/useSpartaLock';
import LockedFeature from '~/components/locked-feature';

function SubscriptionsPage() {
  const isSpartaLocked = useSpartaLock();

  return (
    <LockedFeature locked={isSpartaLocked}>
      <Subscriptions />
    </LockedFeature>
  );
}

export const Route = createFileRoute(
  '/_app/_left-navbar/settings/_settings-item/subscriptions/',
)({
  component: SubscriptionsPage,
});
