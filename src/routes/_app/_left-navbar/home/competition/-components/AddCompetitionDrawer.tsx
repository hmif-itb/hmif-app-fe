import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { api, queryClient } from '~/api/client';
import { CompetitionCategories, PresignedURL } from '~/api/generated';
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
import { FileUpload } from '~/routes/_app/_left-navbar/add-announcement';
import { CompetitionSchema, CompetitionSchemaType } from '../-constants';
import { useCompetitionCategories } from '../-useCompetitionCategories';

type ComponentProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TOAST_ID = 'add-competition-toast';

export function AddCompetitionDrawer(props: Readonly<ComponentProps>) {
  const { isOpen, setOpen } = props;

  const [image, setImage] = useState<FileUpload>({
    url: '',
    file: new File([''], 'filename'),
  });
  const [pendingUpload, setPendingUpload] = useState<string>('');
  const categoryOptions = useCompetitionCategories();

  const form = useForm<CompetitionSchemaType>({
    resolver: zodResolver(CompetitionSchema),
    defaultValues: {
      title: '',
      organizer: '',
      registrationStart: '',
      registrationDeadline: '',
      price: 0,
      registrationURL: '',
      sourceURL: '',
      categories: [],
    },
  });

  useEffect(() => {
    if (!isOpen) {
      form.reset();
      setImage({ url: '', file: new File([''], 'filename') });
    }
  }, [isOpen]);

  const postCompetition = useMutation({
    mutationFn: api.competitions.createCompetition.bind(api.competitions),
    onSuccess: () => {
      toast.success('Competition Posted!', { id: TOAST_ID });
      queryClient.invalidateQueries({ queryKey: ['competitions'] });
      setOpen(false);
      setPendingUpload('');
    },
    onError: () => toast.error('Failed to post competition', { id: TOAST_ID }),
  });

  const postMediaUpload = useMutation({
    mutationFn: api.media.createPresignedUrl.bind(api.media),
  });

  const onSubmit = async (values: CompetitionSchemaType) => {
    toast.loading('Please wait...', { id: TOAST_ID });

    try {
      if (!pendingUpload) {
        const presignedUrl: PresignedURL = await postMediaUpload.mutateAsync({
          requestBody: {
            fileName: image.file.name.split('.')[0],
            fileType: image.file.name.split('.').at(-1) ?? '',
          },
        });
        await fetch(presignedUrl.presignedUrl, {
          method: 'PUT',
          body: image.file,
        }).then(() =>
          setPendingUpload(() => {
            postCompetition.mutate({
              requestBody: {
                name: values.title,
                organizer: values.organizer,
                registrationStart: values.registrationStart,
                registrationDeadline: values.registrationDeadline,
                price: values.price ? values.price.toString() : '0',
                registrationUrl: values.registrationURL,
                sourceUrl: values.sourceURL,
                categories: values.categories.map(
                  (c) => c.title,
                ) as CompetitionCategories,
                mediaUrls: [presignedUrl.mediaUrl],
              },
            });
            return presignedUrl.mediaUrl;
          }),
        );
      } else {
        postCompetition.mutate({
          requestBody: {
            name: values.title,
            organizer: values.organizer,
            registrationStart: values.registrationStart,
            registrationDeadline: values.registrationDeadline,
            price: values.price ? values.price.toString() : '0',
            registrationUrl: values.registrationURL,
            sourceUrl: values.sourceURL,
            categories: values.categories.map(
              (c) => c.title,
            ) as CompetitionCategories,
            mediaUrls: [pendingUpload],
          },
        });
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed to post competition', { id: TOAST_ID });
    }
  };

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
