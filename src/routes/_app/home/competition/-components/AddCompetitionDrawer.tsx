import { useForm } from 'react-hook-form';
import {
  CategoryOptions,
  CompetitionSchema,
  CompetitionSchemaType,
} from '../-constants';
import { zodResolver } from '@hookform/resolvers/zod';
import DrawerForm from '~/components/drawer-form/DrawerForm';
import DrawerTextField from '~/components/drawer-form/DrawerTextField';
import DrawerDatePicker from '~/components/drawer-form/DrawerDatePicker';
import DrawerMultiSelect from '~/components/drawer-form/DrawerMultiSelect';
import { useEffect, useState } from 'react';
import PersonIcon from '~/assets/icons/competition/person.svg';
import MoneyIcon from '~/assets/icons/competition/money.svg';
import LinkIcon from '~/assets/icons/competition/link.svg';
import ClockIcon from '~/assets/icons/competition/clock.svg';
import CategoryIcon from '~/assets/icons/competition/category.svg';
import { useMutation } from '@tanstack/react-query';
import { api, queryClient } from '~/api/client';
import toast from 'react-hot-toast';
import { CompetitionCategories, PresignedURL } from '~/api/generated';
import DrawerAttachment from '~/components/drawer-form/DrawerAttachment';
import { FileUpload } from '~/routes/_app/add-announcement';

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
        }).then(() => setPendingUpload(presignedUrl.mediaUrl));
      }

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
    } catch (err) {
      console.log(err);
      toast.error('Failed to post competition', { id: TOAST_ID });
    }
  };

  return (
    <DrawerForm
      form={form}
      onSubmit={onSubmit}
      isOpen={isOpen}
      setOpen={setOpen}
      title="New Competition"
    >
      <DrawerTextField form={form} name="title" placeholder="Add Title" />
      <DrawerTextField
        icon={PersonIcon}
        form={form}
        name="organizer"
        placeholder="Add Organizer"
        inputClassName="py-3 text-base"
        iconClassName="size-6"
      />

      <DrawerDatePicker
        icon={ClockIcon}
        form={form}
        name="registrationStart"
        placeholder="Select Registration Start Date"
        iconClassName="size-6"
      />
      <DrawerDatePicker
        icon={ClockIcon}
        form={form}
        name="registrationDeadline"
        placeholder="Select Registration Deadline Date"
        iconClassName="size-6 opacity-0"
      />

      <DrawerMultiSelect
        icon={CategoryIcon}
        form={form}
        name="categories"
        options={CategoryOptions}
        placeholder="Choose Category"
        iconClassName="size-6"
      />

      <DrawerTextField
        type="number"
        icon={MoneyIcon}
        form={form}
        name="price"
        placeholder="Add Price"
        inputClassName="py-3 text-base"
        iconClassName="size-5"
      />
      <DrawerTextField
        icon={LinkIcon}
        form={form}
        name="registrationURL"
        placeholder="Add Registration Link"
        inputClassName="py-3 text-base"
        iconClassName="size-5"
      />
      <DrawerTextField
        icon={LinkIcon}
        form={form}
        name="sourceURL"
        placeholder="Add Source Link"
        inputClassName="py-3 text-base"
        iconClassName="size-5 opacity-0"
      />

      <DrawerAttachment
        icon={LinkIcon}
        image={image}
        setImage={setImage}
        placeholder="Add Attachment"
        iconClassName="size-5 opacity-0"
      />
    </DrawerForm>
  );
}
