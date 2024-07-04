import { extractUrls, removePunctuation } from '~/lib/url-parser';
import { IPost } from '../-interface/IPost';
import { useQueries } from '@tanstack/react-query';
import { api } from '~/api/client';

const PostText = ({
  title,
  content,
}: {
  title: IPost['title'];
  content: IPost['content'];
}) => {
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

  if (data.length > 0) console.log(data);

  return (
    <div className="flex-col space-y-2">
      <p className="text-xl font-semibold">{title}</p>
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
            <>{word} </>
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
};

export default PostText;
