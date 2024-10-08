import { zodResolver } from '@hookform/resolvers/zod';
import { PopoverClose } from '@radix-ui/react-popover';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { api, queryClient } from '~/api/client.ts';
import BooksIcon from '~/assets/icons/calendar/books.svg';
import ClockIcon from '~/assets/icons/calendar/clock.svg';
import CloseIcon from '~/assets/icons/calendar/close.svg';
import DocsIcon from '~/assets/icons/calendar/docs.svg';
import Calendar from '~/components/new-calendar';
import { Button } from '~/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command.tsx';
import { Form, FormControl, FormField, FormItem } from '~/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { TextField } from '~/components/ui/textfield';
import { cn } from '~/lib/utils.ts';
import { FormSchema, FormSchemaType } from '../-constants.ts';
import generateTimeOptions from '~/lib/generateTimeOptions.ts';

export type CalendarCategory = 'akademik' | 'himpunan';

type ComponentProps = {
  constraintRef: React.MutableRefObject<HTMLElement | null>;
  category: CalendarCategory;
  onSubmitSuccess?: () => void;
  onClose?: () => void;
};

const TOAST_ID = 'add-event-toast';

const TimeOptions = generateTimeOptions();

export default function DesktopAddEvent(props: Readonly<ComponentProps>) {
  const { constraintRef, category, onSubmitSuccess, onClose } = props;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      description: '',
      courseId: '',
      start: new Date().toISOString(),
      end: new Date().toISOString(),
    },
  });

  const watchStart = form.watch('start');
  const watchEnd = form.watch('end');

  const dateDisplay = dayjs(watchStart).format('dddd, DD-MM-YYYY');
  const startTimeDisplay = dayjs(watchStart).format('HH:mm');
  const endTimeDisplay = dayjs(watchEnd).format('HH:mm');

  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: () => api.course.getlistCourses({}),
  });

  const filteredCourses = courses?.courses.filter(
    (course) => course.major !== 'OTHER',
  );

  const postEvent = useMutation({
    mutationFn: api.calendar.postCalendarEvent.bind(api.calendar),
    onSuccess: () => {
      toast.success('Event Added!', { id: TOAST_ID });
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
      onSubmitSuccess && onSubmitSuccess();
    },
    onError: () => toast.error('Failed to add event', { id: TOAST_ID }),
  });

  const handleSubmit = async (values: FormSchemaType) => {
    toast.loading('Please wait...', { id: TOAST_ID });
    postEvent.mutate({
      requestBody: {
        courseId: category === 'akademik' ? values.courseId : undefined,
        title: values.title,
        description: values.description,
        category,
        start: values.start,
        end: values.end,
      },
    });
  };

  // for handling scroll popover inside the dialog
  // https://github.com/radix-ui/primitives/issues/1159
  const containerRef = useRef<HTMLFormElement>(null);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraintRef}
      dragElastic={0}
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="w-full rounded-2xl bg-white shadow-[0_4px_4px_3px_rgba(0,0,0,0.25)]"
    >
      <div className="flex flex-row justify-end rounded-t-2xl bg-[#D9D9D9] px-4 py-3">
        <Button className="p-0" variant="link" onClick={onClose}>
          <img src={CloseIcon} alt="close" className="size-4" />
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid grid-cols-[24px_auto] items-center gap-x-5 gap-y-2 p-4"
          ref={containerRef}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="col-start-2 col-end-2 row-start-1 row-end-1">
                <TextField
                  placeholder="Add Title"
                  error={
                    form.formState.errors.title?.message &&
                    "Title can't be empty"
                  }
                  inputClassName="!border-b-2 px-0 text-3xl font-medium border-0 rounded-none"
                  success={form.formState.isSubmitSuccessful}
                  {...field}
                />
              </FormItem>
            )}
          />

          <div className="col-start-2 col-end-2 row-start-2 row-end-2 mt-2 flex w-fit items-center gap-2 rounded-lg bg-yellow-75 p-2">
            {/* <img src={BookIcon} alt="" className="size-4" /> */}
            <p className="text-sm font-medium text-green-300">{category}</p>
          </div>

          <img
            src={ClockIcon}
            alt=""
            className="col-start-1 col-end-1 row-start-3 row-end-3 size-6"
          />
          <div className="col-start-2 col-end-2 row-start-3 row-end-3 flex items-center gap-24">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="link"
                  className="w-[180px] justify-start p-0 text-base font-medium"
                >
                  {dateDisplay}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-fit rounded-xl p-0 shadow-[0_4px_4px_3px_rgba(0,0,0,0.25)]"
                align="center"
                side="right"
                container={containerRef.current}
              >
                <Calendar
                  onChange={(date) => {
                    form.setValue('start', date.toISOString());
                    form.setValue('end', date.toISOString());
                  }}
                  isMobile={false}
                  defaultDate={new Date(watchStart)}
                  className="p-4 pb-0"
                />
              </PopoverContent>
            </Popover>
            <div className="flex items-center">
              <Popover modal={false}>
                <PopoverTrigger asChild>
                  <TextField
                    readOnly
                    value={startTimeDisplay}
                    inputClassName="font-medium border-none text-base px-0 text-center"
                    className="w-[60px]"
                  />
                </PopoverTrigger>

                <PopoverContent
                  className="w-fit p-0"
                  align="start"
                  side="bottom"
                  container={containerRef.current}
                >
                  <Command className="w-[80px] min-w-0">
                    <CommandInput placeholder="Search" disableIcon />
                    <CommandList className="max-h-52 w-full px-1">
                      <CommandEmpty>Enter a valid time</CommandEmpty>
                      <CommandGroup className="overflow-y-auto">
                        {TimeOptions?.map((opt) => (
                          <CommandItem
                            value={opt.display}
                            key={opt.display}
                            onSelect={() => {
                              const [hour, minute] = opt.display.split(':');
                              const newDate = dayjs(watchStart)
                                .hour(parseInt(hour))
                                .minute(parseInt(minute))
                                .toISOString();
                              form.setValue('start', newDate);
                            }}
                            className="cursor-pointer"
                          >
                            <PopoverClose className="text-left">
                              {opt.display}
                            </PopoverClose>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <p>-</p>
              <Popover modal={false}>
                <PopoverTrigger asChild>
                  <TextField
                    readOnly
                    value={endTimeDisplay}
                    inputClassName="font-medium border-none text-base px-0 text-center"
                    className="w-[60px]"
                  />
                </PopoverTrigger>

                <PopoverContent
                  className="w-fit p-0"
                  align="start"
                  side="bottom"
                  container={containerRef.current}
                >
                  <Command className="w-[80px] min-w-0">
                    <CommandInput
                      placeholder="Search"
                      className="placeholder:text-xs"
                      disableIcon
                    />
                    <CommandList className="max-h-52 w-full px-1">
                      <CommandEmpty>Enter a valid time</CommandEmpty>
                      <CommandGroup className="overflow-y-auto">
                        {TimeOptions?.map((opt) => (
                          <CommandItem
                            value={opt.display}
                            key={opt.display}
                            onSelect={() => {
                              const [hour, minute] = opt.display.split(':');
                              const newDate = dayjs(watchStart)
                                .hour(parseInt(hour))
                                .minute(parseInt(minute))
                                .toISOString();
                              form.setValue('end', newDate);
                            }}
                            className="flex cursor-pointer justify-center"
                          >
                            <PopoverClose className="text-center">
                              {opt.display}
                            </PopoverClose>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {category === 'akademik' && (
            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <>
                  <img
                    src={BooksIcon}
                    alt=""
                    className="col-start-1 col-end-1 row-start-4 row-end-4 size-6"
                  />

                  <FormItem className="col-start-2 col-end-2 row-start-4 row-end-4">
                    <Popover modal={false}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="link"
                            className={cn(
                              'p-0',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value
                              ? filteredCourses?.find(
                                  (c) => c.id === field.value,
                                )?.name
                              : 'Add Subject'}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent
                        className="p-0"
                        align="start"
                        side="bottom"
                        container={containerRef.current}
                      >
                        <Command>
                          <CommandInput placeholder="Search course..." />
                          <CommandList className="max-h-52">
                            <CommandEmpty>No courses found</CommandEmpty>
                            <CommandGroup className="overflow-y-auto">
                              {filteredCourses?.map((c) => (
                                <CommandItem
                                  value={c.id}
                                  key={c.id}
                                  onSelect={() =>
                                    form.setValue('courseId', c.id)
                                  }
                                  keywords={[c.name]}
                                  className="cursor-pointer"
                                >
                                  <PopoverClose className="text-left">
                                    {c.code} {c.name}
                                  </PopoverClose>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                </>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <>
                <img
                  src={DocsIcon}
                  alt=""
                  className="col-start-1 col-end-1 row-start-5 row-end-5 size-6"
                />

                <FormItem className="col-start-2 col-end-2 row-start-5 row-end-5">
                  <TextField
                    placeholder="Add description"
                    inputClassName="font-medium border-none text-base px-0"
                    success={form.formState.isSubmitSuccessful}
                    {...field}
                  />
                </FormItem>
              </>
            )}
          />
          <div className="col-start-2 col-end-2 row-start-6 row-end-6 flex justify-end pt-[86px]">
            <Button
              size="sm"
              type="submit"
              variant="solid"
              className="bg-[#305138]"
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
