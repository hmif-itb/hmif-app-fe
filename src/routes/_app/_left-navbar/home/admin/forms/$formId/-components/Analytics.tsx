import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useFormAnalytics } from '../-useFormAdminData';

type ComponentProps = {
  formId: string;
};

const COLORS = [
  '#16532e',
  '#22c55e',
  '#84cc16',
  '#eab308',
  '#f97316',
  '#ef4444',
  '#0ea5e9',
  '#8b5cf6',
];

export default function Analytics(props: Readonly<ComponentProps>) {
  const { formId } = props;
  const { data, isLoading } = useFormAnalytics(formId);

  if (isLoading) {
    return (
      <p className="p-4 text-center text-sm text-neutral-darker">
        Memuat analitik...
      </p>
    );
  }

  if (!data || data.questions.length === 0) {
    return (
      <p className="p-4 text-center text-sm text-neutral-darker">
        Belum ada pertanyaan pilihan ganda untuk dianalisis.
      </p>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <p className="text-sm text-neutral-darker">
        Total {data.totalResponses} respon.
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data.questions.map((q) => {
          const chartData = q.options.map((o) => ({
            name: o.value,
            value: o.count,
          }));
          return (
            <div
              key={q.questionId}
              className="flex flex-col gap-2 rounded-xl border border-gray-300 bg-white p-4"
            >
              <p className="break-words text-sm font-semibold">{q.label}</p>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius="45%"
                      outerRadius="70%"
                      paddingAngle={2}
                    >
                      {chartData.map((_, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                      wrapperStyle={{ fontSize: 11 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
