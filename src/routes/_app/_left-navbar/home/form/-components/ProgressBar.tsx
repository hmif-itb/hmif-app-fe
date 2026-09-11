type ComponentProps = {
  sections: { id: string; title: string }[];
  currentIndex: number;
  onSelect: (index: number) => void;
  completedIndexes: Set<number>;
};

export default function ProgressBar(props: Readonly<ComponentProps>) {
  const { sections, currentIndex, onSelect, completedIndexes } = props;
  const percent =
    sections.length <= 1
      ? 100
      : Math.round((currentIndex / (sections.length - 1)) * 100);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-green-950 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="flex w-full items-center gap-2 overflow-x-auto">
        {sections.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect(idx)}
            className={`min-w-0 flex-1 shrink-0 rounded-full p-2 text-center text-[11px] font-semibold leading-tight ${
              idx === currentIndex
                ? 'bg-green-950 text-white'
                : completedIndexes.has(idx)
                  ? 'bg-green-100 text-green-900'
                  : 'bg-gray-100 text-neutral-darker'
            }`}
          >
            <span className="block truncate break-words">
              {idx + 1}. {s.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
