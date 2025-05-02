
import React from "react";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";

interface DeleteTypeConfirmationProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  typeToDelete: string | null;
  onComplete: () => void;
}

export const DeleteTypeConfirmation: React.FC<DeleteTypeConfirmationProps> = ({
  isOpen,
  onOpenChange,
  typeToDelete,
  onComplete
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { exerciseTypes, categories } = useExerciseData();

  // Confirm delete type
  const confirmDeleteType = async () => {
    if (!typeToDelete) return;
    
    try {
      // Check if type is used in any category
      const typeInUse = categories.some(c => c.type === typeToDelete);
      if (typeInUse) {
        toast({
          variant: "destructive",
          title: "خطا",
          description: "این نوع تمرین در دسته‌بندی‌ها استفاده شده است و قابل حذف نیست"
        });
        return;
      }
      
      const updatedTypes = exerciseTypes.filter(t => t !== typeToDelete);
      
      localStorage.setItem("exerciseTypes", JSON.stringify(updatedTypes));
      queryClient.setQueryData(["exerciseTypes"], updatedTypes);
      
      toast({
        title: "موفقیت",
        description: "نوع تمرین با موفقیت حذف شد"
      });
      
      onOpenChange(false);
      onComplete();
    } catch (error) {
      console.error("Error deleting exercise type:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در حذف نوع تمرین"
      });
    }
  };

  return (
    <ConfirmationDialog
      isOpen={isOpen}
      onClose={() => onOpenChange(false)}
      onConfirm={confirmDeleteType}
      title="حذف نوع تمرین"
      description={`آیا مطمئن هستید که می‌خواهید نوع تمرین «${typeToDelete}» را حذف کنید؟ این عمل قابل بازگشت نیست.`}
      confirmText="حذف"
      cancelText="انصراف"
      variant="destructive"
    />
  );
};
