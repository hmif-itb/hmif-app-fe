import { extractUrls } from '~/lib/url-parser';
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
          const isLink = urls.includes(word);
          return isLink ? (
            <a
              key={idx}
              href={word}
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
    </div>
  );
};

export default PostText;
