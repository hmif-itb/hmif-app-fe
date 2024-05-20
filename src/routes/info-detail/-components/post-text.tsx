import { IPost } from '../-interface/IPost';

const PostText = ({ textData }: { textData: IPost['TextData'] }) => {
  return (
    <div className="flex-col space-y-2">
      <p className="text-xl font-semibold">{textData.title}</p>
      <div
        className="text-base"
        dangerouslySetInnerHTML={{ __html: textData.content }}
      />
    </div>
  );
};

export default PostText;
