import { useState } from 'react';
import { useLocationCategories } from './-useLocationCategories';
import { useForm } from 'react-hook-form';
import { VoucherSchema, VoucherSchemaType} from './-constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { api, queryClient } from '~/api/client';
import toast from 'react-hot-toast';
import { PresignedURL } from '~/api/generated';
import { FileUpload } from '../../add-announcement';

const TOAST_ID = 'add-voucher-toast';

type ComponentProps = {
  onSubmitSuccess?: () => void;
};

export default function useVoucher(props: Readonly<ComponentProps>) {
  const { onSubmitSuccess } = props;

  const [image, setImage] = useState<FileUpload | null>(null);
  const [pendingUpload, setPendingUpload] = useState<string | null>(null);
  const categoryOptions = useLocationCategories();

  const form = useForm<VoucherSchemaType>({
    resolver: zodResolver(VoucherSchema),
    defaultValues: {
      title: '',
      imageURL: '',
      link: '',
      periodeAkhir: '',
      periodeAwal: '',
      description: '',
    },
  });

  const postVoucher = useMutation({
    mutationFn: api.recommendation.createVoucher.bind(api.recommendation),
    onSuccess: () => {
      toast.success('Voucher Posted!', { id: TOAST_ID });
      queryClient.invalidateQueries({ queryKey: ['voucher'] });
      setPendingUpload('');
      onSubmitSuccess?.();
    },
    onError: () => toast.error('Failed to post voucher', { id: TOAST_ID }),
  });

  const postMediaUpload = useMutation({
    mutationFn: api.media.createPresignedUrl.bind(api.media),
  });

  const onSubmit = async (values: VoucherSchemaType) => {
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
            postVoucher.mutate({
              requestBody: {
                title: values.title,
                link: values.link,
                periodeAkhir: values.periodeAkhir,
                periodeAwal: values.periodeAwal,
                imageURL: [presignedUrl.mediaUrl],
              },
            });
            return presignedUrl.mediaUrl;
          }),
        );
      } else {
        postVoucher.mutate({
          requestBody: {
            title: values.title,
            link: values.link,
            periodeAwal: values.periodeAwal,
            periodeAkhir: values.periodeAkhir,
            description: values.description,
            imageURL: pendingUpload ? [pendingUpload] : [],
          },
        });
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed to post Voucher', { id: TOAST_ID });
    }
  };

  return { form, onSubmit, image, setImage };
}

