import { Info } from '~/api/generated';
import PostCategories from './post-categories';
import PostPhotos from './post-photos';
import PostText from './post-text';
import ProfilePost from './profile-post';

const DetailPost = ({ info }: { info: Info }) => {
  return (
    <div className="flex-col space-y-4">
      <ProfilePost type="poster" profile={info.creator} />
      <PostText title={info.title} content={info.content} />
      {info.infoMedias && info.infoMedias.length > 0 && (
        <PostPhotos images={info.infoMedias.map((media) => media.media.url)} />
      )}
      <PostCategories
        tags={info.infoCategories?.map((ic) => ic.category.name) || []}
      />
    </div>
  );
};

export default DetailPost;
