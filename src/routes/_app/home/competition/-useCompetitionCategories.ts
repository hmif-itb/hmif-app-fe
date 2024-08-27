import { useQuery } from '@tanstack/react-query';
import { api } from '~/api/client';

export function useCompetitionCategories() {
  const query = useQuery({
    queryKey: ['competition-categories'],
    queryFn: () =>
      api.competitions.getCompetitionCategories().then((res) =>
        res.map((val) => ({
          id: val,
          title: val,
        })),
      ),
  });

  return query.data ?? [];
}
