import { Link } from '@tanstack/react-router';
import { Info } from '~/api/generated';
import InfoCreator from './info-creator';

export default function Feed({ infos }: { infos: Info[] }) {
  return (
    <div className="mx-5">
      {infos.map((info) => (
        <UserInfo key={info.id} info={info} />
      ))}
    </div>
  );
}

function UserInfo({ info }: { info: Info }) {
  return (
    <div className="my-10">
      <div className="mb-5 text-sm font-bold text-neutral-dark">## Day Ago</div>
      <InfoCreator creator={info.creator} className="mb-5" />
      <TextSection title={info.title} content={info.content} />
      {/* TODO: handle other than image */}
      <ImageSection images={info.infoMedias?.map((im) => im.media.url) ?? []} />
      <div className="mt-5 text-lg font-bold text-green-300">
        <Link to="/timeline/$infoId" params={{ infoId: info.id }}>
          Show more
        </Link>
      </div>
      <TagSection
        tags={info.infoCategories?.map((ic) => ic.category.name) ?? []}
      />
    </div>
  );
}

function TextSection({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h1 className="mb-2 text-[20px] font-semibold">{title}</h1>
      <div
        className="text-base"
        dangerouslySetInnerHTML={{ __html: content }}
      />
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

function ImageSection({ images }: { images: string[] }) {
  if (images.length === 0) return null;
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
