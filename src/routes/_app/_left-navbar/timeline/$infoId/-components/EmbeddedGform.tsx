import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog';
import ExpandIcon from '~/assets/icons/timeline/expand.svg';

type ComponentProps = {
  url: string;
};

export default function EmbeddedGform(props: Readonly<ComponentProps>) {
  const { url } = props;

  return (
    <div className="relative w-full md:w-[48%]">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="icon-sm"
            className="absolute left-2 top-2 size-10 bg-white shadow-lg hover:bg-purple-50"
          >
            <img src={ExpandIcon} className="size-7" alt="expand" />
          </Button>
        </DialogTrigger>

        <DialogContent className="h-[90vh] w-[90vw] max-w-none rounded-xl p-0">
          <iframe className="rounded-xl" src={url} width="100%" height="100%">
            Loading…
          </iframe>
        </DialogContent>
      </Dialog>

      <iframe className="rounded-xl" src={url} width="100%" height="240">
        Loading…
      </iframe>
    </div>
  );
}
