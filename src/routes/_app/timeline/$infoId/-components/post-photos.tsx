import { IPost } from '../-interface/IPost';

const PostPhotos = ({ images }: { images: IPost['image'] }) => {
  return images.length === 1 ? (
    <div className="grid grid-cols-1 gap-4">
      <div className="relative" style={{ paddingBottom: '100%' }}>
        <img
          src={images[0]}
          alt="Post"
          className="absolute inset-0 size-full rounded-lg object-cover"
        />
      </div>
    </div>
  ) : images.length === 2 ? (
    <div
      className="flex gap-2 overflow-hidden rounded-lg"
      style={{ height: '75vw' }}
    >
      <div className="relative h-full w-1/2">
        <img
          src={images[0]}
          alt="Post"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
      <div className="relative h-full w-1/2">
        <img
          src={images[1]}
          alt="Post"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    </div>
  ) : (
    <div className="mt-5 grid grid-cols-2 gap-2 overflow-hidden rounded-lg lg:grid-cols-3">
      <img
        alt="Post"
        className="row-span-2 size-full object-cover shadow-md"
        src={images[0]}
      />
      <img
        alt="Post"
        className="size-full object-cover shadow-md"
        src={images[1]}
      />
      {images.length <= 3 ? (
        <img
          alt="Post"
          className="size-full object-cover shadow-md"
          src={images[2]}
        />
      ) : (
        <div className="relative text-center">
          <img
            alt="Post"
            className="size-full object-cover shadow-md brightness-50"
            src={images[2]}
          />
          <div className="absolute left-[45%] top-[42%] text-lg font-medium text-white">
            {images.length - 2}+
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPhotos;
