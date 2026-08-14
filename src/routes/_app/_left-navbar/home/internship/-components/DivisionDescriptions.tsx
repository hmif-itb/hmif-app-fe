import { ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { InternshipDepartment, InternshipDivision } from '~/api/generated';

function DivisionPill(props: Readonly<{ division: InternshipDivision }>) {
  const { division } = props;

  return (
    <AccordionItem value={division.id} className="border-none">
      <AccordionTrigger className="w-fit rounded-full border border-gray-300 bg-gray-50 px-3 py-1.5 text-xs font-medium text-neutral-black hover:no-underline data-[state=open]:border-green-950 data-[state=open]:bg-green-950 data-[state=open]:text-white [&>svg]:data-[state=open]:rotate-180">
        {division.name}
        <ChevronDown className="ml-1.5 size-3 shrink-0 transition-transform duration-200" />
      </AccordionTrigger>
      <AccordionContent className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
        {division.description ? (
          <p className="whitespace-pre-wrap text-sm text-neutral-black">
            {division.description}
          </p>
        ) : (
          <p className="text-sm italic text-neutral-darker">
            Deskripsi belum tersedia untuk divisi ini.
          </p>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

type ComponentProps = {
  departments: InternshipDepartment[];
};

export default function DivisionDescriptions(props: Readonly<ComponentProps>) {
  const { departments } = props;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-neutral-darker">
        Klik departemen untuk melihat daftar divisinya, lalu klik divisi untuk
        membaca penjelasannya.
      </p>
      <Accordion type="multiple" className="flex flex-col gap-2">
        {departments.map((dept) => (
          <AccordionItem
            key={dept.id}
            value={dept.id}
            className="rounded-xl border border-gray-300 px-4"
          >
            <AccordionTrigger className="py-3 text-sm font-semibold text-neutral-black hover:no-underline [&>svg]:data-[state=open]:rotate-180">
              {dept.name}
              <ChevronDown className="size-4 shrink-0 transition-transform duration-200" />
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <Accordion type="multiple" className="flex flex-col gap-2">
                {dept.divisions?.map((div) => (
                  <DivisionPill key={div.id} division={div} />
                ))}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
