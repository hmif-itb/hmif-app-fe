import { useEffect } from 'react';
import CategoryIcon from '~/assets/icons/competition/category.svg';
import ClockIcon from '~/assets/icons/clock.svg';
import DocsIcon from '~/assets/icons/rekomendasi/docs.svg';
import LinkIcon from '~/assets/icons/competition/link.svg';
import MarkerIcon from '~/assets/icons/rekomendasi/marker.svg';
import Attachment from '~/components/custom-form/fields/Attachment';
import DesktopForm from '~/components/custom-form/DesktopForm';
import DesktopTitleField from '~/components/custom-form/fields/DesktopTitleField';
import FormTextField from '~/components/custom-form/fields/FormTextField';
import SingleSelect from '~/components/custom-form/fields/SingleSelect';
import useAddCoWorkingSpace from '../-useAddCoWorkingSpace';

type ComponentProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  constraintRef: React.MutableRefObject<HTMLElement | null>;
};

export default function AddCoWorkingSpaceDialog(props: Readonly<ComponentProps>) {
  const { isOpen, setOpen, constraintRef } = props;

  
  const { categoryOptions, form, onSubmit, image, setImage } =
    useAddCoWorkingSpace({
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
        placeholder="Add Coworking Space Name"
        iconClassName="size-6 opacity-0"
      />
      

      <SingleSelect
        icon={CategoryIcon}
        form={form}
        name="location"
        options={categoryOptions}
        placeholder="Choose Location"
        iconClassName="size-6"
        className="py-3 text-base"
      />

      <FormTextField
        icon={MarkerIcon}
        form={form}
        name="address"
        placeholder="Add Address"
        inputClassName="py-3 text-base"
        iconClassName="size-6"
      />

    <FormTextField
        icon={LinkIcon}
        form={form}
        name="mapsURL"
        placeholder="Add Maps Link"
        inputClassName="py-3 text-base"
        iconClassName="size-5"
      />

      <Attachment
        icon={LinkIcon}
        image={image}
        setImage={setImage}
        placeholder="Add Attachment"
        iconClassName="size-5"
      />

      <FormTextField
        growable
        growableMaxLength={300}
        icon={DocsIcon}
        form={form}
        name="description"
        placeholder="Add Description"
        inputClassName="py-3 text-base"
        iconClassName="size-6"
      />

    </DesktopForm>
  );
}
