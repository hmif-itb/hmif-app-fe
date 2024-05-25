import React from 'react';
import { IPost } from '../-interface/IPost';
import PostPhotos from './post-photos';
import PostTags from './post-tags';
import PostText from './post-text';
import ProfilePost from './profile-post';
import { IProfile } from '../-interface/IProfile';

const DetailPost = ({
  images,
  tags,
  profile,
  textData,
}: {
  images: IPost['image'];
  tags: IPost['TagData'];
  profile: IProfile;
  textData: IPost['TextData'];
}) => {
  return (
    <div className="flex-col space-y-4">
      <ProfilePost type="poster" profile={profile} />
      <PostText textData={textData} />
      {images.length > 0 && <PostPhotos images={images} />}
      <PostTags tags={tags} />
    </div>
  );
};

export default DetailPost;
