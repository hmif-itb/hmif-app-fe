import { ReactNode } from 'react';
import { cn } from '~/lib/utils';

function LockedFeature({
  locked,
  children,
  className,
  message = 'Fokus isi pilihan magang SPARTA dulu, ya!',
}: {
  locked: boolean;
  children: ReactNode;
  className?: string;
  message?: string;
}) {
  if (!locked) return <>{children}</>;

  return (
    <div className={cn('relative', className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none opacity-50 brightness-90 grayscale-[90%]"
      >
        {children}
      </div>
      <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-black/10 p-4 text-center">
        <span className="rounded-full bg-black/70 px-4 py-2 text-xs font-semibold text-white shadow-lg">
          {message}
        </span>
      </div>
    </div>
  );
}

export default LockedFeature;
