import { useRef, useState } from 'react';
import { Button } from '~/components/ui/button';
import CameraIcon from '~/assets/icons/add-announcement/camera.svg';
import GalleryIcon from '~/assets/icons/add-announcement/gallery.svg';
import ClipIcon from '~/assets/icons/add-announcement/clip.svg';
import { FileUpload } from '..';
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog';
import Webcam from 'react-webcam';
import dataURLtoFile from '~/lib/dataURLtoFile';
import { cn } from '~/lib/utils';

type ComponentProps = {
  images: FileUpload[];
  setImages: React.Dispatch<React.SetStateAction<FileUpload[]>>;
  files: FileUpload[];
  setFiles: React.Dispatch<React.SetStateAction<FileUpload[]>>;
  isDesktop?: boolean;
};

export default function MediaInput({
  images,
  setImages,
  files,
  setFiles,
  isDesktop,
}: ComponentProps): JSX.Element {
  const [captureOpen, setCaptureOpen] = useState<boolean>(false);

  const galerryInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const webcamRef = useRef<Webcam | null>(null);

  return (
    <>
      <div
        className={cn(
          'flex w-full items-center border-t border-[#EBEEEB] bg-white px-5',
          !isDesktop && 'absolute bottom-20 left-0',
        )}
      >
        <Dialog open={captureOpen} onOpenChange={setCaptureOpen}>
          <DialogTrigger asChild>
            <Button variant="link" size="icon-md">
              <img src={CameraIcon} alt="Take a picture" className="size-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="flex max-w-[85vw] flex-col items-center gap-4 rounded-3xl pt-10">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="z-10 overflow-hidden rounded-2xl"
            />
            <Button
              size="icon-md"
              variant="outlined"
              onClick={() => {
                if (!webcamRef.current) return;
                const dataString = webcamRef.current.getScreenshot();
                if (dataString) {
                  const file = dataURLtoFile(dataString, 'image.jpg');
                  setImages([
                    ...images,
                    {
                      url: URL.createObjectURL(file),
                      file,
                    },
                  ]);
                  setCaptureOpen(false);
                }
              }}
            >
              <img src={CameraIcon} alt="Take a picture" className="size-6" />
            </Button>
          </DialogContent>
        </Dialog>
        <Button
          variant="link"
          size="icon-md"
          onClick={() => galerryInputRef.current?.click()}
        >
          <img src={GalleryIcon} alt="Upload from gallery" className="size-6" />
        </Button>
        <Button
          variant="link"
          size="icon-md"
          onClick={() => fileInputRef.current?.click()}
        >
          <img src={ClipIcon} alt="Attach a file" className="size-6" />
        </Button>
      </div>

      <input
        ref={galerryInputRef}
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

      <input
        ref={fileInputRef}
        type="file"
        name="file-input"
        id="file-input"
        hidden
        onChange={(e) => {
          if (!e.target.files) return;
          setFiles([
            ...files,
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
