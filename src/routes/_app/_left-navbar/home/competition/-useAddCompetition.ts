import { useState } from 'react';
import { useCompetitionCategories } from './-useCompetitionCategories';
import { useForm } from 'react-hook-form';
import { CompetitionSchema, CompetitionSchemaType } from './-constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { api, queryClient } from '~/api/client';
import toast from 'react-hot-toast';
import { CompetitionCategories, PresignedURL } from '~/api/generated';
import { FileUpload } from '../../add-announcement';

const TOAST_ID = 'add-competition-toast';

type ComponentProps = {
  onSubmitSuccess?: () => void;
};

export default function useAddCompetition(props: Readonly<ComponentProps>) {
  const { onSubmitSuccess } = props;

  const [image, setImage] = useState<FileUpload | null>(null);
  const [pendingUpload, setPendingUpload] = useState<string | null>(null);
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

  const postCompetition = useMutation({
    mutationFn: api.competitions.createCompetition.bind(api.competitions),
    onSuccess: () => {
      toast.success('Competition Posted!', { id: TOAST_ID });
      queryClient.invalidateQueries({ queryKey: ['competitions'] });
      setPendingUpload('');
      onSubmitSuccess?.();
    },
    onError: () => toast.error('Failed to post competition', { id: TOAST_ID }),
  });

  const postMediaUpload = useMutation({
    mutationFn: api.media.createPresignedUrl.bind(api.media),
  });

  const onSubmit = async (values: CompetitionSchemaType) => {
    toast.loading('Please wait...', { id: TOAST_ID });

    try {
      if (!pendingUpload && image) {
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
            mediaUrls: pendingUpload ? [pendingUpload] : [],
          },
        });
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed to post competition', { id: TOAST_ID });
    }
  };

  return { categoryOptions, form, onSubmit, image, setImage };
}
