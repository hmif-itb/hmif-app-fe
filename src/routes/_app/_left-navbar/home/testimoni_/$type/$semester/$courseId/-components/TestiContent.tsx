import { extractUrls } from '~/lib/url-parser';
import { renderInfoContent } from '~/routes/_app/_left-navbar/timeline/$infoId/-helper';

type ComponentProps = {
  title: string;
  content: string;
};

export default function TestiContent({
  title,
  content,
}: ComponentProps): JSX.Element {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="whitespace-pre-line text-sm font-bold">{title}</h2>
      <p className="whitespace-pre-line break-words text-sm">
        {renderInfoContent(content, extractUrls(content))}
      </p>
    </div>
  );
}
