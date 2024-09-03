import { Skeleton } from '~/components/ui/skeleton';
import { Switch } from '~/components/ui/switch';

export interface CategoryData {
  id: string;
  name: string;
  requiredPush: boolean;
}

interface SubscriptionCardProps {
  categoryData: CategoryData;
  unsubscribed: boolean;
  onSwitchChange: (name: string, active: boolean) => void;
}

export default function SubscriptionCard({
  categoryData,
  unsubscribed,
  onSwitchChange,
}: SubscriptionCardProps) {
  const handleSwitchChange = (checked: boolean) => {
    onSwitchChange(categoryData.id, checked);
  };
  return (
    <div className="relative flex w-full items-center rounded-xl">
      <div className="z-10 flex w-full items-center justify-between rounded-xl bg-white transition-all duration-300 ease-out">
        <div className="flex items-center gap-4 px-5 py-4">
          <img src="/logo/hmif.png" alt="Logo" className="w-10" />
          <p className="font-bold leading-5">{categoryData.name}</p>
        </div>
        <div className="px-5 py-4">
          <Switch
            disabled={categoryData.requiredPush}
            checked={!unsubscribed}
            onCheckedChange={handleSwitchChange}
          />
        </div>
      </div>
    </div>
  );
}

export function SubscriptionCardLoading() {
  return <Skeleton className="h-14 rounded-xl" />;
}
