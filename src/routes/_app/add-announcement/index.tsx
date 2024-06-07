import { Form } from '~/components/ui/form';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { cn } from '~/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { api } from '~/api/client';
import { FormSchema, FormSchemaType } from './-constants';
import TopSection from './-components/TopSection';
import Headline from './-components/Headline';
import Content from './-components/Content';
import Categories from './-components/Categories';
import MediaInput from './-components/MediaInput';
import { PresignedURL } from '~/api/generated';
import { useState } from 'react';

export const Route = createFileRoute('/_app/add-announcement/')({
  component: AddAnnouncementPage,
});

export type ImageUpload = {
  url: string;
  file: File;
};

function AddAnnouncementPage(): JSX.Element {
  const [images, setImages] = useState<ImageUpload[]>([]);
  const navigate = useNavigate();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      headline: '',
      announcement: '',
      categories: [],
    },
  });

  const postInfo = useMutation({
    mutationFn: api.info.createInfo.bind(api.info),
    onSuccess: () => navigate({ to: '/home' }),
  });

  const postMediaUpload = useMutation({
    mutationFn: api.media.createPresignedUrl.bind(api.media),
  });

  const onSubmit = async (values: FormSchemaType) => {
    const presignedUrls: PresignedURL[] = [];
    for (const image of images) {
      try {
        const media = await postMediaUpload.mutateAsync({
          requestBody: {
            fileName: image.file.name.split('.')[0],
            fileType: image.file.name.split('.')[1],
          },
        });
        presignedUrls.push(media);
      } catch (err) {
        console.error(err);
      }
    }

    postInfo.mutate({
      requestBody: {
        title: values.headline,
        content: values.announcement,
        forCategories: values.categories
          .filter((c) => c.type === 'KATEGORI')
          .map((c) => c.id),
        mediaUrls: presignedUrls.map((p) => p.mediaUrl),
      },
    });
  };

  return (
    <main className="relative min-h-[calc(100vh-89px)] py-9 font-inter">
      <Form {...form}>
        <form
          className="max-h-full overflow-y-auto"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <TopSection form={form} />
          <Headline form={form} />
          <Content form={form} />
          <Categories form={form} />

          <section className={cn(images.length > 0 && 'p-5')}>
            {images.map((image, idx) => (
              <img
                key={idx}
                src={image.url}
                alt="Preview image"
                className="aspect-auto w-full overflow-hidden rounded-2xl"
              />
            ))}
          </section>
        </form>
      </Form>

      <MediaInput images={images} setImages={setImages} />
    </main>
  );
}
