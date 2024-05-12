function PostPhotos() {
  return (
    <div className="grid grid-cols-2 gap-4 rounded-lg overflow-hidden">
      <div className="relative col-span-1" style={{ paddingBottom: '50%' }}>
        <img
          src="../../../public/android-chrome-192x192.png"
          alt="Post"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
      <div className="relative col-span-1 grid grid-cols-1 gap-4">
        <div className="relative" style={{ paddingBottom: '100%' }}>
          <img
            src="../../../public/android-chrome-192x192.png"
            alt="Post"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
        <div className="relative" style={{ paddingBottom: '100%' }}>
          <img
            src="../../../public/android-chrome-192x192.png"
            alt="Post"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
    // <div className="grid grid-cols-1 gap-4">
    //   <div className="relative" style={{ paddingBottom: '100%' }}>
    //     <img
    //       src="../../../public/android-chrome-192x192.png"
    //       alt="Post"
    //       className="absolute inset-0 size-full object-cover rounded-lg"
    //     />
    //   </div>
    //   {/* Add more images as needed */}
    // </div>
  );
}

export default PostPhotos;
