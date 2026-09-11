import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '~/components/ui/button';

type ComponentProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination(props: Readonly<ComponentProps>) {
  const { page, totalPages, onPageChange } = props;
  const safeTotalPages = Math.max(1, totalPages);

  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        type="button"
        variant="outlined"
        size="icon-sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft className="size-4" />
      </Button>
      <span className="text-sm text-neutral-darker">
        Halaman {page} dari {safeTotalPages}
      </span>
      <Button
        type="button"
        variant="outlined"
        size="icon-sm"
        disabled={page >= safeTotalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
