export default function TestiListItemLoader(): JSX.Element {
  return (
    <div className="flex w-full items-center gap-4 rounded-xl bg-white px-6 py-5">
      <div className="size-6 shrink-0 animate-pulse rounded bg-slate-500" />
      <div className="h-4 w-full animate-pulse rounded-full bg-slate-500" />
    </div>
  );
}
