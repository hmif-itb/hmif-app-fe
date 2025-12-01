type StarRatingProps = {
  rating: number;
  setRating: (rating: number) => void;
};

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  setRating,
}) => {
  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  return (
    <div className="my-2 flex justify-center">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleStarClick(i)}
            className="flex justify-center focus:outline-none"
          >
            <img
              src={
                i < rating
                  ? '/img/rekomendasi/rating-filled.svg'
                  : '/img/rekomendasi/rating-not-filled.svg'
              }
              alt={`star ${i + 1}`}
              className="size-10"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
