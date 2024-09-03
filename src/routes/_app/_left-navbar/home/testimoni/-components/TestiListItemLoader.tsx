import { Skeleton } from '~/components/ui/skeleton';

export default function TestiListItemLoader(): JSX.Element {
  return (
    <Skeleton className="flex w-full items-center gap-4 rounded-xl bg-white px-6 py-5">
      <div className="size-6 shrink-0" />
      <div className="h-4 w-full" />
    </Skeleton>
  );
}
