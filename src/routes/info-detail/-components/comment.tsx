import ProfilePost from './profile-post';

function Comment() {
  return (
    <div className="flex-row space-y-3">
      <ProfilePost type={'commenter'}></ProfilePost>
      <p>Woww, congrats zeuss!!!</p>
      <div className="flex space-x-2 items-center">
        <button>
          <img src="../../../public/icons/like.svg"></img>
        </button>
        <div className="text-xs font-semibold text-gray-400">5 mins ago</div>
      </div>
    </div>
  );
}

export default Comment;
