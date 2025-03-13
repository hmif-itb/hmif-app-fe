import { useEffect, useState } from 'react';
import FormTextField from '~/components/custom-form/fields/FormTextField';
import { StarRating } from '~/components/custom-form/fields/StarRating';
import MobileForm from '~/components/custom-form/MobileForm';
import useAddReview from '../-useAddReview';

type ComponentProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  place: string;
};

export function AddReviewDrawer(props: Readonly<ComponentProps>) {
  const { isOpen, setOpen, place } = props;
  const [rating, setRating] = useState(0);

  const { form, onSubmit } = useAddReview({
    onSubmitSuccess: () => setOpen(false),
  });

  useEffect(() => {
    if (!isOpen) {
      form.reset();
      setRating(0);
    }
  }, [isOpen]);

  useEffect(() => {
    form.setValue('rating', rating);
  }, [rating]);

  return (
    <MobileForm
      form={form}
      onSubmit={onSubmit}
      isOpen={isOpen}
      setOpen={setOpen}
      title={'Review: ' + place}
    >
      <div className="m-2 flex items-start gap-3">
        {/* Profile */}
        <div className="shrink-0">
          <div className="flex size-10 items-center justify-center rounded-full bg-yellow-300">
            <span className="text-lg">J</span>
          </div>
        </div>
        <div className="w-[70vw]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Jeremy Deandito</h3>
              <p className="text-xs text-gray-600">
                18222xxx@std.stei.itb.ac.id {rating}
              </p>
            </div>
          </div>
        </div>
      </div>
      <StarRating rating={rating} setRating={setRating} />
      <FormTextField
        form={form}
        name="review"
        placeholder="Add a review about this place"
        growable={true}
        growableMaxLength={500}
      />
    </MobileForm>
  );
}
