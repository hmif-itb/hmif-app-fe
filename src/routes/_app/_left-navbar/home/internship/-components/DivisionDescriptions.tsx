import { useWatch, UseFormReturn } from 'react-hook-form';
import { InternshipDepartment } from '~/api/generated';
import { InternshipFormValues } from '../-constants';

type ComponentProps = {
  form: UseFormReturn<InternshipFormValues>;
  departments: InternshipDepartment[];
};

export default function DivisionDescriptions(props: Readonly<ComponentProps>) {
  const { form, departments } = props;
  const choices = useWatch({ control: form.control, name: 'choices' });

  const findDivision = (id: string) => {
    for (const dept of departments) {
      const div = dept.divisions?.find((d) => d.id === id);
      if (div) return { division: div, department: dept };
    }
    return undefined;
  };

  if (!choices || choices.length === 0) {
    return (
      <p className="text-sm text-neutral-darker">
        Pilih divisi terlebih dahulu untuk melihat penjelasan tiap divisi.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-neutral-darker">
        Berikut penjelasan dari divisi-divisi yang kamu pilih. Baca baik-baik
        sebelum lanjut mengisi pertanyaan tiap divisi.
      </p>
      {choices.map((choice, choiceIdx) => {
        const found = findDivision(choice.divisionId);
        if (!found) return null;

        return (
          <div
            key={choice.divisionId}
            className="flex flex-col gap-2 rounded-xl border border-gray-300 p-4"
          >
            <div>
              <p className="font-semibold">
                Pilihan {choiceIdx + 1}: {found.division.name}
              </p>
              <p className="text-xs text-neutral-darker">
                {found.department.name}
              </p>
            </div>
            {found.division.description ? (
              <p className="whitespace-pre-wrap text-sm text-neutral-black">
                {found.division.description}
              </p>
            ) : (
              <p className="text-sm italic text-neutral-darker">
                Deskripsi belum tersedia untuk divisi ini.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
