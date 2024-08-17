import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { api } from '~/api/client';
import MegaphoneIcon from '~/assets/icons/megaphone.svg';
import useWindowSize from '~/hooks/useWindowSize';
import DesktopView from './-components/desktop-view';
import MobileView from './-components/mobile-view';
import { FilterProps } from './-types';

const timelineSearchSchema = z.object({
  search: z.string().optional(),
  unread: z.boolean().optional(),
  category: z.string().optional(),
  sort: z.string().optional(),
});

export const Route = createFileRoute('/_app/timeline/')({
  component: Timeline,
  validateSearch: (search) => timelineSearchSchema.parse(search),
});

function Timeline() {
  const PAGE_SIZE = 10;
  const windowSize = useWindowSize();

  const navigate = useNavigate({ from: Route.fullPath });
  const { search, unread, category, sort } = Route.useSearch();

  const setSearch = (value: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        search: value || undefined,
      }),
    });
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
  } = useInfiniteQuery({
    queryKey: ['infos', search, unread, category],
    queryFn: ({ pageParam }) =>
      api.info
        .getListInfo({
          search,
          unread: unread ? 'true' : 'false',
          category,
          offset: pageParam,
          sort: sort === 'oldest' ? 'oldest' : 'newest',
        })
        .then((res) => {
          const infos = res.infos;
          infos.forEach((info) => {
            queryClient.setQueryData(['info', 'detail', info.id], info);
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

  return (
    <>
      {windowSize.width < 1024 ? (
        <MobileView
          search={search ?? ''}
          setSearch={setSearch}
          infos={infos?.pages.flatMap((p) => p) ?? []}
          onInView={fetchWhenInView}
          filter={{
            unread: unread ?? false,
            category: category ?? '',
            sort: sort === 'oldest' ? 'oldest' : 'newest',
          }}
          setFilter={setFilter}
        />
      ) : (
        <DesktopView
          search={search ?? ''}
          setSearch={setSearch}
          infos={infos?.pages.flatMap((p) => p) ?? []}
          onInView={fetchWhenInView}
          filter={{
            unread: unread ?? false,
            category: category ?? '',
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

// TODO: Mobile view, background drawernya meninggoy
