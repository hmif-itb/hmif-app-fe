type ComponentProps = {
  name: string;
  email: string;
  imageURL: string | null;
};

export default function UserProfile({
  name,
  email,
  imageURL,
}: ComponentProps): JSX.Element {
  return (
    <div className="flex items-center gap-3">
      {imageURL ? (
        <img
          src={imageURL}
          alt="Profile picture"
          className="size-[52px] rounded-full bg-[#E8C55F]"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="size-[52px] rounded-full bg-[#E8C55F]" />
      )}

      <div>
        <h3 className="text-body-lg font-bold">{name}</h3>
        <p className="text-xs text-[#6A6B6A]">{email}</p>
      </div>
    </div>
  );
}
