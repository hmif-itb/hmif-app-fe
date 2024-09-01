import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { api, queryClient } from '~/api/client';
import { Button } from '~/components/ui/button';
import { DrawerClose, DrawerHeader, DrawerTitle } from '~/components/ui/drawer';
import { Form } from '~/components/ui/form';
import Courses from './mobile-add-event/course';
import DatePicker from './mobile-add-event/date-picker';
import Description from './mobile-add-event/description';
import Title from './mobile-add-event/title';
import { EventSchema, eventSchema } from './mobile-add-event/-constants';
import { CalendarCategory } from '~/api/generated';

const TOAST_ID = 'add-event-toast';

type ComponentProps = {
  setDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  category: CalendarCategory;
};

export function MobileAddEvent({ setDrawer, category }: ComponentProps) {
  const form = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      courseId: '0',
      title: '',
      description: '',
      start: new Date().toISOString(),
      end: new Date().toISOString(),
    },
  });

  const postEvent = useMutation({
    mutationFn: api.calendar.postCalendarEvent.bind(api.calendar),
    onSuccess: () => {
      toast.success('Event Posted!', { id: TOAST_ID });
      setTimeout(() => {
        setDrawer(false);
      }, 1000);
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
    },
    onError: () => toast.error('Failed to post event', { id: TOAST_ID }),
  });

  function onSubmit(values: EventSchema) {
    try {
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
    } catch (error) {
      console.log(error);
      toast.error('Failed to post event', { id: TOAST_ID });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DrawerHeader className="flex flex-row items-baseline justify-between px-10">
          <DrawerClose
            onClick={() => {
              setDrawer(false);
            }}
          >
            Cancel
          </DrawerClose>
          <DrawerTitle>New Event</DrawerTitle>
          <Button
            variant="link"
            type="submit"
            className="mx-0 px-0 text-[#007AFF]"
          >
            Submit
          </Button>
        </DrawerHeader>
        <div className="divide-y divide-dashed">
          <Title form={form} />
          <DatePicker form={form} />
          {category === 'akademik' ? <Courses form={form} /> : null}
          <Description form={form} />
        </div>
      </form>
    </Form>
  );
}
