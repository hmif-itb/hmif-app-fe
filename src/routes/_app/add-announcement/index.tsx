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
import toast from 'react-hot-toast';

export const Route = createFileRoute('/_app/add-announcement/')({
  component: AddAnnouncementPage,
});

export type FileUpload = {
  url: string;
  file: File;
};

type ComponentProps = {
  isDesktop?: boolean;
};

const TOAST_ID = 'add-announcement-toast';

export function AddAnnouncementPage({
  isDesktop,
}: ComponentProps): JSX.Element {
  const [images, setImages] = useState<FileUpload[]>([]);
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [pendingUpload, setPendingUpload] = useState<string[]>([]);

  const navigate = useNavigate();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      headline: '',
      announcement: '',
      categories: [],
    },
  });

  const mobileHandleSuccess = () => navigate({ to: '/home' });
  const desktopHandleSuccess = () =>
    navigate({ search: (prev) => ({ ...prev, showAnnounce: undefined }) });

  const postInfo = useMutation({
    mutationFn: api.info.createInfo.bind(api.info),
    onSuccess: () => {
      toast.success('Announced!', { id: TOAST_ID });
      setPendingUpload([]);
      setTimeout(isDesktop ? desktopHandleSuccess : mobileHandleSuccess, 1000);
    },
    onError: () => toast.error('Failed to announce', { id: TOAST_ID }),
  });

  const postMediaUpload = useMutation({
    mutationFn: api.media.createPresignedUrl.bind(api.media),
  });

  const onSubmit = async (values: FormSchemaType) => {
    if (!values.categories.some((c) => c.type === 'KATEGORI')) {
      return toast.error('Please select at least one category', {
        id: TOAST_ID,
      });
    }

    toast.loading('Please wait...', { id: TOAST_ID });
    try {
      if (pendingUpload.length === 0) {
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
            }).then(() => pendingUpload.push(p.mediaUrl)),
          ),
        );
      }

      postInfo.mutate({
        requestBody: {
          title: values.headline,
          content: values.announcement,
          forCategories: values.categories
            .filter((c) => c.type === 'KATEGORI')
            .map((c) => c.id),
          mediaUrls: pendingUpload,
        },
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to announce', { id: TOAST_ID });
    }
  };

  return (
    <main
      className={cn(
        'relative h-full font-inter',
        isDesktop ? 'pb-2 pt-7' : 'py-9',
      )}
    >
      <Form {...form}>
        <form
          className="max-h-full overflow-y-auto"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <TopSection
            form={form}
            isMutating={postInfo.isPending}
            isDialog={isDesktop}
          />
          <Headline form={form} isDesktop={isDesktop} />
          <Content form={form} isDesktop={isDesktop} />
          <Categories form={form} isDesktop={isDesktop} />

          <section
            className={cn(isDesktop && 'max-h-[15vw] overflow-y-scroll')}
          >
            <ul
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
            </ul>
          </section>
        </form>
      </Form>

      <MediaInput
        images={images}
        setImages={setImages}
        files={files}
        setFiles={setFiles}
        isDesktop={isDesktop}
      />
    </main>
  );
}
