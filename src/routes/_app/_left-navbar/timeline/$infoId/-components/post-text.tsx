import { useQueries } from '@tanstack/react-query';
import { api } from '~/api/client';
import { extractUrls } from '~/lib/url-parser';
import { renderInfoContent } from '../-helper';
import { IPost } from '../-interface/IPost';

const PostText = ({
  infoId,
  title,
  content,
}: {
  infoId: string;
  title: IPost['title'];
  content: IPost['content'];
}) => {
  const urls = extractUrls(content);

  const { data } = useQueries({
    queries: urls.map((url) => ({
      queryKey: ['openGraph', url],
      queryFn: () =>
        api.openGraph.openGraphScrape({
          url: url.startsWith('http') ? url : `https://${url}`,
        }),
    })),
    combine: (result) => {
      return {
        data: result.map((r) => r.data),
        isFetching: result.some((r) => r.isFetching),
      };
    },
  });

  return (
    <div className="flex-col space-y-2">
      {title && (
        <h1 className="whitespace-pre-line text-xl font-semibold">{title}</h1>
      )}
      <div className="whitespace-pre-line break-words text-base">
        {/* Render text as normal, but if link make it into anchor tag, split it on space and newline */}
        {renderInfoContent(infoId, content, urls)}
      </div>
      <div className="flex flex-col gap-2">
        {data.map((d, idx) => {
          // Check if opengraph data is available
          if (!d) return null;

          return (
            <a key={idx} href={d.ogUrl} target="_blank">
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
};

export default PostText;
