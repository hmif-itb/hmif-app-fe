import { useEffect, useState } from 'react';
import { Info } from '~/api/generated';
import ArrowRightIcon from '~/assets/icons/timeline/arrow-right.svg';
import { Dialog, DialogContent } from '~/components/ui/dialog';
import { Button } from '../ui/button';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '../ui/carousel';
import { InfoPhotos } from './info-photos';

export function InfoPhotosCarousel({
  medias,
}: {
  medias: NonNullable<Info['infoMedias']>;
}) {
  const [imageIdx, setImageIdx] = useState(-1);
  const [api, setApi] = useState<CarouselApi>(undefined);

  useEffect(() => {
    if (api && imageIdx !== -1) {
      api.scrollTo(imageIdx, true);
    }
  }, [api, imageIdx]);
  return (
    <Dialog
      open={imageIdx !== -1}
      onOpenChange={(val) => {
        if (!val) {
          setImageIdx(-1);
        } else {
          setImageIdx(0);
        }
      }}
    >
      <div>
        <InfoPhotos
          images={medias.map((media) => media.media.url)}
          onImageClick={(idx) => setImageIdx(idx)}
        />
      </div>
      <DialogContent
        className="max-w-full overflow-hidden border-none bg-transparent p-0 shadow-none"
        hideCloseButton
        onClick={() => setImageIdx(-1)}
      >
        <Carousel
          className="relative flex h-fit justify-center"
          setApi={setApi}
        >
          <Button
            onClick={(e) => {
              e.stopPropagation();
              api?.scrollPrev();
            }}
            className="absolute left-2 top-1/2 z-10 aspect-square -translate-y-1/2 rotate-180 rounded-full bg-black/50 p-2"
          >
            <img src={ArrowRightIcon} alt="Prev" className="size-14" />
          </Button>
          <CarouselContent>
            {medias.map((media, idx) => (
              <CarouselItem
                key={idx}
                className="flex max-h-[90vh] justify-center lg:max-h-[80vh]"
              >
                <img
                  onClick={(e) => e.stopPropagation()}
                  src={media.media.url}
                  className="max-h-full object-contain"
                  alt=""
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              api?.scrollNext();
            }}
            className="absolute right-2 top-1/2 z-10 aspect-square -translate-y-1/2 rounded-full bg-black/50 p-2"
          >
            <img src={ArrowRightIcon} alt="Next" className="size-14" />
          </Button>
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
