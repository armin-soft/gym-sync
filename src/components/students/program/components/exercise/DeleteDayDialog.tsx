
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, VisuallyHidden } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteDayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dayLabel: string;
  onDelete: () => void;
}

const DeleteDayDialog: React.FC<DeleteDayDialogProps> = ({
  open,
  onOpenChange,
  dayLabel,
  onDelete,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" aria-describedby="delete-day-description">
        <DialogHeader>
          <DialogTitle className="text-center">حذف روز</DialogTitle>
        </DialogHeader>
        <div className="py-4" id="delete-day-description">
          <p className="text-center">
            آیا از حذف {dayLabel} اطمینان دارید؟
          </p>
          <p className="text-center text-red-500 text-sm mt-2">
            تمام تمرین‌های این روز حذف خواهند شد.
          </p>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            انصراف
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onDelete}
          >
            حذف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDayDialog;
