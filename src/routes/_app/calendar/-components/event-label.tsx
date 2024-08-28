function EventLabel({
  title,
  time,
  color,
}: {
  title: string;
  time: string;
  color: string;
}) {
  const containerClassNames =
    'flex flex-row bg-' +
    color +
    '-200 text-' +
    color +
    '-500 border border-' +
    color +
    '-500 items-center rounded px-1 py-0.5 text-xs';

  return (
    <div className={containerClassNames}>
      <img src="/img/icons/Bell.svg" alt="Bell" className="size-4" />
      <div className="flex-1 truncate font-semibold">{title}</div>
      <div className="font-medium">{time}</div>
    </div>
  );
}

export default EventLabel;
