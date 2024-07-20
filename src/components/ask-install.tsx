import clsx from 'clsx';
import { useState } from 'react';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from './ui/carousel';
import { isiOS } from '~/lib/device';

export default function AskForInstall() {
  const isIos = isiOS();
  return <InstallTutorial isIos={isIos} />;
}

const iosImages = Array.from({ length: 5 }, (_, i) => i + 1).map(
  (i) => `/img/install/iphone${i}.png`,
);
const iosHelp = [
  "Click the 'Share' button",
  "Select 'Add to Home Screen'",
  "Select 'Add to Home Screen'",
  "Click 'Add'",
  'Welcome PIPS!',
];
const iosDimensions = { height: 926, width: 428 };

const androidImages = Array.from({ length: 4 }, (_, i) => i + 1).map(
  (i) => `/img/install/android${i}.png`,
);
const androidHelp = [
  'Click the three dots button',
  'Select "Add to Home Screen" option',
  'Select the "Install" option',
  'Select the "Install" option',
];
const androidDimensions = { height: 916, width: 412 };

function InstallTutorial({ isIos }: { isIos: boolean }) {
  const dimensions = isIos ? iosDimensions : androidDimensions;
  const height = Math.min(
    window.innerHeight,
    (dimensions.height / dimensions.width) * window.innerWidth,
  );
  const width = (dimensions.width / dimensions.height) * height;
  const style = { height, width };
  const [selected, setSelected] = useState(0);
  const [api, setApi] = useState<CarouselApi>(undefined);

  const images = isIos ? iosImages : androidImages;
  const help = isIos ? iosHelp : androidHelp;

  return (
    <div className="bg-[#2F754A]">
      <Carousel
        className="relative mx-auto overflow-hidden"
        style={style}
        onSlideChange={setSelected}
        setApi={setApi}
      >
        <CarouselContent>
          {images.map((src, i) => (
            <CarouselItem key={src} className="relative flex flex-col">
              <img
                src={src}
                alt={'install ' + i + 1}
                style={{ width, height: height - 50 }}
              />
              <div className="flex flex-1 flex-col justify-center pb-[10px] text-center text-sm font-medium text-white">
                {help[i]}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-[8px] flex w-full items-center justify-center space-x-2 opacity-60">
          {images.map((_, i) => (
            <button
              className={clsx(
                'size-[8px] rounded-full',
                selected === i ? 'bg-white' : 'bg-gray-300',
              )}
              onClick={() => api?.scrollTo(i)}
            ></button>
          ))}
        </div>
      </Carousel>
    </div>
  );
}
