import { createLazyFileRoute } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import usePendaftaran from './-hooks/useContoh';

export const Route = createLazyFileRoute('/_navbar/contoh/')({
  component: ContohPage,
});

function ContohPage() {
  const { count, setCount } = usePendaftaran();

  return (
    <main className="px-8 py-4">
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
      <p>Count: {count}</p>
    </main>
  );
}
