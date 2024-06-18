import clsx from 'clsx';
import { useState } from 'react';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from './ui/carousel';

export default function AskForInstall() {
  // return isiOS() ? <IOSInstall /> : null;
  return <IOSInstall />;
}

const iosImages = Array.from({ length: 5 }, (_, i) => i + 1).map(
  (i) => `/img/install/iphone${i}.png`,
);
const help = [
  "Click the 'Share' button",
  "Select 'Add to Home Screen'",
  "Select 'Add to Home Screen'",
  "Click 'Add'",
  'Welcome PIPS!',
];

function IOSInstall() {
  const height = Math.min(window.innerHeight, (926 / 428) * window.innerWidth);
  const width = (428 / 926) * height;
  const style = { height, width };
  const [selected, setSelected] = useState(0);
  const [api, setApi] = useState<CarouselApi>(undefined);

  return (
    <div className="bg-[#2F754A]">
      <Carousel
        className="relative mx-auto overflow-hidden"
        style={style}
        onSlideChange={setSelected}
        setApi={setApi}
      >
        <CarouselContent style={style}>
          {iosImages.map((src, i) => (
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
          {iosImages.map((_, i) => (
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
