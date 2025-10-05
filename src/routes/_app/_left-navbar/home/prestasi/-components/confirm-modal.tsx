import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  confirmText = 'Kirim',
  cancelText = 'Batal',
  loading = false,
}: ConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="mb-4">
          <img
            src="/img/prestasi/question-mark.svg"
            alt="Question Mark"
            className="mb-8 h-28 w-auto"
          />
          <DialogTitle className="mb-4 text-center text-lg">
            Apakah Anda yakin ingin menambahkan data prestasi berikut?
          </DialogTitle>
          <DialogDescription className="text-center">
            Pastikan informasi yang tercantum dalam form sudah tepat
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex w-full flex-row justify-between gap-1">
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={loading}
            className="w-full bg-white hover:bg-slate-100"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className="w-full bg-[#2A6536] text-white hover:bg-[#438350]"
          >
            {loading && (
              <div className="mr-2 size-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
            )}
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
