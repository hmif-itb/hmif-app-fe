import { useRef } from 'react';
import { Button } from '~/components/ui/button';
import CameraIcon from '~/assets/icons/add-announcement/camera.svg';
import GalleryIcon from '~/assets/icons/add-announcement/gallery.svg';
import ClipIcon from '~/assets/icons/add-announcement/clip.svg';
import { ImageUpload } from '..';

type ComponentProps = {
  images: ImageUpload[];
  setImages: React.Dispatch<React.SetStateAction<ImageUpload[]>>;
};

export default function MediaInput({
  images,
  setImages,
}: ComponentProps): JSX.Element {
  const galleryInputEl = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <div className="absolute bottom-0 left-0 flex w-full items-center border-t border-[#EBEEB] bg-white px-5">
        <Button variant="link" size="icon-md">
          <img src={CameraIcon} alt="Take a picture" className="size-6" />
        </Button>
        <Button
          variant="link"
          size="icon-md"
          onClick={() => galleryInputEl.current?.click()}
        >
          <img src={GalleryIcon} alt="Upload from gallery" className="size-6" />
        </Button>
        <Button variant="link" size="icon-md">
          <img src={ClipIcon} alt="Attach a file" className="size-6" />
        </Button>
      </div>

      <input
        ref={galleryInputEl}
        type="file"
        name="gallery-input"
        id="gallery-input"
        hidden
        accept="image/*"
        onChange={(e) => {
          if (!e.target.files) return;
          setImages([
            ...images,
            ...Array.from(e.target.files).map((f) => ({
              url: URL.createObjectURL(f),
              file: f,
            })),
          ]);
        }}
      />
    </>
  );
}
