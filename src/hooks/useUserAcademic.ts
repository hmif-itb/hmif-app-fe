import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { api, queryClient } from '~/api/client';

export function useUserAcademic() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['userAcademic'],
    queryFn: () => api.userProfile.getUserAcademic(),
  });

  useEffect(() => {
    if (data) {
      localStorage.setItem('userAcademic', JSON.stringify(data));
    }
  }, [data]);

  return { userAcademic: data, isLoading, error };
}

export function initialLoadUserAcademic() {
  const data = localStorage.getItem('userAcademic');
  if (data) {
    queryClient.setQueryData(['userAcademic'], JSON.parse(data));
  }
}
