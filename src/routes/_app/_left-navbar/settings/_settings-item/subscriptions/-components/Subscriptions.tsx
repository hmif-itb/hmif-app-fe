// import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '~/api/client';
import { Button } from '~/components/ui/button';
import { setupNotification } from '~/lib/push';
import SubscriptionCard, { SubscriptionCardLoading } from './SubscriptionCard';

export default function Subscriptions() {
  return <SubscriptionComponent />;
}

function SubscriptionComponent() {
  const queryClient = useQueryClient();
  const [isEnabledNotification, setIsEnabledNotification] = useState(
    Notification.permission === 'granted',
  );

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.category.getListCategory(),
  });
  const { data: unsubscribed } = useQuery({
    queryKey: ['unsubscribe'],
    queryFn: () => api.unsubscribe.getListUserUnsubscribeCategory(),
  });

  const unsubscribeMutation = useMutation({
    mutationFn: async (categoryId: string) => {
      await api.unsubscribe.postUserUnsubscribeCategory({
        requestBody: { categoryId },
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['unsubscribe'] });
    },
  });

  const subscribeMutation = useMutation({
    mutationFn: async (categoryId: string) => {
      await api.unsubscribe.deleteUserUnsubscribeCategory({
        requestBody: { categoryId },
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['unsubscribe'] });
    },
  });

  const handleSwitchChange = (id: string, active: boolean) => {
    if (active) {
      subscribeMutation.mutate(id);
    } else {
      unsubscribeMutation.mutate(id);
    }
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[30px] font-bold text-white antialiased">
          Notification
        </h1>
      </div>
      {isEnabledNotification ? (
        <div className="flex flex-col justify-between gap-4">
          {categories && unsubscribed ? (
            categories.categories.map((category) => (
              <SubscriptionCard
                key={category.id}
                categoryData={category}
                unsubscribed={
                  unsubscribed?.categoryId.includes(category.id) ? true : false
                }
                onSwitchChange={handleSwitchChange}
              />
            ))
          ) : (
            <>
              <SubscriptionCardLoading />
              <SubscriptionCardLoading />
              <SubscriptionCardLoading />
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-between gap-4 rounded-lg bg-white p-4">
          <p>
            The notification permission is not granted. Please allow first by
            clicking the button below.
          </p>
          <Button
            onClick={async () => {
              const promise = setupNotification().then((result) => {
                if (result) {
                  setIsEnabledNotification(true);
                } else {
                  throw new Error('Permission denied!');
                }
              });

              toast.promise(promise, {
                loading: 'Requesting permission...',
                success: 'Permission granted',
                error:
                  'Failed to ask permission. If the popup did not appear, please allow directly from settings.',
              });
            }}
            className="bg-green-400"
            size={'sm'}
          >
            Ask Permission
          </Button>
        </div>
      )}
    </>
  );
}
