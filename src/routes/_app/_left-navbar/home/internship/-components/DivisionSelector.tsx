import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { InternshipDepartment, InternshipDivision } from '~/api/generated';
import { Button } from '~/components/ui/button';
import { MAX_DIVISION_CHOICES, InternshipFormValues } from '../-constants';

type ComponentProps = {
  form: UseFormReturn<InternshipFormValues>;
  departments: InternshipDepartment[];
  disabled?: boolean;
};

export default function DivisionSelector(props: Readonly<ComponentProps>) {
  const { form, departments, disabled } = props;

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: 'choices',
  });

  const selectedIds = fields.map((f) => f.divisionId);

  const handleAdd = (division: InternshipDivision) => {
    if (fields.length >= MAX_DIVISION_CHOICES) return;
    append({
      divisionId: division.id,
      priorityOrder: fields.length + 1,
      answers: (division.questions ?? []).map((q) => ({
        questionId: q.id,
        answer: '',
      })),
    });
  };

  const handleRemove = (idx: number) => {
    remove(idx);
    fields
      .filter((_, i) => i !== idx)
      .forEach((_, i) => {
        form.setValue(`choices.${i}.priorityOrder`, i + 1);
      });
  };

  const handleMove = (idx: number, direction: -1 | 1) => {
    const target = idx + direction;
    if (target < 0 || target >= fields.length) return;
    move(idx, target);
    const reordered = [...fields];
    const [moved] = reordered.splice(idx, 1);
    reordered.splice(target, 0, moved);
    reordered.forEach((_, i) => {
      form.setValue(`choices.${i}.priorityOrder`, i + 1);
    });
  };

  const findDivision = (id: string) => {
    for (const dept of departments) {
      const div = dept.divisions?.find((d) => d.id === id);
      if (div) return { division: div, department: dept };
    }
    return undefined;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="font-semibold">
            Pilihan Kamu ({fields.length}/{MAX_DIVISION_CHOICES})
          </p>
        </div>

        {fields.length === 0 && (
          <p className="text-sm text-neutral-darker">
            Belum ada divisi dipilih. Pilih dari daftar di bawah, urutan
            menentukan prioritas.
          </p>
        )}

        {fields.map((field, idx) => {
          const found = findDivision(field.divisionId);
          return (
            <div
              key={field.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-green-950 bg-green-50 p-4"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-green-950 text-xs font-bold text-white">
                  {idx + 1}
                </span>
                <div>
                  <p className="font-medium">
                    {found?.division.name ?? 'Divisi tidak ditemukan'}
                  </p>
                  <p className="text-xs text-neutral-darker">
                    {found?.department.name}
                  </p>
                </div>
              </div>

              {!disabled && (
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="link"
                    size="icon-sm"
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, -1)}
                  >
                    <ChevronUp className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    size="icon-sm"
                    disabled={idx === fields.length - 1}
                    onClick={() => handleMove(idx, 1)}
                  >
                    <ChevronDown className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    size="icon-sm"
                    onClick={() => handleRemove(idx)}
                  >
                    <X className="size-4 text-red-500" />
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!disabled && (
        <div className="flex flex-col gap-4">
          <p className="font-semibold">Daftar Divisi</p>
          {departments.map((dept) => (
            <div key={dept.id} className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-neutral-darker">
                {dept.name}
              </p>
              <div className="flex flex-col gap-2">
                {dept.divisions?.map((div) => {
                  const isSelected = selectedIds.includes(div.id);
                  const isFull = fields.length >= MAX_DIVISION_CHOICES;
                  return (
                    <div
                      key={div.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-gray-300 p-3"
                    >
                      <div>
                        <p className="text-sm font-medium">{div.name}</p>
                      </div>
                      <Button
                        type="button"
                        variant="outlined"
                        size="sm"
                        disabled={isSelected || isFull}
                        onClick={() => handleAdd(div)}
                      >
                        {isSelected ? 'Terpilih' : 'Pilih'}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
