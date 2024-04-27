import { createFileRoute } from '@tanstack/react-router';
import { setupNotification } from '~/lib/push';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="">
      <h3 className="p-2 text-2xl font-bold">Welcome Home!</h3>
      <div className="flex flex-col items-start space-y-2">
        <button onClick={setupNotification} className="rounded bg-blue-400 p-2">
          Subscribe to push notif
        </button>
        <a className="rounded bg-blue-400 p-2" href="/sparta">
          SPARTA
        </a>
      </div>
    </div>
  );
}
