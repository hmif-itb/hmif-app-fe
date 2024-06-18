import { IPost } from '../-interface/IPost';

const PostText = ({
  title,
  content,
}: {
  title: IPost['title'];
  content: IPost['content'];
}) => {
  return (
    <div className="flex-col space-y-2">
      <p className="text-xl font-semibold">{title}</p>
      <div
        className="text-base"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default PostText;
