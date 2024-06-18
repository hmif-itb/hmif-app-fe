import { Switch } from '~/components/ui/switch';

export interface SubscriptionData {
  imageSrc: string;
  name: string;
  active: boolean;
}

interface SubscriptionCardProps {
  subscriptionData: SubscriptionData;
  onSwitchChange: (name: string, active: boolean) => void;
}

export default function SubscriptionCard({
  subscriptionData,
  onSwitchChange,
}: SubscriptionCardProps) {
  const handleSwitchChange = (checked: boolean) => {
    onSwitchChange(subscriptionData.name, checked);
  };
  return (
    <div className="relative flex w-full items-center rounded-xl">
      <div className="z-10 flex w-full items-center justify-between rounded-xl bg-white transition-all duration-300 ease-out">
        <div className="flex items-center gap-4 px-5 py-4">
          <img src={subscriptionData.imageSrc} alt="Logo" className="w-10" />
          <p className="font-bold leading-5">{subscriptionData.name}</p>
        </div>
        <div className="px-5 py-4">
          <Switch
            checked={subscriptionData.active}
            onCheckedChange={handleSwitchChange}
          />
        </div>
      </div>
    </div>
  );
}
