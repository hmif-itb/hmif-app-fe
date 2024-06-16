import { useState } from 'react';
import SubscriptionCard, { SubscriptionData } from './SubscriptionCard';

const subscriptionData: SubscriptionData[] = [
  {
    imageSrc: '/logo/hmif.png',
    name: 'SPARTA',
    active: true,
  },
  {
    imageSrc: '/logo/hmif.png',
    name: 'SPARTY',
    active: false,
  },
  {
    imageSrc: '/logo/hmif.png',
    name: 'SPORTY',
    active: false,
  },
  {
    imageSrc: '/logo/hmif.png',
    name: 'LMAO',
    active: true,
  },
];

export default function Subscriptions() {
  const [currSubscriptions, setCurrSubscriptions] = useState(subscriptionData);

  const handleSwitchChange = (name: string, active: boolean) => {
    setCurrSubscriptions((prevSubscriptions) =>
      prevSubscriptions.map((subscription) =>
        subscription.name === name ? { ...subscription, active } : subscription,
      ),
    );
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[30px] font-bold text-white antialiased">
          Subscription
        </h1>
      </div>
      <div className="flex flex-col justify-between gap-4">
        {currSubscriptions.map((subscription) => (
          <SubscriptionCard
            key={subscription.name}
            subscriptionData={subscription}
            onSwitchChange={handleSwitchChange}
          />
        ))}
      </div>
    </>
  );
}
