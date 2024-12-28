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
import useAddReview from '../-useAddReview';

type ComponentProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  place: string;
};

export function AddReviewDrawer(props: Readonly<ComponentProps>) {
  const { isOpen, setOpen, place } = props;

  const { form, onSubmit } = useAddReview({
    onSubmitSuccess: () => setOpen(false),
  });

  useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen]);

  return (
    <MobileForm
      form={form}
      onSubmit={onSubmit}
      isOpen={isOpen}
      setOpen={setOpen}
      title={'Review: ' + place}
    >
      <FormTextField
        form={form}
        name="review"
        placeholder="Add a review about this place"
        growable={true}
        growableMaxLength={500}
      />
    </MobileForm>
  );
}
