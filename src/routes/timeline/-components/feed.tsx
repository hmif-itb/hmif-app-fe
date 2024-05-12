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
      <div className="font-bold text-neutral-dark text-[14px] mb-5">
        ## Day Ago
      </div>
      <ProfileSection ProfileData={PostData.profile} />
      <TextSection textData={PostData.TextData} />
      <ImageSection images={PostData.image} />
      <div className="mt-5 font-bold text-green-300 text-[18px]">
        <a href="">Show more</a>
      </div>
      <TagSection tags={PostData.TagData} />
    </div>
  );
}

function ProfileSection({ ProfileData }: { ProfileData: Post['profile'] }) {
  return (
    <div className="flex items-center gap-5 mb-5">
      <img
        src={ProfileData.picture}
        alt=""
        className="size-[52px] rounded-full shadow-sm"
      />
      <div className="flex flex-col items-baseline">
        <h1 className="font-semibold text-[16px] m-0">
          <a href="">{ProfileData.name}</a>
        </h1>
        <span className="text-neutral-dark-active text-[12px] font-[400] leading-6">
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
      <h1 className="font-semibold text-[20px] mb-2">{textData.title}</h1>
      <span className="text-[16px]">{textData.content}</span>
    </div>
  );
}

function TagSection({ tags }: { tags: string[] }) {
  return (
    <div className="mt-2 flex gap-3">
      {tags.map((tag) => (
        <a
          href=""
          className="px-4 py-1 bg-neutral-normal rounded-[80px] font-medium hover:bg-neutral-normal-hover"
        >
          {tag}
        </a>
      ))}
    </div>
  );
}

function ImageSection({ images }: { images: Post['image'] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mt-5">
      <img
        alt=""
        className="size-full  object-cover rounded-lg shadow-md row-span-2"
        src={images[0]}
      ></img>
      <img
        alt=""
        className="size-full  object-cover rounded-lg shadow-md "
        src={images[1]}
      ></img>
      {images.length <= 3 ? (
        <img
          alt=""
          className="size-full  object-cover rounded-lg shadow-md "
          src={images[2]}
        ></img>
      ) : (
        <div className="relative text-center">
          <img
            alt=""
            className="size-full object-cover rounded-lg shadow-md brightness-50"
            src={images[2]}
          ></img>
          <div className="absolute top-[42%] left-[45%] text-white font-medium text-lg">
            2+
          </div>
        </div>
      )}
    </div>
  );
}
