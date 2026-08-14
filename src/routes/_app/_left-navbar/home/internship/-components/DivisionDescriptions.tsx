import { InternshipDepartment } from '~/api/generated';

type ComponentProps = {
  departments: InternshipDepartment[];
};

export default function DivisionDescriptions(props: Readonly<ComponentProps>) {
  const { departments } = props;

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-neutral-darker">
        Berikut penjelasan dari setiap divisi yang tersedia. Baca baik-baik
        sebelum menentukan pilihan divisimu di tahap selanjutnya.
      </p>
      {departments.map((dept) => (
        <div key={dept.id} className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-neutral-darker">
            {dept.name}
          </p>
          <div className="flex flex-col gap-3">
            {dept.divisions?.map((div) => (
              <div
                key={div.id}
                className="flex flex-col gap-2 rounded-xl border border-gray-300 p-4"
              >
                <p className="font-semibold">{div.name}</p>
                {div.description ? (
                  <p className="whitespace-pre-wrap text-sm text-neutral-black">
                    {div.description}
                  </p>
                ) : (
                  <p className="text-sm italic text-neutral-darker">
                    Deskripsi belum tersedia untuk divisi ini.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
