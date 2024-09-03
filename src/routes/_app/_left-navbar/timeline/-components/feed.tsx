import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { InView } from 'react-intersection-observer';
import { api } from '~/api/client';
import { Info } from '~/api/generated';
import { InfoPhotosCarousel } from '~/components/info/info-photos-carousel';
import UserInfoProfile from '~/components/user/user-info';
import useSession from '~/hooks/auth/useSession';
import { getInfoTag } from '~/lib/info';
import { extractUrls } from '~/lib/url-parser';
import PostInteraction from '../$infoId/-components/post-interaction';
import { renderInfoContent } from '../$infoId/-helper';
import CardPopover from './CardPopover';
import FeedLoader from './FeedLoader';
import Tag from './tag';

type ComponentProps = {
  infos: Info[];
  onInView: () => void;
  isFetching: boolean;
};

const TOAST_ID = 'delete-info-toast-feed';

export default function Feed({ infos, onInView, isFetching }: ComponentProps) {
  return (
    <div className="w-full">
      {!isFetching
        ? infos.map((info, idx) =>
            idx < infos.length - 2 ? (
              <UserInfo key={info.id} info={info} />
            ) : (
              <InView key={info.id} onChange={(inView) => inView && onInView()}>
                <UserInfo info={info} />
              </InView>
            ),
          )
        : [<FeedLoader key={1} />, <FeedLoader key={2} />]}
    </div>
  );
}

function UserInfo({ info }: { info: Info }) {
  const user = useSession();
  const [activeReaction, setActiveReaction] = useState<string | null>(null);

  const toggleReaction = (key: string) => {
    if (activeReaction === key) {
      setActiveReaction(null);
    } else {
      setActiveReaction(key);
    }
  };

  const queryClient = useQueryClient();

  const readInfo = useMutation({
    mutationFn: api.info.readInfo.bind(api.info),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['infos'] });
    },
  });

  const deleteInfo = useMutation({
    mutationFn: api.info.deleteInfo.bind(api.info),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['infos'] });
      toast.success('Info deleted', { id: TOAST_ID });
    },
    onError: () => toast.error('Failed to delete info', { id: TOAST_ID }),
  });

  const handleDeleteInfo = () => {
    toast.loading('Please wait...', { id: TOAST_ID });
    deleteInfo.mutate({ infoId: info.id });
  };

  return (
    <div
      className={clsx(
        'my-3 rounded-xl border border-[#EBEEEB]',
        info.isRead ? 'bg-white' : 'bg-[#F2F4F2]',
      )}
    >
      <div className="p-4">
        <div className="mb-5 text-sm font-bold text-neutral-dark">
          {dayjs(info.createdAt).format('DD MMM YYYY HH:mm')}
        </div>
        <div className="flex items-start justify-between gap-2">
          <UserInfoProfile
            name={info.creator.fullName}
            imageURL={info.creator.picture}
            email={info.creator.email}
            className="mb-5"
            avatarClassName="size-[3.25rem]"
          />

          <CardPopover
            showRead
            onRead={(unread) =>
              readInfo.mutate({ infoId: info.id, requestBody: { unread } })
            }
            isRead={info.isRead}
            showDelete={info.creatorId === user?.id}
            onDelete={
              info.creatorId === user?.id ? handleDeleteInfo : undefined
            }
          />
        </div>
        <TextSection title={info.title} content={info.content} />
        {/* TODO: handle other than image */}
        {info.infoMedias && info.infoMedias.length > 0 && (
          <InfoPhotosCarousel medias={info.infoMedias} />
        )}
        <div className="mt-4 font-bold text-green-300">
          <Link to="/timeline/$infoId" params={{ infoId: info.id }}>
            Show more
          </Link>
        </div>
        <TagSection tags={getInfoTag(info)} />
      </div>
      <div></div>
      <PostInteraction
        reactions={info.reactions}
        commentsCount={info.comments}
        isActive={activeReaction === 'post'}
        toggleReaction={() => toggleReaction('post')}
        infoId={info.id}
      />
    </div>
  );
}

function TextSection({ title, content }: { title: string; content: string }) {
  const urls = extractUrls(content);

  const { data } = useQueries({
    queries: urls.map((url) => ({
      queryKey: ['openGraph', url],
      queryFn: () =>
        api.openGraph.openGraphScrape({
          url: url.startsWith('http') ? url : `https://${url}`,
        }),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 1000 * 60 * 60 * 24,
    })),
    combine: (result) => {
      return {
        data: result.map((r) => r.data),
        isFetching: result.some((r) => r.isFetching),
      };
    },
  });

  return (
    <div>
      {title && (
        <h4 className="mb-2 whitespace-pre-line text-[20px] font-semibold">
          {title}
        </h4>
      )}
      <div className="whitespace-pre-line break-words text-base">
        {/* Render text as normal, but if link make it into anchor tag, split it on space and newline */}
        {renderInfoContent(content, urls)}
      </div>
      <div className="flex flex-col gap-2">
        {data.map((d, idx) => {
          // Check if opengraph data is available
          if (!d) return null;

          return (
            <a key={idx} href={d.requestUrl} target="_blank" rel="noreferrer">
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

export function TagSection({ tags }: { tags: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-3">
      {tags.map((tag, idx) => (
        <Tag key={idx} tag={tag} />
      ))}
    </div>
  );
}
