import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '~/api/client';
import MegaphoneIcon from '~/assets/icons/timeline/megaphone.svg';
import MobileView from './-components/mobile-view';
import DesktopView from './-components/desktop-view';
import { z } from 'zod';
import { isMobile } from '~/lib/device';
import useWindowSize from '~/hooks/useWindowSize';

const timelineSearchSchema = z.object({
  search: z.string().optional(),
  read: z.boolean().optional(),
  category: z.string().optional(),
});

export const Route = createFileRoute('/_app/timeline/')({
  component: Timeline,
  validateSearch: (search) => timelineSearchSchema.parse(search),
});

function Timeline() {
  const PAGE_SIZE = 10;
  const windowSize = useWindowSize();

  const navigate = useNavigate({ from: Route.fullPath });
  const { search, read, category } = Route.useSearch();

  const setSearch = (value: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        search: value || undefined,
      }),
    });
  };

  const setRead = (value: boolean) => {
    navigate({
      search: (prev) => ({
        ...prev,
        read: value || undefined,
      }),
    });
  };

  const setCategory = (value: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        category: value || undefined,
      }),
    });
  };

  const queryClient = useQueryClient();
  const {
    data: infos,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['info', search, read, category],
    queryFn: ({ pageParam }) =>
      api.info
        .getListInfo({
          search,
          unread: read ? 'true' : 'false',
          category,
          offset: pageParam,
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
  console.log(windowSize.width);
  return (
    <>
      {windowSize.width < 1024 ? (
        <MobileView
          read={read ?? false}
          setRead={setRead}
          search={search ?? ''}
          setSearch={setSearch}
          infos={infos?.pages.flatMap((p) => p) ?? []}
          category={category ?? ''}
          setCategory={setCategory}
          onInView={fetchWhenInView}
        />
      ) : (
        <DesktopView
          read={read ?? false}
          setRead={setRead}
          search={search ?? ''}
          setSearch={setSearch}
          infos={infos?.pages.flatMap((p) => p) ?? []}
          category={category ?? ''}
          setCategory={setCategory}
          onInView={fetchWhenInView}
        />
      )}

      <Link
        to="/add-announcement"
        className="fixed bottom-[120px] right-4 z-20 flex size-[4.5625rem] flex-col items-center justify-center rounded-full border-2 border-green-300 bg-yellow-75"
      >
        <img src={MegaphoneIcon} className="mr-1 size-7" alt="" />
      </Link>
    </>
  );
}

// TODO: Mobile view, background drawernya meninggoy
