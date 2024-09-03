import { useEffect } from 'react';
import DesktopForm from '~/components/custom-form/DesktopForm';
import DesktopTitleField from '~/components/custom-form/fields/DesktopTitleField';
import ClockIcon from '~/assets/icons/clock.svg';
import DocsIcon from '~/assets/icons/calendar/docs.svg';
import BooksIcon from '~/assets/icons/calendar/books.svg';
import DateTimePicker from '~/components/custom-form/fields/DateTimePicker';
import { CalendarCategory } from '~/api/generated';
import useAddEvent from '../-useAddEvent';
import FormTextField from '~/components/custom-form/fields/FormTextField';
import SingleSelect from '~/components/custom-form/fields/SingleSelect';

type ComponentProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  constraintRef: React.MutableRefObject<HTMLElement | null>;
  category: CalendarCategory;
};

export default function AddEventDialog(props: Readonly<ComponentProps>) {
  const { isOpen, setOpen, constraintRef, category } = props;

  const { filteredCourses, form, onSubmit } = useAddEvent({
    category,
    onSubmitSuccess: () => setOpen(false),
  });

  useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <DesktopForm
      form={form}
      setOpen={setOpen}
      onSubmit={onSubmit}
      constraintRef={constraintRef}
    >
      <DesktopTitleField
        icon={ClockIcon}
        form={form}
        name="title"
        placeholder="Add Title"
        iconClassName="size-6 opacity-0"
      />

      <div className="ml-12 mt-2 flex w-fit items-center gap-2 rounded-lg bg-yellow-75 p-2">
        {/* <img src={BookIcon} alt="" className="size-4" /> */}
        <p className="text-sm font-medium capitalize text-green-300">
          {category}
        </p>
      </div>

      <DateTimePicker
        form={form}
        startName="start"
        endName="end"
        icon={ClockIcon}
        iconClassName="size-6"
        placeholder="Event Date"
        className="pb-2"
      />

      {category === 'akademik' && (
        <SingleSelect
          form={form}
          name="courseId"
          icon={BooksIcon}
          iconClassName="size-6"
          placeholder="Add Subject"
          className="py-2"
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
    </DesktopForm>
  );
}
