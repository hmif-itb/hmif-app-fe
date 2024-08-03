function EventLabel({
  title,
  time,
  color,
}: {
  title: string;
  time: string;
  color: string;
}) {
  const bgColor = color + '-200';
  const textColor = color + '-800';

  const containerClassNames = `flex flex-row bg-${bgColor} text-${textColor} border-1 border-${textColor} items-center rounded px-1 py-0.5 text-xs`;

  return (
    <div className={containerClassNames}>
      <img src="/img/icons/Bell.svg" alt="Bell" className="size-4" />
      <div className="flex-1 truncate font-semibold">{title}</div>
      <div className="font-medium">{time}</div>
    </div>
  );
}

export default EventLabel;
