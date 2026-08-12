import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '~/components/ui/button';
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
import { InternshipFormValues } from '../-constants';

type ComponentProps = {
  form: UseFormReturn<InternshipFormValues>;
  disabled?: boolean;
};

export default function GeneralInfoSection(props: Readonly<ComponentProps>) {
  const { form, disabled } = props;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'kesibukan',
  });

  return (
    <Form {...form}>
      <div className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name="kelas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kelas</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={disabled}
                  placeholder="Contoh: K-01"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="idLine"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID Line</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={disabled}
                  placeholder="ID Line kamu"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pengalamanOrganisasi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pengalaman Organisasi (opsional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={disabled}
                  placeholder="Ceritakan pengalaman organisasimu"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <FormLabel>Kesibukan Saat Ini (opsional)</FormLabel>
            {!disabled && (
              <Button
                type="button"
                variant="outlined"
                size="sm"
                onClick={() =>
                  append({ jabatan: '', organisasi: '', periode: '' })
                }
              >
                <Plus className="size-4" />
                Tambah
              </Button>
            )}
          </div>

          {fields.length === 0 && (
            <p className="text-sm text-neutral-darker">
              Belum ada kesibukan ditambahkan.
            </p>
          )}

          {fields.map((item, idx) => (
            <div
              key={item.id}
              className="flex flex-col gap-3 rounded-xl border border-gray-300 p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Kesibukan {idx + 1}</p>
                {!disabled && (
                  <Button
                    type="button"
                    variant="link"
                    size="icon-sm"
                    onClick={() => remove(idx)}
                  >
                    <Trash2 className="size-4 text-red-500" />
                  </Button>
                )}
              </div>

              <FormField
                control={form.control}
                name={`kesibukan.${idx}.jabatan`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jabatan</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={disabled} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`kesibukan.${idx}.organisasi`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organisasi</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={disabled} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`kesibukan.${idx}.periode`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Periode</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={disabled}
                        placeholder="Contoh: 2024/2025"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </Form>
  );
}
