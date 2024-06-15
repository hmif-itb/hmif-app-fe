import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '~/api/client';
import MegaphoneIcon from '~/assets/icons/timeline/megaphone.svg';
import MobileView from './-components/mobile-view';
import DesktopView from './-components/desktop-view';
import { z } from 'zod';
import { isMobile } from '~/lib/device';

const timelineSearchSchema = z.object({
  search: z.string().optional(),
  read: z.boolean().optional(),
});

export const Route = createFileRoute('/_app/timeline/')({
  component: Timeline,
  validateSearch: (search) => timelineSearchSchema.parse(search),
});

function Timeline() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { search, read } = Route.useSearch();

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

  const queryClient = useQueryClient();
  const { data: infos = [] } = useQuery({
    queryKey: ['info', search, read],
    queryFn: () =>
      api.info
        .getListInfo({ search, unread: read ? 'true' : 'false' })
        .then((res) => {
          const infos = res.infos;
          infos.forEach((info) => {
            queryClient.setQueryData(['info', 'detail', info.id], info);
          });
          return infos;
        }),
  });

  return (
    <>
      {isMobile() ? (
        <MobileView
          read={read ?? false}
          setRead={setRead}
          search={search ?? ''}
          setSearch={setSearch}
          infos={infos}
        />
      ) : (
        <DesktopView
          read={read ?? false}
          setRead={setRead}
          search={search ?? ''}
          setSearch={setSearch}
          infos={infos}
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
