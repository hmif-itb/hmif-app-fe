function ProfilePost({ type }) {
  return (
    // <div className="flex">
    //   <img src="../../../public/favicon-32x32.png"></img>
    //   <div>
    //     <p>name</p>
    //     <p>email</p>
    //   </div>
    // </div>
    <div className="flex items-center">
      <div className="relative">
        <img
          src="../../../public/favicon-32x32.png"
          alt="Avatar"
          // className="size-12 rounded-full"
          className={`rounded-full ${type == 'poster' ? 'size-12' : 'size-9'}`}
        />
      </div>
      <div className="ml-3">
        <p className="text-base font-semibold leading-6">HMIF</p>
        <p className="text-xs text-neutral-dark">13521xxx@std.stei.itb.ac.id</p>
      </div>
    </div>
  );
}

export default ProfilePost;
