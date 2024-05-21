import { Link } from '@tanstack/react-router';
import { Post } from '../-interface/IPost';

export default function Feed({ posts }: { posts: Post[] }) {
  return (
    <div>
      {posts.map((post) => (
        <UserPost PostData={post} />
      ))}
    </div>
  );
}

function UserPost({ PostData }: { PostData: Post }) {
  return (
    <div className="my-10">
      <div className="mb-5 text-[14px] font-bold text-neutral-dark">
        ## Day Ago
      </div>
      <ProfileSection ProfileData={PostData.profile} />
      <TextSection textData={PostData.TextData} />
      <ImageSection images={PostData.image} />
      <div className="mt-5 text-[18px] font-bold text-green-300">
        <Link
          to="/timeline/$infoId"
          params={{ infoId: PostData.id.toString() }}
        >
          Show more
        </Link>
      </div>
      <TagSection tags={PostData.TagData} />
    </div>
  );
}

function ProfileSection({ ProfileData }: { ProfileData: Post['profile'] }) {
  return (
    <div className="mb-5 flex items-center gap-5">
      <img
        src={ProfileData.picture}
        alt=""
        className="size-[52px] rounded-full shadow-sm"
      />
      <div className="flex flex-col items-baseline">
        <h1 className="m-0 text-[16px] font-semibold">
          <a href="">{ProfileData.name}</a>
        </h1>
        <span className="text-[12px] font-[400] leading-6 text-neutral-dark-active">
          <a href="">{ProfileData.email}</a>
        </span>
      </div>
    </div>
  );
}

function TextSection({
  textData,
}: {
  textData: {
    title: string;
    content: string;
  };
}) {
  return (
    <div>
      <h1 className="mb-2 text-[20px] font-semibold">{textData.title}</h1>
      <span className="text-[16px]">{textData.content}</span>
    </div>
  );
}

function TagSection({ tags }: { tags: string[] }) {
  return (
    <div className="mt-2 flex flex-wrap gap-3">
      {tags.map((tag) => (
        <a
          href=""
          className="rounded-[80px] bg-neutral-normal px-4 py-1 font-medium hover:bg-neutral-normal-hover"
        >
          {tag}
        </a>
      ))}
    </div>
  );
}

function ImageSection({ images }: { images: Post['image'] }) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-2 lg:grid-cols-3">
      <img
        alt=""
        className="row-span-2  size-full rounded-lg object-cover shadow-md"
        src={images[0]}
      ></img>
      <img
        alt=""
        className="size-full  rounded-lg object-cover shadow-md "
        src={images[1]}
      ></img>
      {images.length <= 3 ? (
        <img
          alt=""
          className="size-full  rounded-lg object-cover shadow-md "
          src={images[2]}
        ></img>
      ) : (
        <div className="relative text-center">
          <img
            alt=""
            className="size-full rounded-lg object-cover shadow-md brightness-50"
            src={images[2]}
          ></img>
          <div className="absolute left-[45%] top-[42%] text-lg font-medium text-white">
            2+
          </div>
        </div>
      )}
    </div>
  );
}
