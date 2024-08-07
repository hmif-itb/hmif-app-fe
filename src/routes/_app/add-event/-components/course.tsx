import {
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from '~/components/ui/form';
import { ComponentProps } from '../-constants';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { ChevronDown, Check } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '~/api/client';

export default function Courses({ form }: ComponentProps): JSX.Element {
  const { data } = useQuery({
    queryKey: ['courses'],
    queryFn: () => api.course.getlistCourses({}),
  });

  return (
    <div>
      <FormField
        control={form.control}
        name="courseId"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    role="combobox"
                    className={cn(
                      'w-full justify-between rounded-none bg-white px-[12px] py-[8px] text-[14px] text-black',
                    )}
                  >
                    <div className="flex">
                      <span>
                        {field.value
                          ? data?.courses.find(
                              (course) => course.id === field.value,
                            )?.name
                          : 'Select course'}
                      </span>
                      {!data?.courses.find(
                        (course) => course.id === field.value,
                      ) && <FormMessage className="ml-5" />}
                    </div>
                    <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[95%] p-0">
                <Command>
                  <CommandInput placeholder="Select a course.." />
                  <CommandList>
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      {data?.courses.map((course) => (
                        <CommandItem
                          value={course.name}
                          key={course.id}
                          onSelect={() => {
                            form.setValue('courseId', course.id);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              course.id === field.value
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          {course.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
    </div>
  );
}
