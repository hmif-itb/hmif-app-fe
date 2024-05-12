import Tag from './tag';

function PostTags() {
  return (
    <div className="flex flex-wrap justify-start gap-2.5">
      <Tag tag={'SPARTA'}></Tag>
      <Tag tag={'BYTE'}></Tag>
      <Tag tag={'Pemilu'}></Tag>
      <Tag tag={'2023'}></Tag>
      <Tag tag={'Voting'}></Tag>
      <Tag tag={'Zeus'}></Tag>
    </div>
  );
}

export default PostTags;
