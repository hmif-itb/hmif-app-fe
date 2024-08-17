import { useForm } from 'react-hook-form';
import CloseIcon from '~/assets/icons/calendar/close.svg';
import DocsIcon from '~/assets/icons/calendar/docs.svg';
import ClockIcon from '~/assets/icons/calendar/clock.svg';
import BookIcon from '~/assets/icons/calendar/book.svg';
import BooksIcon from '~/assets/icons/calendar/books.svg';
import { FormSchema, FormSchemaType } from '../-constants.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '~/components/ui/form';
import { TextField } from '~/components/ui/textfield';
import dayjs from 'dayjs';
import { Button } from '~/components/ui/button';
import { motion } from 'framer-motion';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import Calendar from '~/components/new-calendar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command.tsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '~/api/client.ts';
import { cn } from '~/lib/utils.ts';
import toast from 'react-hot-toast';

type ComponentProps = {
  constraintRef: React.MutableRefObject<HTMLElement | null>;
  calendarGroup: {
    id: string;
    name: string;
    category: string;
  };
  onSubmitSuccess?: () => void;
  onClose?: () => void;
};

const TOAST_ID = 'add-event-toast';

export default function DesktopAddEvent(props: Readonly<ComponentProps>) {
  const { constraintRef, calendarGroup, onSubmitSuccess, onClose } = props;

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

  const dateDisplay = dayjs(watchStart).format('dddd, MMMM DD');
  const startTimeDisplay = dayjs(watchStart).format('hh:mma');
  const endTimeDisplay = dayjs(watchEnd).format('hh:mma');

  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: () => api.course.getlistCourses({}),
  });

  const postEvent = useMutation({
    mutationFn: api.calendar.postCalendarEvent.bind(api.calendar),
    onSuccess: () => {
      toast.success('Event Added!', { id: TOAST_ID });
      onSubmitSuccess && onSubmitSuccess();
    },
    onError: () => toast.error('Failed to add event', { id: TOAST_ID }),
  });

  const handleSubmit = async (values: FormSchemaType) => {
    toast.loading('Please wait...', { id: TOAST_ID });
    postEvent.mutate({
      requestBody: {
        calendarGroupId: calendarGroup.id,
        courseId: values.courseId,
        title: values.title,
        description: values.description,
        category: calendarGroup.category,
        start: values.start,
        end: values.end,
      },
    });
  };

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
      className="absolute left-1/3 top-1/3 z-[100] w-[564px] overflow-hidden rounded-2xl bg-white shadow-[0_4px_4px_3px_rgba(0,0,0,0.25)]"
    >
      <div className="flex flex-row justify-end bg-[#D9D9D9] px-4 py-3">
        <Button className="p-0" variant="link" onClick={onClose}>
          <img src={CloseIcon} alt="close" className="size-4" />
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid grid-cols-[24px_auto] items-center gap-x-5 gap-y-2 p-4"
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
            <img src={BookIcon} alt="" className="size-4" />
            <p className="text-sm font-medium text-green-300">Akademik</p>
          </div>

          <img
            src={ClockIcon}
            alt=""
            className="col-start-1 col-end-1 row-start-3 row-end-3 size-6"
          />
          <div className="col-start-2 col-end-2 row-start-3 row-end-3 flex items-center gap-5">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="link"
                  className="w-[180px] justify-start p-0 text-base font-medium"
                >
                  {dateDisplay}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="z-[110] w-fit rounded-xl p-0 shadow-[0_4px_4px_3px_rgba(0,0,0,0.25)]">
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
              <TextField
                readOnly
                value={startTimeDisplay}
                inputClassName="font-medium border-none text-base px-0 text-center"
                className="w-[80px]"
              />
              <p>-</p>
              <TextField
                readOnly
                value={endTimeDisplay}
                inputClassName="font-medium border-none text-base px-0 text-center"
                className="w-[80px]"
              />
            </div>
          </div>

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
                  <Popover>
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
                            ? courses?.courses.find((c) => c.id === field.value)
                                ?.name
                            : 'Add Subject'}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent className="z-[110] p-0">
                      <Command>
                        <CommandInput placeholder="Search course..." />
                        <CommandList>
                          <CommandEmpty>No courses found</CommandEmpty>
                          <CommandGroup>
                            {courses?.courses.map((c) => (
                              <CommandItem
                                value={c.id}
                                key={c.id}
                                onSelect={() => form.setValue('courseId', c.id)}
                              >
                                {c.name}
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
