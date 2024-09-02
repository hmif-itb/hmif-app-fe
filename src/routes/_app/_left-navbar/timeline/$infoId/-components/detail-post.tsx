import { DialogTrigger } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { Info } from '~/api/generated';
import ArrowRightIcon from '~/assets/icons/timeline/arrow-right.svg';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent } from '~/components/ui/dialog';
import UserInfo from '~/components/user/user-info';
import { getInfoTag } from '~/lib/info';
import { TagSection } from '../../-components/feed';
import PostPhotos from './post-photos';
import PostText from './post-text';

const DetailPost = ({ info }: { info: Info }) => {
  const [imageIdx, setImageIdx] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="flex-col space-y-4">
      <UserInfo
        name={info.creator.fullName}
        email={info.creator.email}
        imageURL={info.creator.picture}
      />
      <PostText title={info.title} content={info.content} />
      {info.infoMedias && info.infoMedias.length > 0 && (
        <Dialog
          open={showDialog}
          onOpenChange={(val) => {
            if (!val) {
              setImageIdx(0);
            }
            setShowDialog(val);
          }}
        >
          <DialogTrigger>
            <PostPhotos
              images={info.infoMedias.map((media) => media.media.url)}
            />
          </DialogTrigger>
          <DialogContent className="size-fit max-w-screen-2xl border-none bg-transparent p-0">
            <div
              onClick={() => {
                setImageIdx(0);
                setShowDialog(false);
              }}
              className="relative flex h-fit w-screen justify-center !bg-transparent"
            >
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!info.infoMedias) return;
                  if (imageIdx > 0) {
                    setImageIdx((prev) => prev - 1);
                  }
                }}
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rotate-180 rounded-full bg-transparent"
              >
                <img src={ArrowRightIcon} alt="Prev" className="size-[73px]" />
              </Button>

              <img
                onClick={(e) => e.stopPropagation()}
                src={info.infoMedias[imageIdx].media.url}
                className="h-auto w-screen object-contain lg:h-[80vh] lg:w-auto"
                alt=""
              />

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!info.infoMedias) return;
                  if (imageIdx < info.infoMedias.length - 1) {
                    setImageIdx((prev) => prev + 1);
                  }
                }}
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-transparent"
              >
                <img src={ArrowRightIcon} alt="Next" className="size-[73px]" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <TagSection tags={getInfoTag(info)} />
    </div>
  );
};

export default DetailPost;
