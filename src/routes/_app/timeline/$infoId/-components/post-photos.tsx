const PostPhotos = ({ images }: { images: string[] }) => {
  return (
    <div className="mt-5 w-full">
      {images.length === 1 ? (
        <div className="grid grid-cols-1 gap-4">
          <div className="relative border">
            <img
              src={images[0]}
              alt="Post"
              className="size-full rounded-lg object-cover"
            />
          </div>
        </div>
      ) : images.length === 2 ? (
        <div className="flex max-h-96 gap-4 overflow-hidden">
          <div className="relative w-1/2">
            <img
              src={images[0]}
              alt="Post"
              className="size-full rounded-l-lg border object-cover"
            />
          </div>
          <div className="relative w-1/2">
            <img
              src={images[1]}
              alt="Post"
              className="size-full rounded-r-lg border object-cover"
            />
          </div>
        </div>
      ) : images.length === 3 ? (
        <div className="grid grid-cols-2 gap-4 overflow-hidden">
          <img
            src={images[0]}
            alt="Post"
            className="row-span-2 size-full rounded-l-lg border object-cover"
          />
          <img
            src={images[1]}
            alt="Post"
            className="h-96 w-full rounded-tr-lg border object-cover"
          />
          <img
            src={images[2]}
            alt="Post"
            className="h-96 w-full rounded-br-lg border object-cover"
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 overflow-hidden">
          <img
            alt="Post"
            className="h-96 w-full rounded-tl-lg border object-cover"
            src={images[0]}
          />
          <img
            alt="Post"
            className="h-96 w-full rounded-tr-lg border object-cover"
            src={images[1]}
          />
          <img
            alt="Post"
            className="h-96 w-full rounded-bl-lg border object-cover"
            src={images[2]}
          />
          <div className="relative size-full rounded-br-lg border text-center">
            <img
              alt="Post"
              className="h-96 w-full rounded-br-lg border object-cover brightness-50"
              src={images[3]}
            />
            <div className="absolute inset-0 flex items-center justify-center text-lg font-medium text-white">
              {images.length - 3}+
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPhotos;
