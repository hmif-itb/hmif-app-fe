import { CalendarCategory } from '~/api/generated';
import MobileForm from '~/components/custom-form/MobileForm';
import useAddEvent from '../-useAddEvent';
import ClockIcon from '~/assets/icons/clock.svg';
import DocsIcon from '~/assets/icons/calendar/docs.svg';
import BooksIcon from '~/assets/icons/calendar/books.svg';
import DateTimePicker from '~/components/custom-form/fields/DateTimePicker';
import SingleSelect from '~/components/custom-form/fields/SingleSelect';
import FormTextField from '~/components/custom-form/fields/FormTextField';

type ComponentProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  category: CalendarCategory;
};

export default function AddEventDrawer(props: Readonly<ComponentProps>) {
  const { isOpen, setOpen, category } = props;

  const { filteredCourses, form, onSubmit } = useAddEvent({
    category,
    onSubmitSuccess: () => setOpen(false),
  });

  if (!category) {
    return null;
  }

  return (
    <MobileForm
      form={form}
      isOpen={isOpen}
      setOpen={setOpen}
      onSubmit={onSubmit}
      title={`Add ${category[0].toUpperCase()}${category.slice(1)} Event`}
    >
      <FormTextField form={form} name="title" placeholder="Add Title" />

      <DateTimePicker
        form={form}
        startName="start"
        endName="end"
        icon={ClockIcon}
        iconClassName="size-6"
        placeholder="Event Date"
      />

      {category === 'akademik' && (
        <SingleSelect
          form={form}
          name="courseId"
          icon={BooksIcon}
          iconClassName="size-6"
          placeholder="Add Subject"
          className="py-4 lg:py-2"
          options={
            filteredCourses
              ? filteredCourses.map((c) => ({
                  id: c.id,
                  title: c.code + ' ' + c.name,
                }))
              : []
          }
        />
      )}

      <FormTextField
        growable
        growableMaxLength={500}
        icon={DocsIcon}
        form={form}
        name="description"
        placeholder="Add Description"
        inputClassName="py-3 text-lg"
        iconClassName="size-6"
      />
    </MobileForm>
  );
}
