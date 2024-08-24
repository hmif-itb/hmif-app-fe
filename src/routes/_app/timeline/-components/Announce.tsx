import { getRouteApi } from '@tanstack/react-router';
import MegaphoneIcon from '~/assets/icons/megaphone-fill.svg';
import { deleteSharedData } from '~/lib/share-db';
import { AddAnnouncementPage } from '~/routes/_app/add-announcement';
import { Button } from '../../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../../../../components/ui/dialog';

const routeApi = getRouteApi('/_app');

export default function Announce(): JSX.Element {
  const navigate = routeApi.useNavigate();
  const { showAnnounce } = routeApi.useSearch();

  return (
    <div className="fixed bottom-16 right-[28vw]">
      <Dialog
        open={showAnnounce ?? false}
        onOpenChange={(open) => {
          if (open) {
            navigate({
              search: (prev) => ({
                ...prev,
                showAnnounce: true,
              }),
            });
          } else {
            navigate({
              search: (prev) => ({
                ...prev,
                showAnnounce: undefined,
              }),
            });
            deleteSharedData();
          }
        }}
      >
        <DialogTrigger asChild>
          <Button
            variant="solid"
            size="icon-sm"
            className="z-[200] size-[70px] bg-green-200 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
          >
            <img src={MegaphoneIcon} className="size-8" alt="" />
          </Button>
        </DialogTrigger>

        <DialogContent
          hideCloseButton
          className="w-[62vw] max-w-none overflow-hidden !rounded-3xl p-0"
        >
          <AddAnnouncementPage isDesktop />
        </DialogContent>
      </Dialog>
    </div>
  );
}
