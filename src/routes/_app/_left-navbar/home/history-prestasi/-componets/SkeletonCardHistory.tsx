import React from 'react';

const SkeletonCardHistory: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div
      className={
        'flex animate-pulse items-center justify-center gap-4 rounded-lg bg-white p-4 lg:relative ' +
        className
      }
    >
      {/* Image skeleton */}
      <div className="h-28 w-1/3 rounded-md bg-gray-200 lg:h-40 lg:w-full" />

      {/* Text skeletons */}
      <div className="flex w-full flex-col gap-2 text-sm lg:gap-3">
        {/* Name */}
        <div className="h-4 w-2/3 rounded bg-gray-200" />

        {/* Tags */}
        <div className="flex justify-between gap-2">
          <div className="h-5 w-16 rounded-full bg-gray-200" />
          <div className="h-5 w-24 rounded-full bg-gray-200" />
        </div>

        {/* Description */}
        <div className="h-4 w-full rounded bg-gray-200 lg:mb-6" />
        <div className="h-4 w-3/4 rounded bg-gray-200" />

        {/* Date */}
        <div className="self-end pt-2 lg:absolute lg:bottom-2 lg:self-start">
          <div className="h-3 w-16 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCardHistory;
