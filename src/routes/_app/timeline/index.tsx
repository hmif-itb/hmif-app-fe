import { createFileRoute, Link } from '@tanstack/react-router';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '~/api/client';
import MegaphoneIcon from '~/assets/icons/timeline/megaphone.svg';
import MobileView from './-components/mobile-view';
import DesktopView from './-components/desktop-view';
// import { Post } from './-interface/IPost';

export const Route = createFileRoute('/_app/timeline/')({
  component: Timeline,
});

function Timeline() {
  const queryClient = useQueryClient();
  const { data: infos } = useQuery({
    // TODO: apply filter
    queryKey: ['info'],
    queryFn: () =>
      api.info.getListInfo({}).then((res) => {
        const infos = res.infos;
        infos.forEach((info) => {
          queryClient.setQueryData(['info', 'detail', info.id], info);
        });
        return infos;
      }),
  });
  if (!infos) {
    // TODO: handle loading or empty
    return <div className="flex-1"></div>;
  }
  return (
    <>
      <MobileView infos={infos} />
      <DesktopView infos={infos} />

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
