import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/settings/subscriptions/')({
  component: SubscriptionsPage,
});

function SubscriptionsPage() {
  return <div>Subscriptions</div>;
}
