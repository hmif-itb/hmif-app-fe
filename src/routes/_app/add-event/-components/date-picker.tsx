import {
  FormField,
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { ComponentProps } from '../-constants';

export default function DatePicker({ form }: ComponentProps): JSX.Element {
  return (
    <div>
      <FormField
        control={form.control}
        name="start"
        render={({ field }) => (
          <FormItem>
            <div className="px-3 py-2">
              <FormLabel className="text-[16px]">Start</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  className="ml-5 border-none py-6 text-[20px] outline-none"
                  {...field}
                />
              </FormControl>
            </div>
            <FormMessage className="ml-2" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="end"
        render={({ field }) => (
          <FormItem>
            <div className="px-3 py-2">
              <FormLabel className="text-[16px]">End</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  className="ml-5 border-none py-6 text-[20px] outline-none"
                  {...field}
                />
              </FormControl>
            </div>
            <FormMessage className="ml-2" />
          </FormItem>
        )}
      />
    </div>
  );
}
