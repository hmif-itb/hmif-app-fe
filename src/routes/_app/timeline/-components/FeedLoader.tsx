export default function FeedLoader(): JSX.Element {
  return (
    <div className="my-10 w-full">
      <div className="h-3 w-20 animate-pulse rounded-full bg-slate-600" />

      <div className="my-5 flex w-full items-center gap-3">
        <div className="size-12 animate-pulse rounded-full bg-slate-600" />
        <div className="flex flex-col gap-2">
          <div className="h-5 w-40 animate-pulse rounded-full bg-slate-600" />
          <div className="h-2 w-40 animate-pulse rounded-full bg-slate-600" />
        </div>
      </div>

      <div className="h-5 w-44 animate-pulse rounded-full bg-slate-600" />
      <div className="mt-3 h-3 w-64 animate-pulse rounded-full bg-slate-600" />
      <div className="mt-1.5 h-3 w-56 animate-pulse rounded-full bg-slate-600" />

      <div className="mt-4 flex gap-3">
        <div className="h-5 w-20 animate-pulse rounded-full bg-slate-600" />
        <div className="h-5 w-20 animate-pulse rounded-full bg-slate-600" />
      </div>
    </div>
  );
}
