import { useWatch, UseFormReturn } from 'react-hook-form';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { InternshipDepartment } from '~/api/generated';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { Button } from '~/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { InternshipFormValues } from '../-constants';

type ComponentProps = {
  form: UseFormReturn<InternshipFormValues>;
  departments: InternshipDepartment[];
  disabled?: boolean;
};

export default function DivisionQuestions(props: Readonly<ComponentProps>) {
  const { form, departments, disabled } = props;
  const choices = useWatch({ control: form.control, name: 'choices' });
  const [openRaw, setOpenRaw] = useState<Record<string, boolean>>({});

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
        Pilih divisi terlebih dahulu untuk menjawab pertanyaan tiap divisi.
      </p>
    );
  }

  return (
    <Form {...form}>
      <div className="flex flex-col gap-8">
        {choices.map((choice, choiceIdx) => {
          const found = findDivision(choice.divisionId);
          if (!found) return null;

          return (
            <div
              key={choice.divisionId}
              className="flex flex-col gap-4 rounded-xl border border-gray-300 p-4"
            >
              <div>
                <p className="font-semibold">
                  Pilihan {choiceIdx + 1}: {found.division.name}
                </p>
                <p className="text-xs text-neutral-darker">
                  {found.department.name}
                </p>
              </div>

              {found.division.questionsRaw && (
                <div className="rounded-lg bg-gray-100 p-3">
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    className="p-0 text-xs"
                    onClick={() =>
                      setOpenRaw((prev) => ({
                        ...prev,
                        [choice.divisionId]: !prev[choice.divisionId],
                      }))
                    }
                  >
                    Lihat pertanyaan lengkap (asli)
                    {openRaw[choice.divisionId] ? (
                      <ChevronUp className="size-3" />
                    ) : (
                      <ChevronDown className="size-3" />
                    )}
                  </Button>
                  {openRaw[choice.divisionId] && (
                    <p className="mt-2 whitespace-pre-wrap text-xs text-neutral-darker">
                      {found.division.questionsRaw}
                    </p>
                  )}
                </div>
              )}

              {found.division.questions.map((question, qIdx) => (
                <FormField
                  key={question.id}
                  control={form.control}
                  name={`choices.${choiceIdx}.answers.${qIdx}.answer`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {question.label}
                        {question.required && (
                          <span className="text-red-500"> *</span>
                        )}
                      </FormLabel>
                      <FormControl>
                        {question.type === 'select' ? (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={disabled}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih jawaban" />
                            </SelectTrigger>
                            <SelectContent>
                              {(question.options ?? []).map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : question.type === 'text' ? (
                          <Input {...field} disabled={disabled} />
                        ) : (
                          <Textarea {...field} disabled={disabled} />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          );
        })}
      </div>
    </Form>
  );
}
