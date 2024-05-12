function PostInteraction() {
  return (
    <div className="flex space-x-3 p-2 border-y border-gray-300">
      <button>
        <img src="../../../public/icons/like.svg"></img>
      </button>
      <div className="flex space-x-1">
        <button>
          <img src="../../../public/icons/comment.svg"></img>
        </button>
        <p className="text-xl text-neutral-dark-hover">18</p>
      </div>
    </div>
  );
}

export default PostInteraction;
