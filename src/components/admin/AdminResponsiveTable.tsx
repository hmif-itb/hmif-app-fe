import { ReactNode } from 'react';
import { cn } from '~/lib/utils';

export type AdminTableColumn<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
};

type ComponentProps<T> = {
  columns: AdminTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  emptyMessage?: string;
  isLoading?: boolean;
};

/**
 * Renders as a normal table on lg+ screens, and as stacked cards on mobile —
 * avoids the horizontal-scroll-forever problem raw <table>s have on narrow
 * viewports.
 */
export default function AdminResponsiveTable<T>(
  props: Readonly<ComponentProps<T>>,
) {
  const { columns, rows, rowKey, emptyMessage, isLoading } = props;

  return (
    <div className="w-full">
      <div className="hidden overflow-x-auto rounded-xl border border-gray-300 lg:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((c) => (
                <th key={c.key} className="p-3">
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={rowKey(row)} className="border-t border-gray-200">
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={cn('break-words p-3', c.className)}
                  >
                    {c.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {!isLoading && rows.length === 0 && (
          <p className="p-4 text-center text-sm text-neutral-darker">
            {emptyMessage ?? 'Belum ada data.'}
          </p>
        )}
        {isLoading && (
          <p className="p-4 text-center text-sm text-neutral-darker">
            Memuat data...
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 lg:hidden">
        {rows.map((row) => (
          <div
            key={rowKey(row)}
            className="flex flex-col gap-2 rounded-xl border border-gray-300 bg-white p-4"
          >
            {columns.map((c) => (
              <div
                key={c.key}
                className="flex items-start justify-between gap-3 text-sm"
              >
                <span className="shrink-0 font-medium text-neutral-darker">
                  {c.header}
                </span>
                <span className="break-words text-right">{c.render(row)}</span>
              </div>
            ))}
          </div>
        ))}
        {!isLoading && rows.length === 0 && (
          <p className="p-4 text-center text-sm text-neutral-darker">
            {emptyMessage ?? 'Belum ada data.'}
          </p>
        )}
        {isLoading && (
          <p className="p-4 text-center text-sm text-neutral-darker">
            Memuat data...
          </p>
        )}
      </div>
    </div>
  );
}
