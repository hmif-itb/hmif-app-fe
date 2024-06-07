import { Info } from '~/api/generated';
import InfoCreator from '../../-components/info-creator';
import PostCategories from './post-categories';
import PostPhotos from './post-photos';
import PostText from './post-text';

const DetailPost = ({ info }: { info: Info }) => {
  return (
    <div className="flex-col space-y-4">
      <InfoCreator creator={info.creator} />
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
