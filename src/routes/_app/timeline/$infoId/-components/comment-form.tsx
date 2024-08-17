import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { api } from '~/api/client';
import { Button } from '~/components/ui/button';
import { Form, FormItem, FormControl } from '~/components/ui/form';
import Avatar from '~/components/user/avatar';
import useSession from '~/hooks/auth/useSession';
import { ICommentFormValues } from '../-interface/comment-form-values';
import { ICommentFormProps } from '../-interface/comment-form-props';
import CommentCameraButton from './comment-camera-button';
import CommentImageButton from './comment-image-button';
import CommentFileButton from './comment-file-button';

const TOAST_ID = 'comment-form-toast';

function CommentForm({ repliedInfoId }: ICommentFormProps) {
  const user = useSession();
  const [, setSelectedFile] = useState<File | null>(null);

  const formMethods = useForm({
    defaultValues: {
      comment: '',
    },
  });

  const handleImageCapture = async (blob: Blob) => {
    const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
    setSelectedFile(file);
  };

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
  };

  const onSubmit: SubmitHandler<ICommentFormValues> = async (data) => {
    if (!user) {
      return toast.error('Please log in to your account', {
        id: TOAST_ID,
      });
    }

    const commentData = {
      id: '', // idk how i should generate the ID, sorry.
      repliedInfoId: repliedInfoId,
      creatorId: user.id,
      content: data.comment,
      createdAt: new Date().toISOString(),
      creator: {
        id: user.id,
        nim: user.nim,
        email: user.email,
        fullName: user.fullName,
        major: user.major,
        picture: user.picture,
        region: user.region,
        angkatan: user.angkatan,
        gender: user.gender,
        membershipStatus: user.membershipStatus,
      },
    };

    try {
      await api.comment.postComment({
        requestBody: {
          content: commentData.content,
          repliedInfoId: commentData.repliedInfoId,
        },
      });
      console.log('sukses');
      formMethods.reset();
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <div className="flex flex-row content-start items-start space-x-4 border-b border-gray-300 pb-4">
            <Avatar
              src={user.picture}
              alt={user.fullName}
              className="size-10"
            />
            <FormItem className="flex-1 pt-2">
              <Controller
                name="comment"
                control={formMethods.control}
                render={({ field }) => (
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="Share your thoughts with a reply"
                      className="w-full overflow-hidden border-none text-base font-normal text-neutral-darker focus:ring-0"
                      rows={1}
                      onInput={(e) => {
                        e.currentTarget.style.height = 'auto';
                        e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                      }}
                    />
                  </FormControl>
                )}
              />
            </FormItem>
          </div>
          <div className="flex content-start items-center border-b border-gray-300 py-3">
            <div className="grow space-x-1">
              <CommentCameraButton onCapture={handleImageCapture} />
              <CommentImageButton onFileSelected={handleFileSelected} />
              <CommentFileButton onFileSelected={handleFileSelected} />
            </div>
            <Button type="submit" className="grow-0 bg-green-300">
              Reply
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default CommentForm;
