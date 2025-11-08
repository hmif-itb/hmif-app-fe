import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  ExternalLink,
} from 'lucide-react';

type ImageCarouselProps = {
  images: string[];
};

const isPDF = (url: string): boolean => {
  return (
    url.toLowerCase().includes('.pdf') || url.toLowerCase().includes('pdf')
  );
};

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-200 lg:aspect-[4/3]">
        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-3 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-lg transition-all hover:bg-white lg:size-10"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} className="text-gray-700 lg:size-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-3 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-lg transition-all hover:bg-white lg:size-10"
          aria-label="Next image"
        >
          <ChevronRight size={20} className="text-gray-700 lg:size-6" />
        </button>

        {/* Image or PDF */}
        {isPDF(images[currentIndex]) ? (
          <div className="relative size-full">
            <iframe
              src={images[currentIndex]}
              className="size-full border-0"
              title={`PDF Document ${currentIndex + 1}`}
            />
            {/* Fallback button in case iframe doesn't work */}
            <button
              onClick={() => window.open(images[currentIndex], '_blank')}
              className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-[#2F754A]/90 px-3 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-[#245a39]/90"
            >
              <ExternalLink size={14} />
              Open
            </button>
          </div>
        ) : (
          <img
            src={images[currentIndex]}
            alt={`Prestasi image ${currentIndex + 1}`}
            className="size-full object-cover"
          />
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center gap-2  lg:gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`size-16 overflow-hidden rounded-lg bg-gray-200 transition-all lg:size-20${
              currentIndex === index
                ? 'ring-2 ring-[#2F754A] ring-offset-2'
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            {isPDF(image) ? (
              <div className="flex size-full flex-col items-center justify-center bg-gray-100">
                <FileText size={20} className="text-gray-500" />
                <span className="mt-1 text-[0.6rem] text-gray-500">PDF</span>
              </div>
            ) : (
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="size-full object-cover text-[0.7rem]"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
