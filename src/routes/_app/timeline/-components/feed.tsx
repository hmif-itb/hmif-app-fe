import { Link } from '@tanstack/react-router';
import { Info } from '~/api/generated';
import UserInfoProfile from '~/components/user/user-info';
import Tag from './tag';
import { InView } from 'react-intersection-observer';
import { extractUrls, removePunctuation } from '~/lib/url-parser';
import { useQueries } from '@tanstack/react-query';
import { api } from '~/api/client';

type ComponentProps = {
  infos: Info[];
  onInView: () => void;
};

export default function Feed({ infos, onInView }: ComponentProps) {
  return (
    <div className="w-full">
      {infos.map((info, idx) =>
        idx < infos.length - 2 ? (
          <UserInfo key={info.id} info={info} />
        ) : (
          <InView key={info.id} onChange={(inView) => inView && onInView()}>
            <UserInfo info={info} />
          </InView>
        ),
      )}
    </div>
  );
}

function UserInfo({ info }: { info: Info }) {
  return (
    <div className="my-10">
      <div className="mb-5 text-sm font-bold text-neutral-dark">## Day Ago</div>
      <UserInfoProfile
        name={info.creator.fullName}
        imageURL={info.creator.picture}
        email={info.creator.email}
        className="mb-5"
        avatarClassName="size-[3.25rem]"
      />
      <TextSection title={info.title} content={info.content} />
      {/* TODO: handle other than image */}
      <ImageSection images={info.infoMedias?.map((im) => im.media.url) ?? []} />
      <div className="mt-4 font-bold text-green-300">
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
  const urls = extractUrls(content);

  const { data, isFetching } = useQueries({
    queries: urls.map((url) => ({
      queryKey: ['openGraph', url],
      queryFn: () => api.openGraph.openGraphScrape({ url }),
    })),
    combine: (result) => {
      return {
        data: result.map((r) => r.data),
        isFetching: result.some((r) => r.isFetching),
      };
    },
  });

  if (isFetching) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="mb-2 text-[20px] font-semibold">{title}</h1>
      <div className="text-base">
        {/* Render text as normal, but if link make it into anchor tag, split it on space and newline */}
        {content.split(/[\s\n]/).map((word, idx) => {
          const cleanedWord = removePunctuation(word);
          const isLink = urls.includes(cleanedWord);
          return isLink ? (
            <a
              key={idx}
              href={cleanedWord}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400"
            >
              {word}
            </a>
          ) : (
            <span key={idx}>{word} </span>
          );
        })}
      </div>
      <div className="flex flex-col gap-2">
        {data.map((d, idx) => {
          // Check if opengraph data is available
          if (!d) return null;

          return (
            <a key={idx} href={d.ogUrl}>
              {/* Check if url have opengraph image */}
              {d.ogImage && d.ogImage.length > 0 ? (
                <div className="flex items-center gap-4">
                  <img
                    alt={d.ogImage[0].alt}
                    src={d.ogImage[0].url}
                    className="size-16 object-cover shadow-md"
                  />
                  <div>
                    <div className="line-clamp-1 font-bold">{d.ogTitle}</div>
                    <div className="line-clamp-1 text-xs">
                      {d.ogDescription}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-10 items-center gap-2">
                  <div className="h-full w-2 bg-green-400"></div>
                  <div>
                    <div className="line-clamp-1 font-bold">{d.ogTitle}</div>
                    <div className="line-clamp-1 text-xs">
                      {d.ogDescription}
                    </div>
                  </div>
                </div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}

function TagSection({ tags }: { tags: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-3">
      {tags.map((tag, idx) => (
        <Tag key={idx} tag={tag} />
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
