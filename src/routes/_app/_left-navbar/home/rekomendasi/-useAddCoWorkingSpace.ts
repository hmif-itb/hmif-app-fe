import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CoWorkingSpaceSchema, CoWorkingSpaceSchemaType } from './-constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { api, queryClient } from '~/api/client';
import toast from 'react-hot-toast';
import { PresignedURL } from '~/api/generated';
import { FileUpload } from '../../add-announcement';

const TOAST_ID = 'add-coworkingspace-toast';

type ComponentProps = {
  onSubmitSuccess?: () => void;
};

export default function useAddCoWorkingSpace(props: Readonly<ComponentProps>) {
  const { onSubmitSuccess } = props;

  const [image, setImage] = useState<FileUpload | null>(null);
  const [pendingUpload, setPendingUpload] = useState<string | null>(null);

  const form = useForm<CoWorkingSpaceSchemaType>({
    resolver: zodResolver(CoWorkingSpaceSchema),
    defaultValues: {
      title: '',
      imageURL: '',
      location: '',
      address: '',
      mapsURL: '',
      description: '',
    },
  });

  const postCoWorkingSpace = useMutation({
    mutationFn: api.recommendation.createCoWorkingSpace.bind(
      api.recommendation,
    ),
    onSuccess: () => {
      toast.success('CoWorkingSpace Posted!', { id: TOAST_ID });
      queryClient.invalidateQueries({ queryKey: ['coworkingspace'] });
      setPendingUpload('');
      onSubmitSuccess?.();
    },
    onError: () =>
      toast.error('Failed to post CoWorkingSpace', { id: TOAST_ID }),
  });

  const postMediaUpload = useMutation({
    mutationFn: api.media.createPresignedUrl.bind(api.media),
  });

  const onSubmit = async (values: CoWorkingSpaceSchemaType) => {
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
            postCoWorkingSpace.mutate({
              requestBody: {
                title: values.title,
                address: values.address,
                mapsURL: values.mapsURL,
                description: values.description,
                location: values.location,
                imageURL: presignedUrl.mediaUrl,
              },
            });
            return presignedUrl.mediaUrl;
          }),
        );
      } else {
        postCoWorkingSpace.mutate({
          requestBody: {
            title: values.title,
            address: values.address,
            mapsURL: values.mapsURL,
            description: values.description,
            location: values.location,
            imageURL: pendingUpload ? pendingUpload : '',
          },
        });
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed to post CoWorkingSpace', { id: TOAST_ID });
    }
  };

  return { form, onSubmit, image, setImage };
}
