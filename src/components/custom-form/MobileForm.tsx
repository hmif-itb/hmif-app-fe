import { FieldValues } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '../ui/drawer';
import { Form } from '../ui/form';
import { FormProps } from './-types';

export default function MobileForm<T extends FieldValues>(
  props: Readonly<Omit<FormProps<T>, 'constraintRef'>>,
) {
  const { form, isOpen, setOpen, onSubmit, children, title } = props;

  return (
    <Drawer onOpenChange={setOpen} open={isOpen} shouldScaleBackground>
      <DrawerContent className="h-[95%] bg-[#F9F9F9]">
        <Form {...form}>
          <form
            className="h-full overflow-auto bg-white"
            onSubmit={form.handleSubmit(onSubmit)}
            autoComplete="off"
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
