import { useQuery } from '@tanstack/react-query';

export function useLocationCategories() {
  const query = useQuery({
    queryKey: ['location-categories'],
    queryFn: () =>
      Promise.resolve(
        [
          { id: 'Ganesha', name: 'Ganesha Campus' },
          { id: 'Jatinangor', name: 'Jatinangor Campus' },
        ].map((c) => ({
          id: c.id,
          title: `${c.name}`,
        })),
      ),
  });

  return query.data ?? [];
}
