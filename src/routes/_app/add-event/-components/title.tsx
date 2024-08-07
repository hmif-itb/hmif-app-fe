import {
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { ComponentProps } from '../-constants';

export default function Title({ form }: ComponentProps): JSX.Element {
  return (
    <div>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type="text"
                id="title"
                placeholder="Add title"
                className="border-none py-6 text-[20px] outline-none"
                {...field}
              />
            </FormControl>
            <FormMessage className="ml-2" />
          </FormItem>
        )}
      />
    </div>
  );
}
