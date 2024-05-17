import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  headline: z.string().min(1).max(50),
  announcement: z.string().min(1).max(500),
  categories: z.string().array(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function useAddAnnouncement() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      headline: '',
      announcement: '',
      categories: [],
    },
  });

  const onSubmit = (values: FormSchemaType) => {
    console.log(values);
  };

  return { form, onSubmit };
}
