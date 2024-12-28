import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ReviewSchema, ReviewSchemaType } from './-constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
// import { api, queryClient } from '~/api/client';
import toast from 'react-hot-toast';

const TOAST_ID = 'add-review-toast';

type ComponentProps = {
  onSubmitSuccess?: () => void;
};

export default function useAddReview(props: Readonly<ComponentProps>) {
  const { onSubmitSuccess } = props;

  const [pendingUpload, setPendingUpload] = useState<string | null>(null);
  //   const categoryOptions = useCompetitionCategories();

  const form = useForm<ReviewSchemaType>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      review: '',
      rating: 0,
    },
  });

  const postReview = useMutation({
    // mutationFn: api.reviews.createReview.bind(api.reviews),
    // onSuccess: () => {
    //   toast.success('Review Posted!', { id: TOAST_ID });
    //   queryClient.invalidateQueries({ queryKey: ['reviews'] });
    //   setPendingUpload('');
    //   onSubmitSuccess?.();
    // },
    // onError: () => toast.error('Failed to post review', { id: TOAST_ID }),
  });

  const onSubmit = async (values: ReviewSchemaType) => {
    toast.loading('Please wait...', { id: TOAST_ID });

    try {
      //   postReview.mutate({
      //     requestBody: {
      //       review: values.review,
      //         rating: values.rating,
      //       },
      //     });
    } catch (err) {
      console.log(err);
      toast.error('Failed to post review', { id: TOAST_ID });
    }
  };

  return { form, onSubmit };
}
