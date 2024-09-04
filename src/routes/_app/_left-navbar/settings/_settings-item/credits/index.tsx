import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import Markdown from 'markdown-to-jsx';
import { api } from '~/api/client';

export const Route = createFileRoute(
  '/_app/_left-navbar/settings/_settings-item/credits/',
)({
  component: CreditsPage,
});

function CreditsPage() {
  const { data: credits } = useQuery({
    queryKey: ['credits'],
    queryFn: () => api.markdown.getCredits(),
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  if (!credits) return null;
  return (
    <div className="prose prose-sm prose-invert prose-p:my-0 prose-p:text-white prose-h4:mt-2 relative text-center">
      <Markdown>{credits.content}</Markdown>
    </div>
  );
}
