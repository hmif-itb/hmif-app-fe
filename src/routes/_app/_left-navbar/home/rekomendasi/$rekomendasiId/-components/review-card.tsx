interface ReviewCardProps {
  review: {
    userName: string;
    userEmail: string;
    rating: number;
    review: string;
  };
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="rounded-lg bg-[#D9D9D9] p-4">
      <div className="flex items-start gap-3">
        {/* Profile */}
        <div className="shrink-0">
          <div className="flex size-10 items-center justify-center rounded-full bg-yellow-300">
            <span className="text-lg">{review.userName[0]}</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">{review.userName}</h3>
              <p className="text-xs text-gray-600">{review.userEmail}</p>
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={
                    i < review.rating
                      ? '/img/rekomendasi/rating-filled.svg'
                      : '/img/rekomendasi/rating-not-filled.svg'
                  }
                  alt={`star ${i + 1}`}
                  className="size-3"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="mt-2 break-words text-xs">{review.review}</p>
    </div>
  );
}
