import PostPhotos from './post-photos';
import PostTags from './post-tags';
import PostText from './post-text';
import ProfilePost from './profile-post';

function DetailPost() {
  return (
    <div className="flex-col space-y-4">
      <ProfilePost type={'poster'}></ProfilePost>
      <PostText></PostText>
      <PostPhotos></PostPhotos>
      <PostTags></PostTags>
    </div>
  );
}

export default DetailPost;
