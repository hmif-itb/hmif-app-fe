import { IPost } from '../-interface/IPost';

const PostPhotos = ({ images }: { images: IPost['image'] }) => {
  return images.length === 1 ? (
    <div className="grid grid-cols-1 gap-4">
      <div className="relative" style={{ paddingBottom: '100%' }}>
        <img
          src={images[0]}
          alt="Post"
          className="absolute inset-0 size-full object-cover rounded-lg"
        />
      </div>
    </div>
  ) : images.length === 2 ? (
    <div
      className="flex gap-2 rounded-lg overflow-hidden"
      style={{ height: '75vw' }}
    >
      <div className="relative w-1/2 h-full">
        <img
          src={images[0]}
          alt="Post"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
      <div className="relative w-1/2 h-full">
        <img
          src={images[1]}
          alt="Post"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    </div>
  ) : (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mt-5 rounded-lg overflow-hidden">
      <img
        alt="Post"
        className="size-full object-cover shadow-md row-span-2"
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
          <div className="absolute top-[42%] left-[45%] text-white font-medium text-lg">
            {images.length - 2}+
          </div>
        </div>
      )}
    </div>
  );
};

// <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
//   <div className="relative col-span-1" style={{ paddingBottom: '50%' }}>
//     <img
//       src="android-chrome-192x192.png"
//       alt="Post"
//       className="absolute inset-0 size-full object-cover"
//     />
//   </div>
//   <div className="relative col-span-1 grid grid-cols-1 gap-2">
//     <div className="relative" style={{ paddingBottom: '100%' }}>
//       <img
//         src="android-chrome-192x192.png"
//         alt="Post"
//         className="absolute inset-0 size-full object-cover"
//       />
//     </div>
//     <div className="relative" style={{ paddingBottom: '100%' }}>
//       <img
//         src="android-chrome-192x192.png"
//         alt="Post"
//         className="absolute inset-0 size-full object-cover"
//       />
//     </div>
//   </div>
// </div>

// <div className="grid grid-cols-1 gap-4">
//   <div className="relative" style={{ paddingBottom: '100%' }}>
//     <img
//       src="android-chrome-192x192.png"
//       alt="Post"
//       className="absolute inset-0 size-full object-cover rounded-lg"
//     />
//   </div>
//   {/* Add more images as needed */}
// </div>
// }

export default PostPhotos;
