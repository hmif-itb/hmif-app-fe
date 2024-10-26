import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { z } from 'zod';
import { api } from '~/api/client';
import { INFO_LIST_QUERY_KEY, INFO_QUERY_KEY } from '~/api/constants';
import MegaphoneIcon from '~/assets/icons/megaphone.svg';
import useWindowSize from '~/hooks/useWindowSize';
import { DEBOUNCE_TIME } from '~/lib/constants';
import DesktopView from './-components/desktop-view';
import MobileView from './-components/mobile-view';
import { FilterProps } from './-types';

const timelineSearchSchema = z.object({
  search: z.string().optional(),
  unread: z.boolean().optional(),
  excludeCategories: z.array(z.string()).optional(),
  sort: z.string().optional(),
});

export const Route = createFileRoute('/_app/_left-navbar/timeline/')({
  component: Timeline,
  validateSearch: (search) => timelineSearchSchema.parse(search),
});

function Timeline() {
  const PAGE_SIZE = 10;
  const windowSize = useWindowSize();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navigate = useNavigate({ from: Route.fullPath });
  const { search, unread, excludeCategories, sort } = Route.useSearch();
  const [searchInput, setSearchInput] = useState(search ?? '');

  const setSearch = (value: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setSearchInput(value);
    timeoutRef.current = setTimeout(() => {
      navigate({
        search: (prev) => ({
          ...prev,
          search: value || undefined,
        }),
      });
    }, DEBOUNCE_TIME);
  };

  const setFilter: FilterProps['setFilter'] = (data) => {
    Object.keys(data).forEach((key) => {
      if (data[key as keyof typeof data] === undefined) {
        delete data[key as keyof typeof data];
      }
    });
    navigate({
      search: (prev) => ({
        ...prev,
        ...data,
      }),
    });
  };

  const queryClient = useQueryClient();
  const {
    data: infos,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: [INFO_LIST_QUERY_KEY, search, unread, excludeCategories, sort],
    queryFn: ({ pageParam }) =>
      api.info
        .getListInfo({
          search,
          unread: unread ? 'true' : 'false',
          excludeCategories,
          offset: pageParam,
          sort: sort === 'oldest' ? 'oldest' : 'newest',
        })
        .then((res) => {
          const infos = res.infos;
          infos.forEach((info) => {
            queryClient.setQueryData([INFO_QUERY_KEY, 'detail', info.id], info);
          });
          return infos;
        }),
    initialPageParam: 0,
    getNextPageParam: (_1, _2, lastOffset) => lastOffset + PAGE_SIZE,
  });

  const fetchWhenInView = () =>
    !isFetchingNextPage &&
    (infos?.pages.flatMap((p) => p).length ?? 1) % PAGE_SIZE === 0 &&
    fetchNextPage();

  // TODO: fetching next page loading
  return (
    <>
      {windowSize.width < 1024 ? (
        <MobileView
          isFetching={isLoading}
          search={searchInput}
          setSearch={setSearch}
          infos={infos?.pages.flatMap((p) => p) ?? []}
          onInView={fetchWhenInView}
          filter={{
            unread: unread ?? false,
            excludeCategories: excludeCategories || [],
            sort: sort === 'oldest' ? 'oldest' : 'newest',
          }}
          setFilter={setFilter}
        />
      ) : (
        <DesktopView
          isFetching={isLoading}
          search={searchInput}
          setSearch={setSearch}
          infos={infos?.pages.flatMap((p) => p) ?? []}
          onInView={fetchWhenInView}
          filter={{
            unread: unread ?? false,
            excludeCategories: excludeCategories || [],
            sort: sort === 'oldest' ? 'oldest' : 'newest',
          }}
          setFilter={setFilter}
        />
      )}

      <Link
        to="/add-announcement"
        className="fixed bottom-[120px] right-4 z-20 flex size-[4.5625rem] flex-col items-center justify-center rounded-full border-2 border-green-300 bg-yellow-75 lg:hidden"
      >
        <img src={MegaphoneIcon} className="mr-1 size-7" alt="" />
      </Link>
    </>
  );
}
