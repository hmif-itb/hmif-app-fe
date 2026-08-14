import { useWatch, UseFormReturn } from 'react-hook-form';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ChevronDown, ChevronUp, Loader2, Paperclip } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '~/api/client';
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
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { CheckboxGroup } from '~/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { InternshipFormValues } from '../-constants';

const CHECKBOX_ANSWER_SEPARATOR = ', ';

function FileAnswerInput(
  props: Readonly<{
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
  }>,
) {
  const { value, onChange, disabled } = props;
  const postMediaUpload = useMutation({
    mutationFn: api.media.createPresignedUrl.bind(api.media),
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const presigned = await postMediaUpload.mutateAsync({
        requestBody: {
          fileName: file.name.split('.')[0],
          fileType: file.name.split('.').at(-1) ?? '',
        },
      });
      await fetch(presigned.presignedUrl, { method: 'PUT', body: file });
      onChange(presigned.mediaUrl);
    } catch (err) {
      console.error(err);
      toast.error('Gagal mengunggah file');
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Input
        type="file"
        onChange={handleFileChange}
        disabled={disabled || postMediaUpload.isPending}
      />
      {postMediaUpload.isPending && (
        <p className="flex items-center gap-1 text-xs text-neutral-darker">
          <Loader2 className="size-3 animate-spin" /> Mengunggah...
        </p>
      )}
      {value && !postMediaUpload.isPending && (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-xs text-green-800 underline"
        >
          <Paperclip className="size-3" /> Lihat file terunggah
        </a>
      )}
    </div>
  );
}

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
                        ) : question.type === 'radio' ? (
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={disabled}
                          >
                            {(question.options ?? []).map((option) => (
                              <label
                                key={option}
                                className="flex items-center gap-2 text-sm"
                              >
                                <RadioGroupItem value={option} />
                                {option}
                              </label>
                            ))}
                          </RadioGroup>
                        ) : question.type === 'checkbox' ? (
                          <CheckboxGroup
                            choices={question.options ?? []}
                            selectedValues={
                              field.value
                                ? field.value
                                    .split(CHECKBOX_ANSWER_SEPARATOR)
                                    .filter(Boolean)
                                : []
                            }
                            onChange={(checked) =>
                              field.onChange(
                                checked.join(CHECKBOX_ANSWER_SEPARATOR),
                              )
                            }
                          />
                        ) : question.type === 'file' ? (
                          <FileAnswerInput
                            value={field.value}
                            onChange={field.onChange}
                            disabled={disabled}
                          />
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
