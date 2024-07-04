// import { createContext, Dispatch, SetStateAction, useState } from 'react';
import SubscriptionCard from './SubscriptionCard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '~/api/client';

export default function Subscriptions() {
  return <SubscriptionComponent />;
}

function SubscriptionComponent() {
  const queryClient = useQueryClient();

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
          Subscription
        </h1>
      </div>
      <div className="flex flex-col justify-between gap-4">
        {categories?.categories.map((category) => (
          <SubscriptionCard
            key={category.id}
            categoryData={category}
            unsubscribed={
              unsubscribed?.categoryId.includes(category.id) ? true : false
            }
            onSwitchChange={handleSwitchChange}
          />
        ))}
      </div>
    </>
  );
}
