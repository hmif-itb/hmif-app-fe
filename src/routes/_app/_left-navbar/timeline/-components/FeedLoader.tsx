import { Skeleton } from '~/components/ui/skeleton';

export default function FeedLoader(): JSX.Element {
  return (
    <div className="my-10 w-full">
      <Skeleton className="h-3 w-20" />

      <div className="my-5 flex w-full items-center gap-3">
        <Skeleton className="size-12" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-2 w-40" />
        </div>
      </div>

      <Skeleton className="h-5 w-44" />
      <Skeleton className="mt-3 h-3 w-64" />
      <Skeleton className="mt-1.5 h-3 w-56" />

      <div className="mt-4 flex gap-3">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
      </div>
    </div>
  );
}
