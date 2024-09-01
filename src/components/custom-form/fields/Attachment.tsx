import { useRef } from 'react';
import { FileUpload } from '~/routes/_app/_left-navbar/add-announcement';
import { Button } from '../../ui/button';
import clsx from 'clsx';
import { XIcon } from 'lucide-react';

type ComponentProps = {
  image: FileUpload;
  setImage: React.Dispatch<React.SetStateAction<FileUpload>>;
  placeholder: string;
  className?: string;
  icon?: string;
  iconClassName?: string;
};

export default function Attachment(props: Readonly<ComponentProps>) {
  const { image, setImage, placeholder, className, icon, iconClassName } =
    props;

  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  if (image.url) {
    return (
      <div className="relative w-full p-3 lg:px-0">
        <a href={URL.createObjectURL(image.file)} target="_blank">
          <img
            src={image.url}
            alt="Preview image"
            className="aspect-[3/4] w-full overflow-hidden rounded-2xl border object-cover"
          />
        </a>
        <button
          className="absolute right-2.5 top-2.5 rounded-full border-2 border-black bg-gray-300 lg:right-0"
          onClick={() =>
            setImage({ url: '', file: new File([''], 'filename') })
          }
        >
          <XIcon className="size-5 rounded-full" />
        </button>
      </div>
    );
  } else {
    return (
      <>
        <div className="flex items-center gap-3 p-4">
          {icon && <img src={icon} alt="" className={iconClassName} />}
          <Button
            type="button"
            variant="link"
            className={clsx(
              'w-full justify-start p-0 text-base font-normal text-[#64748B]',
              className,
            )}
            onClick={() => galleryInputRef.current?.click()}
          >
            {placeholder}
          </Button>
        </div>

        <input
          ref={galleryInputRef}
          type="file"
          name="gallery-input"
          id="gallery-input"
          hidden
          accept="image/*"
          onChange={(e) => {
            if (!e.target.files) return;
            setImage({
              url: URL.createObjectURL(e.target.files[0]),
              file: e.target.files[0],
            });
          }}
        />
      </>
    );
  }
}
