import { useEffect } from 'react';
import DocsIcon from '~/assets/icons/rekomendasi/docs.svg'
import BookIcon from '~/assets/icons/calendar/book.svg';
import LinkIcon from '~/assets/icons/competition/link.svg';
import MarkerIcon from '~/assets/icons/rekomendasi/marker.svg';
import Attachment from '~/components/custom-form/fields/Attachment';
import FormTextField from '~/components/custom-form/fields/FormTextField';
import MobileForm from '~/components/custom-form/MobileForm';
import SingleSelect from '~/components/custom-form/fields/SingleSelect';
import useAddCoWorkingSpace from '../-useAddCoWorkingSpace';

type ComponentProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AddCoWorkingSpaceDrawer(props: Readonly<ComponentProps>) {
  const { isOpen, setOpen } = props;

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

  return (
    <MobileForm
      form={form}
      onSubmit={onSubmit}
      isOpen={isOpen}
      setOpen={setOpen}
      title="New Coworking Space"
    >
      <FormTextField form={form} name="title" placeholder="Add Title" />

      <SingleSelect
          form={form}
          name="location"
          icon={BookIcon}
          iconClassName="size-6"
          placeholder="Add Subject"
          className="py-4 lg:py-2"
          options={categoryOptions}
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
        iconClassName="size-5 opacity-0"
      />
      
    </MobileForm>
  );
}
