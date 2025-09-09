import { useState } from 'react';

interface SwitchToggleProps {
  options: [string, string];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function SwitchToggle({
  options,
  defaultValue,
  onValueChange,
  className,
}: SwitchToggleProps) {
  const [activeOption, setActiveOption] = useState(defaultValue || options[0]);

  const handleToggle = (option: string) => {
    setActiveOption(option);
    onValueChange?.(option);
  };

  return (
    <div
      className={cn(
        'relative flex w-full items-center rounded-full border border-[#FDFDFD] bg-transparent',
        className,
      )}
    >
      <div
        className={cn(
          'absolute bottom-0 top-0 rounded-full bg-[#FDFDFD] shadow-sm transition-all duration-300 ease-in-out',
          activeOption === options[0] ? 'left-0 w-1/2' : 'left-1/2 w-1/2',
        )}
      />
      {options.map((option) => (
        <button
          key={option}
          onClick={() => handleToggle(option)}
          className={cn(
            'relative z-10 flex-1 rounded-full px-6 py-2 text-center text-sm font-medium transition-all duration-300 ease-in-out',
            activeOption === option
              ? 'text-black'
              : 'text-[#FDFDFD] hover:opacity-80',
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
