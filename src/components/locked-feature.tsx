import { Lock } from 'lucide-react';
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
        className="pointer-events-none select-none brightness-95 contrast-[0.9] saturate-[0.15]"
      >
        {children}
      </div>
      {/* Dead-moss tint wash over the disabled content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl bg-[#6B7358]/40 mix-blend-multiply"
      />
      <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl p-4 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#3E4632]/90 px-4 py-2 text-xs font-semibold text-[#EDEFE6] shadow-lg backdrop-blur-sm">
          <Lock className="size-3.5 shrink-0" strokeWidth={2.5} />
          {message}
        </span>
      </div>
    </div>
  );
}

export default LockedFeature;
