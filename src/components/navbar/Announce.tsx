import { Button } from '../ui/button';
import MegaphoneIcon from '~/assets/icons/megaphone.svg';
import {
  DialogDescription,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { getRouteApi } from '@tanstack/react-router';
import { AddAnnouncementPage } from '~/routes/_app/add-announcement';

const routeApi = getRouteApi('/_app');

export default function Announce(): JSX.Element {
  const navigate = routeApi.useNavigate();
  const { showAnnounce } = routeApi.useSearch();

  return (
    <div className="mt-4 w-full px-6">
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
          }
        }}
      >
        <DialogTrigger asChild>
          <Button
            variant="solid"
            size="icon-sm"
            className="flex w-full items-center justify-start gap-8 border-2 border-green-300 bg-yellow-75 pl-4 text-base text-green-300"
          >
            <div className="flex size-[2.625rem] items-center justify-center">
              <img src={MegaphoneIcon} className="size-7" alt="" />
            </div>
            <span>Announce</span>
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
