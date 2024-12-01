import { Button } from '~/components/ui/button';
import useSession from '~/hooks/auth/useSession';

interface HeaderProps {
  title: string;
  creatorId: string;
}

export function Header({ title, creatorId }: HeaderProps) {
  const user = useSession();
  const isCreator = user?.id === creatorId;

  return (
    <div className="flex w-full items-center justify-between">
      <h1 className="text-left text-4xl font-bold text-white lg:text-5xl">
        {title}
      </h1>
      {isCreator && (
        <Button
          variant="link"
          className="rounded-full bg-[#FF8787] p-2 hover:bg-[#ff9a9a]"
        >
          <img
            src="/img/rekomendasi/trash.svg"
            alt="Trash"
            className="size-6"
          />
        </Button>
      )}
    </div>
  );
}
