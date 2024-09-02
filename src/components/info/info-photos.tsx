import clsx from 'clsx';

export const InfoPhotos = ({
  images,
  onImageClick,
}: {
  images: string[];
  onImageClick: (idx: number) => void;
}) => {
  return (
    <div className="mt-5 w-full">
      {images.length === 1 ? (
        <div className="grid grid-cols-1 gap-4">
          <button onClick={() => onImageClick(0)} className="relative">
            <img
              src={images[0]}
              alt="Post"
              className="size-full max-w-96 rounded-lg border object-cover"
            />
          </button>
        </div>
      ) : images.length === 2 ? (
        <div className="flex max-h-96 gap-4 overflow-hidden">
          <button onClick={() => onImageClick(0)} className="relative w-1/2">
            <img
              src={images[0]}
              alt="Post"
              className="size-full max-w-96 rounded-l-lg border object-cover"
            />
          </button>
          <button onClick={() => onImageClick(1)} className="relative w-1/2">
            <img
              src={images[1]}
              alt="Post"
              className="size-full max-w-96 rounded-r-lg border object-cover"
            />
          </button>
        </div>
      ) : images.length === 3 ? (
        <div className="grid grid-cols-2 gap-4 overflow-hidden">
          <button onClick={() => onImageClick(0)} className="row-span-2">
            <img
              src={images[0]}
              alt="Post"
              className="row-span-2 size-full max-w-96 rounded-l-lg border object-cover"
            />
          </button>
          <button onClick={() => onImageClick(1)}>
            <img
              src={images[1]}
              alt="Post"
              className="h-96 w-full rounded-tr-lg border object-cover"
            />
          </button>
          <button onClick={() => onImageClick(2)}>
            <img
              src={images[2]}
              alt="Post"
              className="h-96 w-full rounded-br-lg border object-cover"
            />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 overflow-hidden">
          <button onClick={() => onImageClick(0)}>
            <img
              alt="Post"
              className="h-96 w-full rounded-tl-lg border object-cover"
              src={images[0]}
            />
          </button>
          <button onClick={() => onImageClick(1)}>
            <img
              alt="Post"
              className="h-96 w-full rounded-tr-lg border object-cover"
              src={images[1]}
            />
          </button>
          <button onClick={() => onImageClick(2)}>
            <img
              alt="Post"
              className="h-96 w-full rounded-bl-lg border object-cover"
              src={images[2]}
            />
          </button>
          <div className="relative w-full rounded-br-lg border text-center">
            <button onClick={() => onImageClick(3)} className="w-full">
              <img
                alt="Post"
                className={clsx(
                  'h-96 w-full rounded-br-lg border object-cover',
                  images.length > 4 && 'brightness-50',
                )}
                src={images[3]}
              />
              {images.length > 4 && (
                <div className="absolute inset-0 flex items-center justify-center text-lg font-medium text-white">
                  {images.length - 3}+
                </div>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
