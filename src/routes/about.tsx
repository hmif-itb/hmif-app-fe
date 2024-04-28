import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '~/components/ui/form';
import { TextField } from '~/components/ui/textfield';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// import SearchIcon from '~/assets/icons/textfield/search.svg';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  const FormSchema = z.object({
    username: z.string().min(5, {
      message: 'Username must be atleast 5 characters.',
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
    },
  });

  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <div className="p-2">
      Hello from About!
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextField
                    className="mt-10 w-3/4"
                    variant="search"
                    placeholder="TextField"
                    error={form.formState.errors.username?.message}
                    success={form.formState.isSubmitSuccessful}
                    // fieldSize="m"
                    {...field}
                  >
                    {/* <img src={SearchIcon} className="size-4" /> */}
                  </TextField>
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-10">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
