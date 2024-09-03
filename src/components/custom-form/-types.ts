import { FieldValues, UseFormReturn } from 'react-hook-form';

// eslint-disable-next-line
export interface FormProps<TFV extends FieldValues, TC = any, TTV extends FieldValues | undefined = undefined> {
  form: UseFormReturn<TFV, TC, TTV>;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (values: TFV) => void;
  title?: string;
  children: React.ReactNode[] | React.ReactNode;
  constraintRef: React.MutableRefObject<HTMLElement | null>;
}
