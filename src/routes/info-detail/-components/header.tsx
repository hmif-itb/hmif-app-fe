function Header() {
  return (
    // <div className="flex p-5">
    //   <div>Back</div>
    //   <div>Post</div>
    // </div>
    <header className="flex justify-between items-center p-4 text-white border-b border-gray-300">
      <button className="flex items-center px-3 py-1 text-{black} rounded">
        <img src="/icons/back.svg" />
      </button>
      <h1 className="flex-auto text-xl text-center text-black font-bold pr-9">
        Post
      </h1>
    </header>
  );
}

export default Header;
