import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type ImageCarouselProps = {
  images: string[];
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

        {/* Image */}
        <img
          src={images[currentIndex]}
          alt={`Prestasi image ${currentIndex + 1}`}
          className="size-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center gap-2 lg:gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`size-16 overflow-hidden rounded-lg transition-all lg:size-20 ${
              currentIndex === index
                ? 'ring-2 ring-[#2F754A] ring-offset-2'
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="size-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
