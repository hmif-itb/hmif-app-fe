import { Button } from '~/components/ui/button';
import { FormSchemaType } from '../-constants';
import UserProfile from './UserProfile';
import { useRouter } from '@tanstack/react-router';
import useSession from '~/hooks/auth/useSession';
import { UseFormReturn } from 'react-hook-form';

type ComponentProps = {
  form: UseFormReturn<FormSchemaType>;
};

export default function TopSection({ form }: ComponentProps): JSX.Element {
  const router = useRouter();
  const user = useSession();

  return (
    <>
      <div className="flex items-center justify-between pb-4 pl-4 pr-5">
        <Button
          onClick={() => {
            form.reset();
            router.history.back();
          }}
          size="sm"
          variant="link"
          type="button"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-[#305138]"
          size="sm"
          variant="solid"
        >
          Announce
        </Button>
      </div>

      <div className="border-t border-t-[#EBEEEB] px-6 py-4">
        <UserProfile
          name={user.fullName}
          email={user.email}
          imageURL={user.picture}
        />
      </div>
    </>
  );
}
