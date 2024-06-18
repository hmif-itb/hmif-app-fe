import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '~/api/client';
import { PresignedURL } from '~/api/generated';
import DocumentIcon from '~/assets/icons/add-announcement/document.svg';
import { Form } from '~/components/ui/form';
import { cn } from '~/lib/utils';
import Categories from './-components/Categories';
import Content from './-components/Content';
import Headline from './-components/Headline';
import MediaInput from './-components/MediaInput';
import TopSection from './-components/TopSection';
import { FormSchema, FormSchemaType } from './-constants';

export const Route = createFileRoute('/_app/add-announcement/')({
  component: AddAnnouncementPage,
});

export type FileUpload = {
  url: string;
  file: File;
};

function AddAnnouncementPage(): JSX.Element {
  const [images, setImages] = useState<FileUpload[]>([]);
  const [files, setFiles] = useState<FileUpload[]>([]);

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
    try {
      const presignedUrls: PresignedURL[] = await Promise.all(
        images.map((i) =>
          postMediaUpload.mutateAsync({
            requestBody: {
              fileName: i.file.name.split('.')[0],
              fileType: i.file.name.split('.').at(-1) ?? '',
            },
          }),
        ),
      );
      await Promise.all(
        presignedUrls.map((p, idx) =>
          fetch(p.presignedUrl, {
            method: 'PUT',
            body: images[idx].file,
          }),
        ),
      );

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
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="relative h-full py-9 font-inter">
      <Form {...form}>
        <form
          className="max-h-full overflow-y-auto"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <TopSection form={form} />
          <Headline form={form} />
          <Content form={form} />
          <Categories form={form} />

          <section
            className={cn(
              (images.length > 0 || files.length > 0) &&
                'flex flex-col gap-1.5 p-5',
            )}
          >
            {files.map((file, idx) => (
              <a
                href={URL.createObjectURL(file.file)}
                target="_blank"
                key={idx}
                className="flex w-full items-center gap-2 rounded-xl bg-[#DCDCDC] p-4"
              >
                <img
                  src={DocumentIcon}
                  alt="Uploaded File"
                  className="size-8"
                />
                <p className="text-sm font-semibold">{file.file.name}</p>
                {file.file.webkitRelativePath}
              </a>
            ))}
            {images.map((image, idx) => (
              <img
                key={idx}
                src={image.url}
                alt="Preview image"
                className="aspect-auto w-full overflow-hidden rounded-2xl object-cover"
              />
            ))}
          </section>
        </form>
      </Form>

      <MediaInput
        images={images}
        setImages={setImages}
        files={files}
        setFiles={setFiles}
      />
    </main>
  );
}
