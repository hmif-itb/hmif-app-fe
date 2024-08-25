import { useForm } from 'react-hook-form';
import {
  CategoryOptions,
  CompetitionSchema,
  CompetitionSchemaType,
} from '../-constants';
import { zodResolver } from '@hookform/resolvers/zod';
import DrawerForm from '~/components/drawer-form/DrawerForm';
import DrawerTextField from '~/components/drawer-form/DrawerTextField';
import DrawerDatePicker from '~/components/drawer-form/DrawerDatePicker';
import DrawerMultiSelect from '~/components/drawer-form/DrawerMultiSelect';
import { useEffect } from 'react';
import PersonIcon from '~/assets/icons/competition/person.svg';
import MoneyIcon from '~/assets/icons/competition/money.svg';
import LinkIcon from '~/assets/icons/competition/link.svg';
import ClockIcon from '~/assets/icons/competition/clock.svg';
import CategoryIcon from '~/assets/icons/competition/category.svg';

type ComponentProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AddCompetitionDrawer(props: Readonly<ComponentProps>) {
  const { isOpen, setOpen } = props;

  const form = useForm<CompetitionSchemaType>({
    resolver: zodResolver(CompetitionSchema),
    defaultValues: {
      title: '',
      organizer: '',
      registrationStart: '',
      registrationDeadline: '',
      price: 0,
      registrationURL: '',
      sourceURL: '',
      categories: [],
    },
  });

  useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen]);

  const onSubmit = (values: CompetitionSchemaType) => {
    console.log(values);
  };

  return (
    <DrawerForm
      form={form}
      onSubmit={onSubmit}
      isOpen={isOpen}
      setOpen={setOpen}
      title="New Competition"
    >
      <DrawerTextField form={form} name="title" placeholder="Add Title" />
      <DrawerTextField
        icon={PersonIcon}
        form={form}
        name="organizer"
        placeholder="Add Organizer"
        inputClassName="py-3 text-base"
        iconClassName="size-6"
      />

      <DrawerDatePicker
        icon={ClockIcon}
        form={form}
        name="registrationStart"
        placeholder="Select Registration Start Date"
        iconClassName="size-6"
      />
      <DrawerDatePicker
        icon={ClockIcon}
        form={form}
        name="registrationDeadline"
        placeholder="Select Registration Deadline Date"
        iconClassName="size-6 opacity-0"
      />

      <DrawerMultiSelect
        icon={CategoryIcon}
        form={form}
        name="categories"
        options={CategoryOptions}
        placeholder="Choose Category"
        iconClassName="size-6"
      />

      <DrawerTextField
        type="number"
        icon={MoneyIcon}
        form={form}
        name="price"
        placeholder="Add Price"
        inputClassName="py-3 text-base"
        iconClassName="size-5"
      />
      <DrawerTextField
        icon={LinkIcon}
        form={form}
        name="registrationURL"
        placeholder="Add Registration Link"
        inputClassName="py-3 text-base"
        iconClassName="size-5"
      />
      <DrawerTextField
        icon={LinkIcon}
        form={form}
        name="sourceURL"
        placeholder="Add Source Link"
        inputClassName="py-3 text-base"
        iconClassName="size-5 opacity-0"
      />
    </DrawerForm>
  );
}
