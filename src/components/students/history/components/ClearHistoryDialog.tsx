
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ClearHistoryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClearHistory: () => void;
}

export const ClearHistoryDialog: React.FC<ClearHistoryDialogProps> = ({
  isOpen,
  onOpenChange,
  onClearHistory
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>آیا از پاک کردن تاریخچه مطمئن هستید؟</AlertDialogTitle>
          <AlertDialogDescription>
            این عمل تمام تاریخچه فعالیت‌ها را پاک می‌کند و غیرقابل بازگشت است.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>انصراف</AlertDialogCancel>
          <AlertDialogAction onClick={onClearHistory} className="bg-red-500 hover:bg-red-600">
            پاک کردن تاریخچه
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
