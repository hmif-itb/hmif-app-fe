import { useEffect } from 'react';
import CategoryIcon from '~/assets/icons/competition/category.svg';
import ClockIcon from '~/assets/icons/competition/clock.svg';
import LinkIcon from '~/assets/icons/competition/link.svg';
import MoneyIcon from '~/assets/icons/competition/money.svg';
import PersonIcon from '~/assets/icons/competition/person.svg';
import Attachment from '~/components/custom-form/fields/Attachment';
import DatePicker from '~/components/custom-form/fields/DatePicker';
import FormTextField from '~/components/custom-form/fields/FormTextField';
import MobileForm from '~/components/custom-form/MobileForm';
import MultiSelect from '~/components/custom-form/fields/MultiSelect';
import useAddCompetition from '../-useAddCompetition';

type ComponentProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AddCompetitionDrawer(props: Readonly<ComponentProps>) {
  const { isOpen, setOpen } = props;

  const { categoryOptions, form, onSubmit, image, setImage } =
    useAddCompetition({
      onSubmitSuccess: () => setOpen(false),
    });

  useEffect(() => {
    if (!isOpen) {
      form.reset();
      setImage(null);
    }
  }, [isOpen]);

  return (
    <MobileForm
      form={form}
      onSubmit={onSubmit}
      isOpen={isOpen}
      setOpen={setOpen}
      title="New Competition"
    >
      <FormTextField form={form} name="title" placeholder="Add Title" />
      <FormTextField
        icon={PersonIcon}
        form={form}
        name="organizer"
        placeholder="Add Organizer"
        inputClassName="py-3 text-base"
        iconClassName="size-6"
      />

      <DatePicker
        icon={ClockIcon}
        form={form}
        name="registrationStart"
        placeholder="Add registration start date"
        iconClassName="size-6"
      />
      <DatePicker
        icon={ClockIcon}
        form={form}
        name="registrationDeadline"
        placeholder="Add registration end date"
        iconClassName="size-6 opacity-0"
      />

      <MultiSelect
        icon={CategoryIcon}
        form={form}
        name="categories"
        options={categoryOptions}
        placeholder="Choose Category"
        iconClassName="size-6"
      />

      <FormTextField
        type="number"
        icon={MoneyIcon}
        form={form}
        name="price"
        placeholder="Add Price"
        inputClassName="py-3 text-base"
        iconClassName="size-5"
      />
      <FormTextField
        icon={LinkIcon}
        form={form}
        name="registrationURL"
        placeholder="Add Registration Link"
        inputClassName="py-3 text-base"
        iconClassName="size-5"
      />
      <FormTextField
        icon={LinkIcon}
        form={form}
        name="sourceURL"
        placeholder="Add Source Link"
        inputClassName="py-3 text-base"
        iconClassName="size-5 opacity-0"
      />

      <Attachment
        icon={LinkIcon}
        image={image}
        setImage={setImage}
        placeholder="Add Attachment"
        iconClassName="size-5 opacity-0"
      />
    </MobileForm>
  );
}
