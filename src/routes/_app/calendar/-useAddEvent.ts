import { useForm } from 'react-hook-form';
import { FormSchema, FormSchemaType } from './-constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api, queryClient } from '~/api/client';
import toast from 'react-hot-toast';
import { CalendarCategory } from '~/api/generated';

const TOAST_ID = 'add-event-toast';

type HookProps = {
  category: CalendarCategory;
  onSubmitSuccess?: () => void;
};

export default function useAddEvent(props: Readonly<HookProps>) {
  const { onSubmitSuccess, category } = props;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      description: '',
      courseId: '',
      start: '',
      end: '',
    },
  });

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

  const onSubmit = async (values: FormSchemaType) => {
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

  return { filteredCourses, form, onSubmit };
}
