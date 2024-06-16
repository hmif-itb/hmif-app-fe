import { createFileRoute } from '@tanstack/react-router';
import Subscriptions from './-components/Subscriptions';

function SubscriptionsPage() {
  return <Subscriptions />;
}

export const Route = createFileRoute('/_app/settings/subscriptions/')({
  component: SubscriptionsPage,
});
