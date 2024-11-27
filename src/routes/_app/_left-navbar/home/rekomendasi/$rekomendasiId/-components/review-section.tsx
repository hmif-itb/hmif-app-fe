import { Button } from '~/components/ui/button';
import { ReviewCard } from './review-card';

interface ReviewSectionProps {
  reviews: {
    userName: string;
    userEmail: string;
    rating: number;
    review: string;
  }[];
}

export function ReviewSection({ reviews }: ReviewSectionProps) {
  return (
    <div className="mt-6 w-full rounded-xl bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Reviews</h2>
        <Button className="flex w-2/5 items-center gap-2 border-2 border-black bg-[#E2C66F] text-sm hover:bg-[#e7d08d] lg:w-1/4 lg:text-lg">
          Post Review
          <img
            src="/img/rekomendasi/plus-circle.svg"
            alt="Plus"
            className="size-5"
          />
        </Button>
      </div>

      <hr className="my-4 border-black" />

      <div className="space-y-4">
        {reviews.map((review, idx) => (
          <ReviewCard key={idx} review={review} />
        ))}
      </div>
    </div>
  );
}
