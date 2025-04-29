
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
import { Exercise } from "@/types/exercise";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExerciseTableDeleteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  exercisesToDelete: number[];
  exercises: Exercise[];
  onConfirmDelete: () => void;
}

export const ExerciseTableDeleteDialog: React.FC<ExerciseTableDeleteDialogProps> = ({
  isOpen,
  onOpenChange,
  exercisesToDelete,
  exercises,
  onConfirmDelete
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[90%] w-[450px]">
        <AlertDialogHeader>
          <AlertDialogTitle>تأیید حذف</AlertDialogTitle>
          <AlertDialogDescription className="whitespace-pre-line max-h-[40vh] overflow-auto">
            {exercisesToDelete.length === 1 ? (
              `آیا از حذف حرکت «${exercises.find(ex => ex.id === exercisesToDelete[0])?.name}» اطمینان دارید؟`
            ) : (
              `آیا از حذف ${toPersianNumbers(exercisesToDelete.length)} حرکت زیر اطمینان دارید؟\n\n${
                exercisesToDelete
                  .map((id, index) => {
                    const exercise = exercises.find(ex => ex.id === id);
                    return `${toPersianNumbers(index + 1)}. ${exercise?.name}`;
                  })
                  .join('\n')
              }`
            )}
            {'\n\n'}
            این عملیات قابل بازگشت نیست.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row-reverse space-x-2 space-x-reverse">
          <AlertDialogAction
            onClick={onConfirmDelete}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            حذف
          </AlertDialogAction>
          <AlertDialogCancel className="hover:bg-gray-100">انصراف</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ExerciseTableDeleteDialog;
