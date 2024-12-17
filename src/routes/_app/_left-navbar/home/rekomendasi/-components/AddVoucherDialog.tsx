import { useEffect } from 'react';
import ClockIcon from '~/assets/icons/clock.svg';
import BookIcon from '~/assets/icons/calendar/book.svg';
import LinkIcon from '~/assets/icons/competition/link.svg';
import Attachment from '~/components/custom-form/fields/Attachment';
import DatePicker from '~/components/custom-form/fields/DatePicker';
import DesktopForm from '~/components/custom-form/DesktopForm';
import DesktopTitleField from '~/components/custom-form/fields/DesktopTitleField';
import FormTextField from '~/components/custom-form/fields/FormTextField';
import useAddVoucher from '../-useAddVoucher';

type ComponentProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  constraintRef: React.MutableRefObject<HTMLElement | null>;
};

export default function AddVoucherDialog(props: Readonly<ComponentProps>) {
  const { isOpen, setOpen, constraintRef } = props;

  const { form, onSubmit, image, setImage } = useAddVoucher({
    onSubmitSuccess: () => setOpen(false),
  });

  useEffect(() => {
    if (!isOpen) {
      form.reset();
      setImage(null);
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
        placeholder="Add Voucher Name"
        iconClassName="size-6 opacity-0"
      />

      <DatePicker
        icon={ClockIcon}
        form={form}
        name="periodeAwal"
        placeholder="Add voucher start date"
        iconClassName="size-6"
        className="pb-2"
      />
      <DatePicker
        icon={ClockIcon}
        form={form}
        name="periodeAkhir"
        placeholder="Add voucher end date"
        iconClassName="size-6 opacity-0"
        className="py-2"
      />

      <FormTextField
        icon={BookIcon}
        form={form}
        name="description"
        placeholder="Add Description"
        inputClassName="py-3 text-lg"
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
    </DesktopForm>
  );
}