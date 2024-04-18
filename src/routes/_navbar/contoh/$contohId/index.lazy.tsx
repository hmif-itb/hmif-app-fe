import { createFileRoute } from '@tanstack/react-router';
import useContohDetail from './-hooks/useContohDetail';
import IniComponent from './-components/IniComponent';

export const Route = createFileRoute('/_navbar/contoh/$contohId/')({
  component: ContohDetailPage,
});

function ContohDetailPage() {
  const { contohId } = useContohDetail();

  return (
    <main className="px-8 py-4">
      <p>Contoh ID: {contohId}</p>
      <IniComponent />
    </main>
  );
}
