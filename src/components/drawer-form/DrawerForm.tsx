import { FieldValues, UseFormReturn } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '../ui/drawer';
import { Form } from '../ui/form';

// eslint-disable-next-line
export interface DrawerFormProps<TFV extends FieldValues, TC = any, TTV extends FieldValues | undefined = undefined> {
  form: UseFormReturn<TFV, TC, TTV>;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (values: TFV) => void;
  title: string;
  children: React.ReactNode[] | React.ReactNode;
}

export default function DrawerForm<T extends FieldValues>(
  props: Readonly<DrawerFormProps<T>>,
) {
  const { form, isOpen, setOpen, onSubmit, children, title } = props;

  return (
    <Drawer onOpenChange={setOpen} open={isOpen} shouldScaleBackground>
      <DrawerContent className="h-[95%] bg-[#F9F9F9]">
        <Form {...form}>
          <form
            className="h-full overflow-auto bg-white"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <DrawerHeader className="flex flex-row items-baseline justify-between bg-[#F9F9F9] px-4 py-3">
              <DrawerClose
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </DrawerClose>
              <DrawerTitle>{title}</DrawerTitle>
              <Button
                variant="link"
                type="submit"
                className="mx-0 p-0 text-[#007AFF]"
              >
                Submit
              </Button>
            </DrawerHeader>
            <div className="divide-y divide-dashed">{children}</div>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
