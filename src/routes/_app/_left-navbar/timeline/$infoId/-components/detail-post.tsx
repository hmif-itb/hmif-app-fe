import { Info } from '~/api/generated';
import { InfoPhotosCarousel } from '~/components/info/info-photos-carousel';
import UserInfo from '~/components/user/user-info';
import { getInfoTag } from '~/lib/info';
import { TagSection } from '../../-components/feed';
import PostText from './post-text';

const DetailPost = ({ info }: { info: Info }) => {
  return (
    <div className="flex-col space-y-4">
      <UserInfo
        name={info.creator.fullName}
        email={info.creator.email}
        imageURL={info.creator.picture}
      />
      <PostText infoId={info.id} title={info.title} content={info.content} />
      {info.infoMedias && info.infoMedias.length > 0 && (
        <InfoPhotosCarousel medias={info.infoMedias} />
      )}
      <TagSection tags={getInfoTag(info)} />
    </div>
  );
};

export default DetailPost;
