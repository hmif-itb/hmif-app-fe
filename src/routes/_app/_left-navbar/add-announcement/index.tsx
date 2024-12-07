import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { api } from '~/api/client';
import { INFO_LIST_QUERY_KEY } from '~/api/constants';
import { PresignedURL } from '~/api/generated';
import DocumentIcon from '~/assets/icons/add-announcement/document.svg';
import { Form } from '~/components/ui/form';
import { deleteSharedData, getSharedData } from '~/lib/share-db';
import { cn } from '~/lib/utils';
import Categories from './-components/Categories';
import Content from './-components/Content';
import Headline from './-components/Headline';
import MediaInput from './-components/MediaInput';
import TopSection from './-components/TopSection';
import { FormSchema, FormSchemaType } from './-constants';

export const Route = createFileRoute('/_app/_left-navbar/add-announcement/')({
  component: AddAnnouncementPage,
  onLeave() {
    deleteSharedData();
  },
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

  const { data: sharedData } = useQuery({
    queryKey: ['shareddata'],
    staleTime: 0,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    networkMode: 'always',
    queryFn: getSharedData,
  });

  const setValue = form.setValue;

  useEffect(() => {
    if (sharedData) {
      setValue('headline', sharedData.title);
      setValue('announcement', sharedData.text);
      setFiles(
        sharedData.images?.map((image) => {
          const file = new File([image.data], image.name, { type: image.type });
          return { url: URL.createObjectURL(file), file };
        }) ?? [],
      );
    }
  }, [sharedData, setValue]);

  const queryClient = useQueryClient();

  const mobileHandleSuccess = () => navigate({ to: '/timeline' });
  const desktopHandleSuccess = () =>
    navigate({ search: (prev:any) => ({ ...prev, showAnnounce: undefined }) });

  const postInfo = useMutation({
    mutationFn: api.info.createInfo.bind(api.info),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INFO_LIST_QUERY_KEY] });
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
          forAngkatan: values.categories
            .filter((c) => c.type === 'ANGKATAN')
            .map((c) => c.id),
          forGroups: values.categories
            .filter((c) => c.type === 'GROUP')
            .map((c) => c.id),
          mediaUrls: pendingUpload,
        },
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to announce', { id: TOAST_ID });
    }
  };

  const deleteById = (images: boolean, idx: number) => {
    images
      ? setImages((prev:any) => {
          return prev.filter((image, index) => index !== idx);
        })
      : setFiles((prev:any => {
          return prev.filter((file, index) => index !== idx);
        });
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
          noValidate
        >
          <TopSection
            form={form}
            isMutating={postInfo.isPending}
            isDialog={isDesktop}
          />
          <Headline form={form} isDesktop={isDesktop} />
          <Content form={form} isDesktop={isDesktop} />
          <Categories form={form} isDesktop={isDesktop} />
          {/* <ImageSection images={images} /> */}

          <section
            className={cn(
              isDesktop && 'max-h-[15vw] w-[62vw] overflow-y-scroll',
            )}
          >
            <ul
              className={cn(
                (images.length > 0 || files.length > 0) &&
                  'flex flex-col gap-1.5 p-5',
              )}
            >
              <div className="mb-4 flex gap-2 overflow-x-auto">
                {images.map((image, idx) => (
                  <div key={idx} className="relative">
                    <a href={URL.createObjectURL(image.file)} target="_blank">
                      <img
                        src={image.url}
                        alt="Preview image"
                        className="aspect-auto size-36 min-w-36 flex-nowrap overflow-hidden rounded-2xl border object-cover"
                      />
                    </a>
                    <button
                      className="absolute right-2.5 top-2.5 rounded-full border-2 border-black bg-gray-300"
                      onClick={() => deleteById(true, idx)}
                    >
                      <XIcon className="size-5 rounded-full" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mb-4 flex flex-col gap-2">
                {files.map((file, idx) => (
                  <div key={idx} className="relative">
                    <a
                      href={URL.createObjectURL(file.file)}
                      target="_blank"
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
                    <button
                      className="absolute right-5 top-5 rounded-full"
                      onClick={() => deleteById(false, idx)}
                    >
                      <XIcon className="size-6 rounded-full border-black hover:border-2" />
                    </button>
                  </div>
                ))}
              </div>
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
