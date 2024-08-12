function SidebarEventLabel({
  title,
  time,
  color,
}: {
  title: string;
  time: string;
  color: string;
}) {
  const colorClassMap: { [key: string]: string } = {
    red: 'text-red-500',
    orange: 'text-orange-500',
    amber: 'text-amber-500',
    green: 'text-green-500',
    blue: 'text-blue-500',
    indigo: 'text-indigo-500',
    purple: 'text-purple-500',
    slate: 'text-slate-500',
  };

  const textColorClass = colorClassMap[color] || 'text-black';

  const containerClassNames = `flex-1 truncate font-semibold ${textColorClass}`;

  return (
    <div className="flex w-[250px] flex-row items-center py-0.5 text-xs">
      <div className={containerClassNames}>● {title}</div>
      <div className="font-semibold">{time}</div>
    </div>
  );
}

export default SidebarEventLabel;
