import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="p-2 text-2xl font-bold">
      <h3>Welcome Home!</h3>
    </div>
  );
}
