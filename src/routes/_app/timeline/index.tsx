import { createFileRoute } from '@tanstack/react-router';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '~/api/client';
import MobileView from './-components/mobile-view';
import DesktopView from './-components/desktop-view';

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
    </>
  );
}

// TODO: Mobile view, background drawernya meninggoy
