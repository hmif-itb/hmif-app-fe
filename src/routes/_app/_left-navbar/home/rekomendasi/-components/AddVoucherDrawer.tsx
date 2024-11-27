import { useEffect } from 'react';
import ClockIcon from '~/assets/icons/competition/clock.svg';
import LinkIcon from '~/assets/icons/competition/link.svg';
import BookIcon from '~/assets/icons/calendar/book.svg';
import Attachment from '~/components/custom-form/fields/Attachment';
import DatePicker from '~/components/custom-form/fields/DatePicker';
import FormTextField from '~/components/custom-form/fields/FormTextField';
import MobileForm from '~/components/custom-form/MobileForm';
import useAddVoucher from '../-useAddVoucher';

type ComponentProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AddVoucherDrawer(props: Readonly<ComponentProps>) {
  const { isOpen, setOpen } = props;

  const {form, onSubmit, image, setImage } =
    useAddVoucher({
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
      title="New Voucher"
    >
      <FormTextField form={form} name="title" placeholder="Add Title" />

      <DatePicker
        icon={ClockIcon}
        form={form}
        name="periodeAwal"
        placeholder="Add voucher start date"
        iconClassName="size-6"
      />
      <DatePicker
        icon={ClockIcon}
        form={form}
        name="periodeAkhir"
        placeholder="Add voucher end date"
        iconClassName="size-6 opacity-0"
      />

      <FormTextField
        icon={BookIcon}
        form={form}
        name="description"
        placeholder="Add Description"
        inputClassName="py-3 text-base"
        iconClassName="size-6"
      />

      <FormTextField
        icon={LinkIcon}
        form={form}
        name="link"
        placeholder="Add Voucher Link"
        inputClassName="py-3 text-base"
        iconClassName="size-5"
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
