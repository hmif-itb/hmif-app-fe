import { useMemo, useState } from 'react';
import type { InternshipSubmission } from '~/api/generated';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

export interface DivisionOption {
  id: string;
  name: string;
  departmentId: string;
  departmentName: string;
}

interface Props {
  submissions: InternshipSubmission[];
  divisions: DivisionOption[];
  departments: { id: string; name: string }[];
}

type GroupBy = 'department' | 'division';
type Metric = 'first' | 'all';

interface Row {
  key: string;
  label: string;
  value: number;
}

// Validated categorical palette (dataviz skill reference palette, light mode).
const CATEGORICAL_COLORS = [
  '#2a78d6',
  '#eb6834',
  '#1baf7a',
  '#eda100',
  '#e87ba4',
  '#008300',
  '#4a3aa7',
  '#e34948',
];
const SEQUENTIAL_BLUE = '#2a78d6';
const OTHER_COLOR = '#898781';
const MAX_PIE_SLICES = 7;

export function InternshipStatsCharts({
  submissions,
  divisions,
  departments,
}: Props) {
  const [groupBy, setGroupBy] = useState<GroupBy>('department');
  const [metric, setMetric] = useState<Metric>('first');

  const divisionById = useMemo(
    () => new Map(divisions.map((d) => [d.id, d])),
    [divisions],
  );
  const departmentNameById = useMemo(
    () => new Map(departments.map((d) => [d.id, d.name])),
    [departments],
  );

  const { rows, total } = useMemo(() => {
    const counts = new Map<string, number>();
    let counted = 0;

    for (const sub of submissions) {
      const choices =
        metric === 'first'
          ? (sub.choices ?? []).filter((c) => c.priorityOrder === 1)
          : sub.choices ?? [];

      for (const choice of choices) {
        const division = divisionById.get(choice.divisionId);
        if (!division) continue;
        const key =
          groupBy === 'division' ? division.id : division.departmentId;
        counts.set(key, (counts.get(key) ?? 0) + 1);
        counted += 1;
      }
    }

    const labelFor = (key: string) => {
      if (groupBy === 'division') {
        const d = divisionById.get(key);
        return d ? `${d.departmentName} - ${d.name}` : key;
      }
      return departmentNameById.get(key) ?? key;
    };

    const sorted: Row[] = Array.from(counts.entries())
      .map(([key, value]) => ({ key, label: labelFor(key), value }))
      .sort((a, b) => b.value - a.value);

    return { rows: sorted, total: counted };
  }, [submissions, metric, groupBy, divisionById, departmentNameById]);

  const pieRows = useMemo(() => {
    if (groupBy !== 'department' || rows.length <= MAX_PIE_SLICES) return rows;
    const top = rows.slice(0, MAX_PIE_SLICES);
    const rest = rows
      .slice(MAX_PIE_SLICES)
      .reduce((sum, r) => sum + r.value, 0);
    return [...top, { key: '__other__', label: 'Lainnya', value: rest }];
  }, [rows, groupBy]);

  const colored = useMemo(
    () =>
      pieRows.map((r, i) => ({
        ...r,
        color:
          r.key === '__other__'
            ? OTHER_COLOR
            : CATEGORICAL_COLORS[i % CATEGORICAL_COLORS.length],
      })),
    [pieRows],
  );

  return (
    <div className="rounded-xl border border-gray-300 bg-white p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Statistik Pilihan</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={groupBy}
            onValueChange={(v) => setGroupBy(v as GroupBy)}
          >
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="department">Per Departemen</SelectItem>
              <SelectItem value="division">Per Divisi</SelectItem>
            </SelectContent>
          </Select>

          <Select value={metric} onValueChange={(v) => setMetric(v as Metric)}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="first">Pilihan 1 saja</SelectItem>
              <SelectItem value="all">Semua Pilihan</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {rows.length === 0 || total === 0 ? (
        <p className="py-8 text-center text-sm text-neutral-darker">
          Belum ada data pilihan untuk ditampilkan.
        </p>
      ) : groupBy === 'department' ? (
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <PieChart rows={colored} total={total} />
          <LegendTable rows={colored} total={total} labelHeader="Departemen" />
        </div>
      ) : (
        <RankedBarChart rows={rows} />
      )}
    </div>
  );
}

function PieChart({
  rows,
  total,
  size = 220,
}: {
  rows: (Row & { color: string })[];
  total: number;
  size?: number;
}) {
  const radius = size / 2;
  const cx = radius;
  const cy = radius;

  let cumulative = 0;
  const slices = rows.map((r) => {
    const fraction = r.value / total;
    const startAngle = cumulative * 2 * Math.PI - Math.PI / 2;
    cumulative += fraction;
    const endAngle = cumulative * 2 * Math.PI - Math.PI / 2;
    const largeArc = fraction > 0.5 ? 1 : 0;
    const x1 = cx + radius * Math.cos(startAngle);
    const y1 = cy + radius * Math.sin(startAngle);
    const x2 = cx + radius * Math.cos(endAngle);
    const y2 = cy + radius * Math.sin(endAngle);
    const d =
      fraction >= 1
        ? `M ${cx} ${cy - radius} A ${radius} ${radius} 0 1 1 ${cx - 0.001} ${cy - radius} Z`
        : `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    return { ...r, d, percent: fraction * 100 };
  });

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      role="img"
      aria-label="Diagram lingkaran distribusi pilihan"
      className="shrink-0"
    >
      {slices.map((s) => (
        <path
          key={s.key}
          d={s.d}
          fill={s.color}
          stroke="#ffffff"
          strokeWidth={2}
        >
          <title>{`${s.label}: ${s.value} (${s.percent.toFixed(1)}%)`}</title>
        </path>
      ))}
    </svg>
  );
}

function LegendTable({
  rows,
  total,
  labelHeader,
}: {
  rows: (Row & { color: string })[];
  total: number;
  labelHeader: string;
}) {
  return (
    <table className="w-full max-w-md text-left text-sm">
      <thead className="text-xs text-neutral-darker">
        <tr>
          <th className="pb-2 font-medium">{labelHeader}</th>
          <th className="pb-2 text-right font-medium">Jumlah</th>
          <th className="pb-2 text-right font-medium">%</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.key} className="border-t border-neutral-normal">
            <td className="py-1.5">
              <span className="flex items-center gap-2">
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: r.color }}
                />
                <span className="truncate">{r.label}</span>
              </span>
            </td>
            <td className="py-1.5 text-right tabular-nums">{r.value}</td>
            <td className="py-1.5 text-right tabular-nums">
              {((r.value / total) * 100).toFixed(1)}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function RankedBarChart({ rows }: { rows: Row[] }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <div className="flex max-h-96 flex-col gap-2 overflow-y-auto pr-1">
      {rows.map((r) => (
        <div key={r.key} className="flex items-center gap-3">
          <div
            className="w-48 shrink-0 truncate text-xs text-neutral-darker"
            title={r.label}
          >
            {r.label}
          </div>
          <div className="h-4 flex-1 rounded-full bg-neutral-normal">
            <div
              className="h-4 rounded-r-full"
              style={{
                width: `${(r.value / max) * 100}%`,
                backgroundColor: SEQUENTIAL_BLUE,
              }}
            />
          </div>
          <div className="w-8 shrink-0 text-right text-xs font-medium tabular-nums">
            {r.value}
          </div>
        </div>
      ))}
    </div>
  );
}
