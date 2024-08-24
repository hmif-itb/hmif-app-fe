import {
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from '~/components/ui/form';
import { ComponentProps } from './-constants';
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
import { PopoverClose } from '@radix-ui/react-popover';
import { useRef } from 'react';

export default function Courses({ form }: ComponentProps): JSX.Element {
  const { data } = useQuery({
    queryKey: ['courses'],
    queryFn: () => api.course.getlistCourses({}),
  });

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef}>
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
                      'w-full justify-between rounded-none bg-white px-4 py-[8px] font-normal text-black',
                    )}
                  >
                    <div className="flex items-center">
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
              <PopoverContent className="p-0" container={containerRef.current}>
                <Command>
                  <CommandInput placeholder="Select a course.." />
                  <CommandList className="max-h-52">
                    <CommandEmpty>No courses found.</CommandEmpty>
                    <CommandGroup className="overflow-y-auto">
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
                          <PopoverClose className="w-full text-left">
                            {course.name}
                          </PopoverClose>
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
